import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/viewer/data.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { indexDocument, loadPack, quickStats } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

test('indexes individual spells and preserves stable document identity', () => {
  const records = indexDocument({ id: 'magic.spells', title: 'Spells', type: 'spell-catalog', spells: [{ id: 'spell.fire', name: 'Fire', damage: { roll: '2d6', type: 'fire' } }] }, 'magic/spells.json');
  assert.equal(records.length, 2);
  assert.equal(records[1].category, 'Spells');
  assert.equal(records[1].id, 'spell.fire');
  assert.equal(quickStats(records[1].data), '2d6 fire');
});

test('loads all records from one bundled database request', async () => {
  const originalFetch = globalThis.fetch;
  let requests=0;
  globalThis.fetch = async () => {
    requests++;
    return new Response(await readFile(new URL('../public/bundles/quadrath-base.bundle.json', import.meta.url)), { status: 200 });
  };
  try {
    const pack = await loadPack('/pack/');
    assert.equal(pack.records.filter(r => r.category === 'Player characters').length, 3);
    const town = pack.records.filter(r => r.category === 'NPCs' && r.path === 'npcs/okla-deli.json');
    assert.equal(town.length, 6);
    assert(!town.some(r => r.name === 'Merchant'));
    assert(pack.records.some(r => r.id === 'spell.lightning-beam'));
    assert.equal(requests,1);
    assert(pack.resources.handbook.includes('Player and DM Handbook'));
  } finally { globalThis.fetch = originalFetch; }
});

test('surfaces missing content and rejects unsafe document paths', async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response('', { status: 404 });
    await assert.rejects(loadPack('/pack'), /HTTP 404/);
    const bundle=JSON.parse(await readFile(new URL('../public/bundles/quadrath-base.bundle.json',import.meta.url),'utf8'));
    bundle.documents[0].path='../private.json';
    globalThis.fetch = async () => Response.json(bundle);
    await assert.rejects(loadPack('/pack'), /Invalid content document path/);
  } finally { globalThis.fetch = originalFetch; }
});

test('weapon summaries combine default and enchantment, without named wielders', () => {
  assert.match(quickStats({ attack_bonus: 2, enchantment: { attack_bonus: 2 }, damage: { roll: '4d6', type: 'slashing' } }), /\+4 to hit/);
  assert.match(quickStats({ attack_bonus: 0 }), /\+0 to hit/);
});
