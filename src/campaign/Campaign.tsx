import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Download, Plus, Save, Search, Trash2, UserRound, Users, X } from 'lucide-react';
import { loadPack, type ContentPack } from '../viewer/data';
import { ACTION_TYPES, MODIFIERS, blankAbility, blankAction, blankCharacter, fromTemplate, isCharacterShape, readRoster, templates, tidyCharacter, tierFor, toCharacterDocument, validateCharacter, type CharacterDraft, type Template } from './character';
import '../game/fantasy.css';
import './campaign.css';

const SAVE_KEY = 'quadrath-adventure.campaign.v1';
const kindLabel = { scratch: 'From scratch', pc: 'Player character', npc: 'NPC' };

function NumberInput({ label, value, onChange, min, max }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  return <label className="maker-field field-number"><span>{label}</span><input type="number" inputMode="numeric" step={1} min={min} max={max} value={Number.isNaN(value) ? '' : value} onChange={e => onChange(e.target.valueAsNumber)} /></label>;
}

export function Campaign({ bundleUrl }: { bundleUrl: string }) {
  const [pack, setPack] = useState<ContentPack | null>(null), [loadError, setLoadError] = useState('');
  const [roster, setRoster] = useState<CharacterDraft[]>([]), [draft, setDraft] = useState<CharacterDraft>(blankCharacter);
  const [picker, setPicker] = useState(false), [query, setQuery] = useState(''), [kind, setKind] = useState<'' | 'pc' | 'npc'>('');
  const [errors, setErrors] = useState<string[]>([]), [notice, setNotice] = useState(''), [confirmDelete, setConfirmDelete] = useState('');
  useEffect(() => { const controller = new AbortController(); loadPack(bundleUrl, controller.signal).then(setPack).catch(e => { if (!controller.signal.aborted) setLoadError(String(e)); }); return () => controller.abort(); }, [bundleUrl]);
  useEffect(() => {
    try { const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); setRoster(readRoster(saved?.roster)); if (isCharacterShape(saved?.draft)) setDraft(saved.draft); }
    catch { /* A blank character is offered if local storage is unavailable. */ }
  }, []);
  useEffect(() => { try { localStorage.setItem(SAVE_KEY, JSON.stringify({ roster, draft })); } catch { /* The maker works without persistence. */ } }, [roster, draft]);
  const all = useMemo(() => pack ? templates(pack) : [], [pack]);
  const matches = all.filter(t => (!kind || t.kind === kind) && (t.name + ' ' + t.collection).toLowerCase().includes(query.trim().toLowerCase()));
  const saved = roster.some(c => c.id === draft.id);

  const update = (patch: Partial<CharacterDraft>) => { setDraft(d => ({ ...d, ...patch })); setNotice(''); };
  const updateList = <K extends 'actions' | 'abilities'>(key: K, index: number, patch: Partial<CharacterDraft[K][number]>) => update({ [key]: draft[key].map((item, i) => i === index ? { ...item, ...patch } : item) } as Partial<CharacterDraft>);
  function start(next: CharacterDraft, message = '') { setDraft(next); setErrors([]); setNotice(message); setPicker(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function load(template: Template) { start({ ...fromTemplate(template), id: draft.id }, `Loaded ${template.name}. Every field is yours to change; the Compendium entry stays as it is.`); }
  function save() {
    const tidy = tidyCharacter(draft), problems = validateCharacter(tidy);
    setErrors(problems);
    if (problems.length) return;
    setDraft(tidy); setRoster(r => saved ? r.map(c => c.id === tidy.id ? tidy : c) : [...r, tidy]); setNotice(`${tidy.name} is ${saved ? 'updated in' : 'now part of'} your party.`);
  }
  function exportJson() {
    const tidy = tidyCharacter(draft), problems = validateCharacter(tidy);
    setErrors(problems);
    if (problems.length) return;
    const doc = toCharacterDocument(tidy), url = URL.createObjectURL(new Blob([JSON.stringify(doc, null, 2) + '\n'], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = String(doc.id).replace('character.', '') + '.json'; link.click(); URL.revokeObjectURL(url);
  }
  function remove(id: string) { setRoster(r => r.filter(c => c.id !== id)); setConfirmDelete(''); if (draft.id === id) start(blankCharacter()); }

  return <div className="game-screen campaign-screen"><header className="game-header"><a href="https://forsidia.in/products/quadrath-ttrpg" target="_blank" rel="noreferrer" className="game-logo">Q<span>Quadrath<small>CAMPAIGN</small></span></a><span className="game-edition">LOCAL PLAY / EARLY BUILD</span></header>
    <main className="game-main"><div className="eyebrow">A LONGER ROAD</div><h1>Your campaign<span>.</span></h1><p className="game-intro">Gather a party before the journey begins. Write a traveller from nothing, or start from anyone in the Compendium.</p>
      {loadError && <div className="error" role="alert">{loadError}<button onClick={() => setLoadError('')}>Dismiss</button></div>}
      <div className="game-layout campaign-layout"><div className="story-column">
        <div className="scene-meta"><span><UserRound size={14} />Character maker</span><span>{kindLabel[draft.source.kind]}{draft.source.name && ` · ${draft.source.name}`}</span></div>
        <article className="story-panel maker">
          <span className="eyebrow">{saved ? 'EDITING A PARTY MEMBER' : 'A NEW TRAVELLER'}</span><h2>{draft.name.trim() || 'Who walks this road?'}</h2>
          <div className="maker-start" role="group" aria-label="How to begin">
            <button className={draft.source.kind === 'scratch' && !picker ? 'selected' : ''} onClick={() => start({ ...blankCharacter(), id: draft.id })}><Plus size={16} /><span>Start from scratch<small>A blank sheet with sensible defaults</small></span></button>
            <button className={picker || draft.source.kind !== 'scratch' ? 'selected' : ''} aria-expanded={picker} onClick={() => setPicker(p => !p)}><BookOpen size={16} /><span>Load from Compendium<small>Any player character or NPC fills the whole sheet</small></span></button>
          </div>
          {picker && <section className="template-picker" aria-label="Load a character from the Compendium">
            <div className="picker-bar"><label className="picker-search"><Search size={15} /><span className="sr-only">Search characters</span><input autoFocus type="search" placeholder="Search characters and NPCs…" value={query} onChange={e => setQuery(e.target.value)} /></label>
              <div className="picker-kinds" role="group" aria-label="Filter by kind">{([['', 'All'], ['pc', 'Player characters'], ['npc', 'NPCs']] as const).map(([k, l]) => <button key={k} aria-pressed={kind === k} onClick={() => setKind(k)}>{l}</button>)}</div></div>
            {!pack && !loadError && <p role="status">Opening the Compendium…</p>}
            <ul className="picker-list">{matches.map(t => <li key={t.id}><button onClick={() => load(t)}><span><strong>{t.name}</strong><small>{t.kind === 'pc' ? 'Player character' : t.collection}</small></span><span className="picker-stats">HP {t.hp} · AC {t.ac}</span></button></li>)}</ul>
            {pack && !matches.length && <p className="picker-empty">No characters match that search.</p>}
          </section>}
          {notice && <p className="maker-notice" role="status">{notice}</p>}

          <fieldset><legend>Identity</legend><div className="field-grid identity-grid">
            <label className="maker-field"><span>Name</span><input value={draft.name} onChange={e => update({ name: e.target.value })} placeholder="e.g. Wren of the West Road" /></label>
            <NumberInput label="Level" value={draft.level} min={1} max={20} onChange={level => update({ level })} />
            <div className="maker-field"><span>Tier</span><output className="field-output">{Number.isInteger(draft.level) ? tierFor(draft.level) : '—'}</output></div>
            <label className="maker-field field-wide"><span>Description</span><textarea rows={2} value={draft.description} onChange={e => update({ description: e.target.value })} placeholder="One or two lines a player would say at the table." /></label>
          </div></fieldset>

          <fieldset><legend>Sheet</legend><p className="field-hint">Quadrath keeps HP and AC fixed and adds a modifier to 2d6 for checks.</p><div className="field-grid sheet-grid">
            <NumberInput label="HP" value={draft.hp} min={1} onChange={hp => update({ hp })} />
            <NumberInput label="AC" value={draft.ac} min={0} onChange={ac => update({ ac })} />
            {MODIFIERS.map(m => <NumberInput key={m} label={m} value={draft.modifiers[m]} onChange={n => update({ modifiers: { ...draft.modifiers, [m]: n } })} />)}
          </div></fieldset>

          <fieldset><legend>Actions</legend>{draft.actions.map((a, i) => <div className="entry-row" key={i}>
            <div className="field-grid action-grid">
              <label className="maker-field field-wide"><span>Name</span><input value={a.name} onChange={e => updateList('actions', i, { name: e.target.value })} placeholder="e.g. Dagger" /></label>
              <label className="maker-field"><span>Type</span><select value={a.action_type} onChange={e => updateList('actions', i, { action_type: e.target.value })}>{ACTION_TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
              <label className="maker-field field-number"><span>Attack bonus</span><input type="number" step={1} value={a.attack_bonus === null || Number.isNaN(a.attack_bonus) ? '' : a.attack_bonus} placeholder="none" onChange={e => updateList('actions', i, { attack_bonus: e.target.value === '' ? null : e.target.valueAsNumber })} /></label>
              <label className="maker-field"><span>Damage</span><input value={a.damage_roll} onChange={e => updateList('actions', i, { damage_roll: e.target.value })} placeholder="1d6" /></label>
              <label className="maker-field"><span>Damage type</span><input value={a.damage_type} onChange={e => updateList('actions', i, { damage_type: e.target.value })} placeholder="piercing" /></label>
              <label className="maker-field field-wide"><span>Effect</span><input value={a.effect} onChange={e => updateList('actions', i, { effect: e.target.value })} placeholder="Optional" /></label>
            </div><button className="icon-button remove-entry" aria-label={`Remove ${a.name || 'action'}`} onClick={() => update({ actions: draft.actions.filter((_, j) => j !== i) })}><X size={15} /></button></div>)}
            <button className="text-button add-entry" onClick={() => update({ actions: [...draft.actions, blankAction()] })}><Plus size={13} />Add action</button></fieldset>

          <fieldset><legend>Abilities</legend>{draft.abilities.map((a, i) => <div className="entry-row" key={i}>
            <div className="field-grid ability-grid">
              <label className="maker-field"><span>Name</span><input value={a.name} onChange={e => updateList('abilities', i, { name: e.target.value })} placeholder="e.g. Second Wind" /></label>
              <label className="maker-field"><span>Type</span><select value={a.action_type} onChange={e => updateList('abilities', i, { action_type: e.target.value })}>{ACTION_TYPES.map(t => <option key={t}>{t}</option>)}</select></label>
              <label className="maker-field field-wide"><span>Effect</span><input value={a.effect} onChange={e => updateList('abilities', i, { effect: e.target.value })} placeholder="What it does at the table" /></label>
            </div><button className="icon-button remove-entry" aria-label={`Remove ${a.name || 'ability'}`} onClick={() => update({ abilities: draft.abilities.filter((_, j) => j !== i) })}><X size={15} /></button></div>)}
            <button className="text-button add-entry" onClick={() => update({ abilities: [...draft.abilities, blankAbility()] })}><Plus size={13} />Add ability</button></fieldset>

          <fieldset><legend>Story & gear</legend><div className="field-grid">
            <label className="maker-field"><span>Traits <small>one per line</small></span><textarea rows={4} value={draft.traits.join('\n')} onChange={e => update({ traits: e.target.value.split('\n') })} /></label>
            <label className="maker-field"><span>Equipment <small>one per line</small></span><textarea rows={4} value={draft.equipment.join('\n')} onChange={e => update({ equipment: e.target.value.split('\n') })} /></label>
            <label className="maker-field field-wide"><span>Backstory</span><textarea rows={5} value={draft.backstory} onChange={e => update({ backstory: e.target.value })} placeholder="Where do they come from, and why are they on the road?" /></label>
          </div></fieldset>

          {errors.length > 0 && <div className="maker-errors" role="alert"><strong>A few things need attention:</strong><ul>{errors.map(e => <li key={e}>{e}</li>)}</ul></div>}
          <div className="maker-actions"><button className="maker-primary" onClick={save}><Save size={15} />{saved ? 'Save changes' : 'Add to party'}</button><button onClick={exportJson}><Download size={15} />Export JSON</button>{saved && <button onClick={() => start(blankCharacter())}><Plus size={15} />New character</button>}</div>
        </article></div>

        <aside className="campaign-aside">
          <div className="traveller-panel"><span className="eyebrow">SHEET PREVIEW</span><h2>{draft.name.trim() || 'Unnamed'}</h2><div className="traveller-stats"><div><small>HP</small><strong>{Number.isNaN(draft.hp) ? '—' : draft.hp}</strong></div><div><small>AC</small><strong>{Number.isNaN(draft.ac) ? '—' : draft.ac}</strong></div><div><small>LEVEL</small><strong>{Number.isNaN(draft.level) ? '—' : draft.level}</strong></div></div>
            <dl>{MODIFIERS.map(m => <div key={m}><dt>{m}</dt><dd>{Number.isNaN(draft.modifiers[m]) ? '—' : `${draft.modifiers[m] >= 0 ? '+' : ''}${draft.modifiers[m]}`}</dd></div>)}</dl></div>
          <div className="traveller-panel party-panel"><span className="eyebrow"><Users size={12} /> YOUR PARTY · {roster.length}</span>
            {!roster.length ? <p className="party-empty">No one has joined yet. Save a character to start your party.</p> : <ul className="party-list">{roster.map(c => <li key={c.id} className={c.id === draft.id ? 'current' : ''}>
              <button className="party-member" onClick={() => start(c)}><strong>{c.name}</strong><small>{kindLabel[c.source.kind]} · HP {c.hp} · AC {c.ac}</small></button>
              {confirmDelete === c.id ? <span className="party-confirm"><button onClick={() => remove(c.id)}>Remove</button><button onClick={() => setConfirmDelete('')}>Keep</button></span> : <button className="icon-button" aria-label={`Remove ${c.name} from party`} onClick={() => setConfirmDelete(c.id)}><Trash2 size={14} /></button>}
            </li>)}</ul>}
            <button className="text-button" onClick={() => start(blankCharacter())}><Plus size={13} />New character</button></div>
        </aside></div>
      <p className="game-disclaimer">Characters are saved in this browser. Campaign play — sessions, quests, and progression — is being built next. Exported JSON matches the Compendium's character format.</p>
      <a className="powered-link" href="https://forsidia.in" target="_blank" rel="noreferrer">Powered by Forsidia ↗</a>
    </main></div>;
}
