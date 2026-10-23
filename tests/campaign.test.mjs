import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {validateBundle} from '../scripts/bundle-format.mjs';

const source=await readFile(new URL('../src/campaign/character.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {blankCharacter,fromTemplate,validateCharacter,toCharacterDocument,readRoster,tidyCharacter,tierFor}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const bundle=validateBundle(JSON.parse(await readFile(new URL('../public/bundles/quadrath.bundle.json',import.meta.url),'utf8')));
const doc=id=>bundle.documents.find(e=>e.data.id===id).data;
const npc=id=>bundle.documents.flatMap(e=>e.data.npcs||[]).find(n=>n.id===id);

test('a player character autofills the whole sheet',()=>{
  const data=doc('character.sample.merchant');
  const c=fromTemplate({kind:'pc',id:data.id,name:data.title,collection:'',hp:0,ac:0,data});
  assert.equal(c.name,'The Merchant');assert.equal(c.hp,data.sheet.hp);assert.equal(c.ac,data.sheet.ac);
  assert.deepEqual(c.modifiers,data.sheet.modifiers);
  assert.equal(c.actions.length,2);assert.equal(c.actions[0].attack_bonus,1);assert.equal(c.actions[0].damage_roll,'1d6');
  assert.equal(c.abilities.length,3);assert.deepEqual(c.equipment,data.equipment);
  assert.deepEqual(validateCharacter(c),[]);
});
test('an NPC autofills the sheet from its stat block and bonuses',()=>{
  const data=npc('npc.guard-captain');
  const c=fromTemplate({kind:'npc',id:data.id,name:data.name,collection:'',hp:0,ac:0,data});
  assert.equal(c.source.kind,'npc');assert.equal(c.hp,60);assert.equal(c.ac,12);
  assert.deepEqual(c.modifiers,data.bonuses);
  assert.equal(c.actions.length,data.actions.length);assert.ok(c.actions.some(a=>a.damage_type==='piercing / bludgeoning'));
  assert.deepEqual(validateCharacter(c),[]);
});
test('every Compendium PC and NPC loads into a valid character',()=>{
  const pcs=bundle.documents.filter(e=>e.data.type==='character').map(e=>({kind:'pc',id:e.data.id,name:e.data.title,data:e.data}));
  const npcs=bundle.documents.flatMap(e=>e.data.npcs||[]).map(n=>({kind:'npc',id:n.id,name:n.name,data:n}));
  for(const t of [...pcs,...npcs])assert.deepEqual(validateCharacter(fromTemplate(t)),[],t.id);
});
test('invalid sheets are reported',()=>{
  const c={...blankCharacter(),hp:NaN,actions:[{name:'Bad',action_type:'action',attack_bonus:0,damage_roll:'2d8',damage_type:'fire',effect:''}]};
  const errors=validateCharacter(c);
  assert.ok(errors.some(e=>/name/.test(e)));assert.ok(errors.some(e=>/HP/.test(e)));assert.ok(errors.some(e=>/D6/.test(e)));
});
test('exports in the Compendium character format',()=>{
  const c=tidyCharacter({...blankCharacter(),name:'  Wren Ashby ',level:7,traits:['Quick',' ',''],actions:[{name:'Bow',action_type:'action',attack_bonus:2,damage_roll:'1d6',damage_type:'piercing / slashing',effect:''}]});
  const out=toCharacterDocument(c);
  assert.equal(out.id,'character.wren-ashby');assert.equal(out.tier,'adept');assert.equal(tierFor(16),'legendary');
  assert.deepEqual(Object.keys(out.sheet).sort(),['ac','hp','modifiers']);
  assert.deepEqual(out.actions[0].damage,{roll:'1d6',type:['piercing','slashing']});assert.equal(out.actions[0].resolution.roll,'2d6 + 2');
  assert.deepEqual(out.traits,['Quick']);
});
test('a saved roster drops malformed entries',()=>{
  const good={...blankCharacter(),name:'Wren',actions:[]};
  assert.deepEqual(readRoster([good,{name:'x'},null,{...good,id:'y',name:''}]).map(c=>c.name),['Wren']);
  assert.deepEqual(readRoster('nope'),[]);
});
