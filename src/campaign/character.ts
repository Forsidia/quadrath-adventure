import type { ContentPack, Entity, Value } from '../viewer/data';

export const MODIFIERS = ['intelligence', 'constitution', 'dexterity', 'persuasion', 'charisma'] as const;
export type Modifier = typeof MODIFIERS[number];
export const ACTION_TYPES = ['action', 'reaction', 'passive', 'short-rest', 'once-per-fight'];
const TIERS: [number, string][] = [[5, 'novice'], [10, 'adept'], [15, 'master'], [20, 'legendary']];
const DAMAGE_ROLL = /^(?:0|[1-9][0-9]*d6)(?: \+ (?:INT|intelligence|[0-9]+))?$/;

export interface CharacterAction { name: string; action_type: string; attack_bonus: number | null; damage_roll: string; damage_type: string; effect: string }
export interface CharacterAbility { name: string; action_type: string; effect: string }
export interface CharacterDraft {
  id: string; source: { kind: 'scratch' | 'pc' | 'npc'; ref: string; name: string };
  name: string; description: string; level: number; hp: number; ac: number; modifiers: Record<Modifier, number>;
  actions: CharacterAction[]; abilities: CharacterAbility[]; traits: string[]; equipment: string[]; backstory: string;
}
export interface Template { kind: 'pc' | 'npc'; id: string; name: string; collection: string; hp: number; ac: number; data: Entity }

export const tierFor = (level: number) => (TIERS.find(([max]) => level <= max) || TIERS[TIERS.length - 1])[1];
const newId = () => 'character.' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const text = (value: Value | undefined) => typeof value === 'string' ? value : '';
const int = (value: Value | undefined, fallback = 0) => typeof value === 'number' && Number.isInteger(value) ? value : fallback;
const strings = (value: Value | undefined) => Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
const objects = (value: Value | undefined) => Array.isArray(value) ? value.filter((v): v is Entity => !!v && typeof v === 'object' && !Array.isArray(v)) : [];

export function blankAction(): CharacterAction { return { name: '', action_type: 'action', attack_bonus: 0, damage_roll: '1d6', damage_type: 'bludgeoning', effect: '' }; }
export function blankAbility(): CharacterAbility { return { name: '', action_type: 'passive', effect: '' }; }
export function blankCharacter(): CharacterDraft {
  return { id: newId(), source: { kind: 'scratch', ref: '', name: '' }, name: '', description: '', level: 1, hp: 20, ac: 8,
    modifiers: { intelligence: 0, constitution: 0, dexterity: 0, persuasion: 0, charisma: 0 }, actions: [blankAction()], abilities: [], traits: [], equipment: [], backstory: '' };
}

/** Player characters and NPCs both carry a full stat block, so either can seed a new character. */
export function templates(pack: ContentPack): Template[] {
  return pack.records.filter(r => r.category === 'Player characters' || r.category === 'NPCs').map(r => {
    const kind = r.category === 'NPCs' ? 'npc' : 'pc', stats = (kind === 'pc' ? r.data.sheet : r.data) as Entity;
    return { kind, id: r.id, name: r.name, collection: r.collection, hp: int(stats?.hp), ac: int(stats?.ac), data: r.data };
  });
}

export function fromTemplate(template: Template): CharacterDraft {
  const data = template.data, pc = template.kind === 'pc';
  const stats = (pc ? data.sheet : data) as Entity, modifiers = ((pc ? stats.modifiers : data.bonuses) || {}) as Entity;
  const damage = (entry: Entity) => (entry.damage || {}) as Entity;
  const damageType = (entry: Entity) => { const type = damage(entry).type; return Array.isArray(type) ? strings(type).join(' / ') : text(type) || 'none'; };
  return {
    ...blankCharacter(), source: { kind: template.kind, ref: template.id, name: template.name },
    name: pc ? text(data.title) : template.name,
    description: text(data.description) || text(data.personality), level: int(data.level, 1),
    hp: int(stats.hp, 1), ac: int(stats.ac), modifiers: Object.fromEntries(MODIFIERS.map(m => [m, int(modifiers[m])])) as Record<Modifier, number>,
    actions: objects(data.actions).map(a => ({ name: text(a.name), action_type: text(a.action_type) || 'action', attack_bonus: typeof a.attack_bonus === 'number' ? a.attack_bonus : null,
      damage_roll: text(damage(a).roll) || '0', damage_type: damageType(a), effect: text(a.effect) })),
    abilities: objects(data.abilities).map(a => ({ name: text(a.name), action_type: text(a.action_type) || 'passive', effect: text(a.effect) })),
    traits: strings(data.traits), equipment: strings(data.equipment), backstory: text(data.backstory),
  };
}

export function validateCharacter(c: CharacterDraft): string[] {
  const errors: string[] = [];
  if (!c.name.trim()) errors.push('Give your character a name.');
  if (!Number.isInteger(c.level) || c.level < 1 || c.level > 20) errors.push('Level must be a whole number from 1 to 20.');
  if (!Number.isInteger(c.hp) || c.hp < 1) errors.push('HP must be a whole number of at least 1.');
  if (!Number.isInteger(c.ac) || c.ac < 0) errors.push('AC must be a whole number of 0 or more.');
  for (const m of MODIFIERS) if (!Number.isInteger(c.modifiers[m])) errors.push(`The ${m} modifier must be a whole number.`);
  c.actions.forEach((a, i) => {
    const label = a.name.trim() || `Action ${i + 1}`;
    if (!a.name.trim()) errors.push(`${label} needs a name.`);
    if (!DAMAGE_ROLL.test(a.damage_roll)) errors.push(`${label}: damage must be a D6 roll such as 0, 1d6, or 2d6 + 1.`);
    if (a.attack_bonus !== null && !Number.isInteger(a.attack_bonus)) errors.push(`${label}: attack bonus must be a whole number.`);
  });
  c.abilities.forEach((a, i) => { if (!a.name.trim()) errors.push(`Ability ${i + 1} needs a name.`); });
  return errors;
}

/** Export in the Compendium's character document shape, so a finished character can be added to content/. */
export function toCharacterDocument(c: CharacterDraft): Entity {
  const damage = (roll: string, type: string): Entity => { const types = type.split('/').map(t => t.trim()).filter(Boolean); return { roll, type: types.length > 1 ? types : types[0] || 'none' }; };
  const slug = c.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'character';
  return {
    id: 'character.' + slug, type: 'character', version: '0.1.0', title: c.name.trim(), status: 'player-character', description: c.description.trim(),
    level: c.level, tier: tierFor(c.level), sheet: { hp: c.hp, ac: c.ac, modifiers: { ...c.modifiers } },
    actions: c.actions.map((a, i) => {
      const action: Entity = { id: `${slug}-${i + 1}`, name: a.name.trim(), action_type: a.action_type };
      if (a.attack_bonus !== null) action.attack_bonus = a.attack_bonus;
      action.damage = damage(a.damage_roll, a.damage_type);
      if (a.attack_bonus !== null) action.resolution = { kind: 'attack', roll: `2d6 + ${a.attack_bonus}`, against: 'ac' };
      if (a.effect.trim()) action.effect = a.effect.trim();
      return action;
    }),
    abilities: c.abilities.map(a => ({ name: a.name.trim(), action_type: a.action_type, damage: { roll: '0', type: 'none' }, effect: a.effect.trim() })),
    traits: c.traits, equipment: c.equipment, backstory: c.backstory.trim(),
    ...(c.source.kind === 'scratch' ? {} : { based_on: c.source.ref }),
  };
}

/** Drop blank list lines and surrounding whitespace before a character is saved. */
export function tidyCharacter(c: CharacterDraft): CharacterDraft {
  const lines = (list: string[]) => list.map(s => s.trim()).filter(Boolean);
  const { role: _role, ...rest } = c as CharacterDraft & { role?: string };
  return { ...rest, name: c.name.trim(), description: c.description.trim(), backstory: c.backstory.trim(), traits: lines(c.traits), equipment: lines(c.equipment) };
}

export function isCharacterShape(c: unknown): c is CharacterDraft {
  if (!c || typeof c !== 'object') return false;
  const d = c as CharacterDraft;
  return typeof d.id === 'string' && typeof d.name === 'string' && typeof d.description === 'string' && typeof d.backstory === 'string'
    && !!d.source && typeof d.source === 'object' && ['scratch', 'pc', 'npc'].includes(d.source.kind) && !!d.modifiers && typeof d.modifiers === 'object'
    && [d.actions, d.abilities, d.traits, d.equipment].every(Array.isArray);
}

/** Restore a saved roster, dropping anything that is not a well-formed character. */
export function readRoster(raw: unknown): CharacterDraft[] {
  return Array.isArray(raw) ? raw.filter((c): c is CharacterDraft => isCharacterShape(c) && validateCharacter(c).length === 0) : [];
}
