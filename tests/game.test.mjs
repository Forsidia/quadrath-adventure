import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {validateBundle} from '../scripts/bundle-format.mjs';

const source=await readFile(new URL('../src/game/engine.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {newGame,drawEncounter,resolveChoice,choices}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const bundle=validateBundle(JSON.parse(await readFile(new URL('../public/bundles/quadrath.bundle.json',import.meta.url),'utf8')));
const character=bundle.documents.find(e=>e.data.id==='character.sample.merchant').data;
const table=bundle.documents.find(e=>e.data.id==='adventure.okla-deli').data.random_encounters;

test('all 2d6 outcomes use the bundled encounter table and have valid choices',()=>{
 for(let total=2;total<=12;total++){
  const values=[Math.max(1,total-6),Math.min(6,total-1)];let i=0;
  const encounter=drawEncounter(newGame(character),table,'Market Square',()=> (values[i++]-1)/6).state;
  assert.equal(encounter.encounter.roll,total);
  assert.equal(encounter.encounter.event,table.find(e=>e.roll===total).event);
  assert(choices(total).length>=2);
  assert.throws(()=>drawEncounter(encounter,table,'Town Gate'),/Resolve/);
 }
});
test('choice resolution charges stakes once and rejects repeated actions',()=>{
 const state={...newGame(character),encounter:table.find(e=>e.roll===10),resolved:false};
 const result=resolveChoice(state,choices(10)[0],character,()=>.99);
 assert.equal(result.state.coins,120);
 assert.equal(result.state.resolved,true);
 assert.throws(()=>resolveChoice(result.state,choices(10)[0],character),/No active/);
 const poor={...state,coins:1};assert.throws(()=>resolveChoice(poor,choices(10)[0],character),/Not enough/);
});
test('pickpocket loss uses 2d6 and cannot make the purse negative',()=>{
 const state={...newGame(character),coins:2,encounter:table.find(e=>e.roll===12),resolved:false};
 const result=resolveChoice(state,choices(12)[0],character,()=>0);
 assert.equal(result.state.coins,0);
 assert.match(result.result,/lose 2 GP/);
});
test('an unknown ring is acquired without inventing item powers',()=>{
 const state={...newGame(character),encounter:table.find(e=>e.roll===3),resolved:false};
 const result=resolveChoice(state,choices(3)[0],character);
 assert.equal(result.state.coins,60);
 assert.deepEqual(result.state.inventory,['Uncertain old ring']);
});
test('commerce checks apply the merchant ability from the bundled PC data',()=>{
 const state={...newGame(character),encounter:table.find(e=>e.roll===7),resolved:false};
 let i=0;const values=[0,1/6];
 const result=resolveChoice(state,choices(7)[0],character,()=>values[i++]);
 assert.equal(result.state.coins,105);
 assert.match(result.result,/\+ 5 = 8/);
});
test('the packaged database fails validation if altered or incomplete',()=>{
 const changed=structuredClone(bundle);changed.documents[0].data.title='Modified';
 assert.throws(()=>validateBundle(changed),/checksum/);
 const missing=structuredClone(bundle);missing.documents.pop();
 assert.throws(()=>validateBundle(missing),/Incomplete/);
});
