import type { ContentPack, Entity } from '../viewer/data';

export interface Encounter { roll: number; event: string }
export interface Action { id: string; label: string; check?: { ability: string; dc: number; context?: string }; cost?: number; reward?: number; success: string; failure?: string }
export interface GameState {
  characterId: string; coins: number; hp: number; location: string; turn: number;
  encounter: Encounter | null; resolved: boolean; history: string[]; inventory: string[];
}
export const locations = ['Market Square', 'Town Gate', 'Copper Lantern Tavern', 'Town Library', 'Iron Hearth Smithy'];
export function rollDice(random = Math.random): [number, number] { return [1 + Math.floor(random() * 6), 1 + Math.floor(random() * 6)]; }
export function characters(pack: ContentPack): Entity[] { return pack.records.filter(r => r.category === 'Player characters').map(r => r.data); }
export function encounterTable(pack: ContentPack): Encounter[] {
  const adventure = pack.records.find(r => r.id === 'adventure.okla-deli')?.data;
  if (!Array.isArray(adventure?.random_encounters)) throw new Error('Okla Deli encounter table is missing.');
  return adventure.random_encounters as unknown as Encounter[];
}
export function newGame(character: Entity): GameState {
  const sheet = character.sheet as Entity;
  return { characterId: String(character.id), coins: 100, hp: Number(sheet.hp), location: 'Town Gate', turn: 0, encounter: null, resolved: true,
    history: ['You arrive at Okla Deli with 100 GP for the journey. The town is yours to explore.'], inventory: [] };
}
export function drawEncounter(state: GameState, table: Encounter[], location: string, random = Math.random): {state: GameState; dice: number[]} {
  if (!state.resolved) throw new Error('Resolve the current encounter before travelling.');
  const dice = rollDice(random), total = dice[0] + dice[1];
  const encounter = table.find(e => e.roll === total);
  if (!encounter) throw new Error(`No encounter for roll ${total}.`);
  return { dice, state: {...state, location, turn: state.turn + 1, encounter, resolved: false, history: [...state.history, `${location} · rolled ${dice.join(' + ')} = ${total}. ${encounter.event}`].slice(-40) } };
}
export function choices(roll: number): Action[] {
  const actions: Record<number, Action[]> = {
    2: [{id:'confront',label:'Question the suspicious travellers',check:{ability:'persuasion',dc:8},success:'Your questions unsettle the watchers. They leave your wagon alone.',failure:'They melt into the crowd. You keep your belongings close.'}],
    3: [{id:'ring',label:'Buy the uncertain old ring · 40 GP',cost:40,success:'The seller hands you an old ring. Its properties remain unknown.'}],
    4: [{id:'cooperate',label:'Cooperate with the guard inspection',success:'You show the patrol your cargo. Satisfied, they let you pass.'},{id:'explain',label:'Talk your way past · Persuasion DC 10',check:{ability:'persuasion',dc:10},success:'The guards accept your explanation and return to their patrol.',failure:'The patrol delays you with a thorough search, then lets you go.'}],
    5: [{id:'judge',label:'Examine the disputed cargo · Intelligence DC 8',check:{ability:'intelligence',dc:8},success:'You spot the mismatched labels and help the traders settle their dispute.',failure:'The accounts contradict each other. You leave the traders to find another judge.'}],
    6: [{id:'watch',label:'Watch the wagers · Intelligence DC 8',check:{ability:'intelligence',dc:8},success:'You notice the manipulation and warn the crowd. The dishonest gambler slips away.',failure:'The performance distracts you. The wagers keep changing hands.'}],
    7: [{id:'trade',label:'Find a better offer · Intelligence DC 8',check:{ability:'intelligence',dc:8,context:'commerce'},reward:5,success:'Your patient bargaining earns 5 GP in the local trading round.',failure:'Business is quiet. You make no profit this time.'}],
    8: [{id:'lift',label:'Help clear the wagon · Constitution DC 8',check:{ability:'constitution',dc:8},success:'With a steady effort, you clear the road and return the spilled cargo.',failure:'The cargo is heavier than expected. You fetch other townsfolk to help.'}],
    9: [{id:'mediate',label:'Calm the argument · Persuasion DC 8',check:{ability:'persuasion',dc:8},success:'Both sides lower their voices. The innkeeper gives you a grateful nod.',failure:'Neither side listens. The innkeeper calls for the watch as you step aside.'}],
    10: [{id:'duel',label:'Accept a nonlethal duel · 20 GP stake',cost:20,check:{ability:'dexterity',dc:10},reward:40,success:'You find an opening and win the friendly bout. Your stake and winnings are returned.',failure:'The mercenary wins on points and collects your stake. The duel ends without injury.'}],
    11: [{id:'search',label:'Search the outskirts · Intelligence DC 8',check:{ability:'intelligence',dc:8},success:'You follow small footprints and find the child hiding beside an abandoned cart. Their family is relieved.',failure:'You find no reliable trail. You report the last sighting to the town guards.'}],
    12: [{id:'notice',label:'Check your purse · Intelligence DC 9',check:{ability:'intelligence',dc:9},success:'You catch a hand reaching toward your purse. The pickpocket runs.',failure:'The thief is gone before you notice the missing coins.'}],
  };
  return [...(actions[roll] || []), {id:'leave',label:'Keep walking',success:'You leave the scene and continue through town.'}];
}
export function resolveChoice(state: GameState, action: Action, character: Entity, random = Math.random): {state: GameState; result: string; dice: number[]} {
  if (state.resolved || !state.encounter) throw new Error('No active encounter.');
  const allowed = choices(state.encounter.roll).find(item => item.id === action.id);
  if (!allowed) throw new Error('Invalid choice.');
  action = allowed;
  if (state.coins < (action.cost || 0)) throw new Error('Not enough GP for this choice.');
  const modifiers = (character.sheet as Entity).modifiers as Entity;
  const dice = action.check ? rollDice(random) : [];
  let bonus = action.check ? Number(modifiers[action.check.ability] || 0) : 0;
  if (action.check?.context && Array.isArray(character.abilities)) {
    for (const ability of character.abilities) {
      if (!ability || typeof ability !== 'object' || Array.isArray(ability)) continue;
      const modifier = ability.check_modifier as Entity | undefined;
      if (modifier?.ability === action.check.ability && Array.isArray(modifier.contexts) && modifier.contexts.includes(action.check.context)) bonus += Number(modifier.bonus || 0);
    }
  }
  const total = dice.reduce((a,b) => a+b,0) + bonus;
  const success = !action.check || total >= action.check.dc;
  let coins = state.coins - (action.cost || 0) + (success ? action.reward || 0 : 0);
  let result = success ? action.success : action.failure || 'The attempt fails.';
  if (state.encounter.roll === 12 && (action.id === 'leave' || !success)) {
    const lostDice = rollDice(random), lost = Math.min(coins,lostDice[0]+lostDice[1]); coins -= lost; result += ` You lose ${lost} GP.`;
  }
  if (action.check) result = `${dice.join(' + ')} ${bonus >= 0 ? '+' : '−'} ${Math.abs(bonus)} = ${total} vs DC ${action.check.dc}. ${success ? 'Success.' : 'Failed check.'} ${result}`;
  return { dice, result, state: {...state, coins, resolved:true, inventory:success && action.id==='ring' ? [...state.inventory,'Uncertain old ring'] : state.inventory, history:[...state.history,result].slice(-40)} };
}
