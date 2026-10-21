export type Value = null | boolean | number | string | Value[] | { [key: string]: Value };
export type Entity = { [key: string]: Value };
export interface Manifest { title: string; version: string; documents: { path: string; type: string }[] }
export interface RecordEntry { key: string; id: string; name: string; category: string; collection: string; path: string; data: Entity; search: string }
export interface ContentPack { manifest: Manifest; records: RecordEntry[]; resources: { handbook: string; content_license: string } }

export const label = (s: string) => s.replace(/[_-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
const childTypes: Record<string, string> = { spells: 'Spells', weapons: 'Weapons', items: 'Items', npcs: 'NPCs', traps: 'Traps', sessions: 'Sessions', kingdoms: 'World', places: 'World', members: 'Factions' };
const documentTypes: Record<string, string> = { character: 'Player characters', rules: 'Rules', magic: 'Magic', lore: 'World', story: 'Stories', faction: 'Factions', adventure: 'Adventures', 'session-record': 'Sessions' };
export function indexDocument(data: Entity, path: string): RecordEntry[] {
  const entries: RecordEntry[] = [];
  const add = (entity: Entity, category: string, suffix: string) => entries.push({
    key: path + '#' + suffix, id: String(entity.id || ''), name: String(entity.name || entity.title || label(String(entity.id || suffix))),
    category, collection: String(data.title || data.id), path, data: entity, search: JSON.stringify(entity).toLowerCase(),
  });
  add(data, documentTypes[String(data.type)] || 'Collections', 'document');
  for (const [key, category] of Object.entries(childTypes)) {
    const children = data[key];
    if (Array.isArray(children)) children.forEach((child, i) => {
      if (child && typeof child === 'object' && !Array.isArray(child)) add(child, category, `${key}/${i}`);
    });
  }
  return entries;
}
export async function loadPack(bundleUrl: string, signal?: AbortSignal): Promise<ContentPack> {
  const response = await fetch(bundleUrl, { signal, cache: 'no-cache' });
  if (!response.ok) throw new Error(`Could not load content bundle (HTTP ${response.status}).`);
  const bundle = await response.json();
  if (bundle.format !== 'quadrath-content-bundle' || bundle.format_version !== 1) throw new Error('Unsupported content bundle format.');
  const manifest: Manifest = bundle.manifest;
  if (!Array.isArray(manifest?.documents) || !Array.isArray(bundle.documents) || bundle.documents.length !== manifest.documents.length) throw new Error('Incomplete content bundle.');
  if (typeof bundle.resources?.handbook !== 'string' || typeof bundle.resources?.content_license !== 'string') throw new Error('Missing content resources.');
  const paths = new Set<string>();
  const ids = new Set<string>();
  const records: RecordEntry[] = bundle.documents.flatMap((entry: {path: string; data: Entity}, index: number) => {
    if (typeof entry.path !== 'string' || entry.path.includes('..') || entry.path.startsWith('/') || !entry.path.endsWith('.json')) throw new Error('Invalid content document path.');
    if (!entry.data || typeof entry.data.id !== 'string' || paths.has(entry.path) || ids.has(entry.data.id) || manifest.documents[index]?.path !== entry.path || manifest.documents[index]?.type !== entry.data.type) throw new Error('Invalid bundle document index.');
    paths.add(entry.path); ids.add(entry.data.id);
    return indexDocument(entry.data, entry.path);
  });
  return { manifest, records, resources: bundle.resources };
}
export function quickStats(data: Entity): string {
  const sheet = data.sheet && typeof data.sheet === 'object' && !Array.isArray(data.sheet) ? data.sheet : data;
  const damage = data.damage as Entity | undefined;
  const healing = data.healing as Entity | undefined;
  const enchantment = data.enchantment as Entity | undefined;
  return [sheet.hp !== undefined && `HP ${sheet.hp}`, sheet.ac !== undefined && `AC ${sheet.ac}`,
    typeof data.attack_bonus === 'number' && `+${data.attack_bonus + Number(enchantment?.attack_bonus || 0)} to hit`,
    damage && damage.roll !== '0' && `${damage.roll} ${Array.isArray(damage.type) ? damage.type.join(' / ') : damage.type}`,
    healing && `Heal ${healing.roll || healing.amount}`, data.kind && label(String(data.kind))].filter(Boolean).join(' · ');
}
