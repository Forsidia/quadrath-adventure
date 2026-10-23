import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownAZ, ArrowLeft, ArrowUpRight, BookOpen, Boxes, Check, ChevronRight, Code2, Compass, Copy, FileJson, Filter, Menu, RefreshCw, Search, Sparkles, Swords, X } from 'lucide-react';
import { label, loadPack, quickStats, type ContentPack, type Entity, type RecordEntry, type Value } from './data';
import { JsonCode } from './JsonCode';
import './detail.css';

export interface ContentViewerProps {
  /** A versioned content database exported by scripts/bundle.py. */
  bundleUrl: string;
  title?: string;
}

const preferredCategories = ['Player characters', 'NPCs', 'Spells', 'Weapons', 'Items', 'Traps', 'Rules', 'Magic', 'Adventures', 'Sessions', 'Factions', 'World', 'Stories', 'Collections'];
const categoryIcon = (category: string) => category === 'Spells' || category === 'Magic' ? <Sparkles size={17} /> : category === 'Weapons' || category === 'NPCs' ? <Swords size={17} /> : category === 'World' || category === 'Adventures' ? <Compass size={17} /> : <BookOpen size={17} />;
const plain = (value: Value): string => Array.isArray(value) ? value.map(plain).join(', ') : value && typeof value === 'object' ? Object.entries(value).map(([k, v]) => `${label(k)}: ${plain(v)}`).join(' · ') : String(value ?? 'None');
function hashKey() { try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; } }
const asObject = (value: Value | undefined): Entity => value && typeof value === 'object' && !Array.isArray(value) ? value : {};
const signed = (value: number) => value >= 0 ? `+${value}` : String(value);
const compact = (value: Value | undefined): string => {
  if (value === undefined) return '';
  const obj = asObject(value);
  if ('value' in obj && 'unit' in obj) return `${obj.value} ${obj.unit}`;
  return plain(value);
};

function RecordStats({ data }: { data: Entity }) {
  const sheet = data.sheet ? asObject(data.sheet) : data;
  const damage = asObject(data.damage), healing = asObject(data.healing), enchantment = asObject(data.enchantment), resolution = asObject(data.resolution);
  const bonus = typeof data.attack_bonus === 'number' ? data.attack_bonus : undefined;
  const total = bonus === undefined ? undefined : bonus + Number(enchantment.attack_bonus || 0);
  const stats = [
    ['Hit points', sheet.hp], ['Armor class', sheet.ac],
    ['Attack bonus', total === undefined ? undefined : signed(total)],
    ['Damage', damage.roll && damage.roll !== '0' ? damage.roll : undefined],
    ['Damage type', damage.roll && damage.roll !== '0' ? damage.type : undefined],
    ['Healing', healing.roll || healing.amount], ['Range', data.range], ['Duration', data.duration],
  ].filter(([, value]) => value !== undefined && value !== null && value !== '');
  return <>{stats.length > 0 && <div className="stat-grid">{stats.map(([name, value]) => <div className="stat-tile" key={String(name)}><span>{String(name)}</span><strong>{compact(value as Value)}</strong></div>)}</div>}
    {bonus !== undefined && <p className="attack-formula">2d6 {signed(total!)} vs AC{Number(enchantment.attack_bonus) ? <span>Default {signed(bonus)} · Enchantment {signed(Number(enchantment.attack_bonus))}</span> : null}</p>}
    {bonus === undefined && resolution.kind && resolution.kind !== 'automatic' && <p className="attack-formula">{compact(resolution.roll)}{resolution.dc !== undefined ? ` · DC ${resolution.dc}` : resolution.against ? ` vs ${String(resolution.against).toUpperCase()}` : ''}{resolution.success && <span>On success: {label(String(resolution.success))}</span>}</p>}
    {damage.on_success && <p className="attack-formula">On a successful save: {String(damage.on_success)}</p>}
    {Object.keys(enchantment).length > 0 && <div className="enchantment-note"><Sparkles size={17} /><div><strong>{String(enchantment.name || 'Enchanted')}</strong><p>{String(enchantment.effect || '')}</p></div></div>}
  </>;
}

function ValueView({ value, field = '', records, select }: { value: Value; field?: string; records: RecordEntry[]; select: (entry: RecordEntry) => void }) {
  if (value === null) return <span className="muted">None</span>;
  if (typeof value !== 'object') {
    if (field.endsWith('_ref')) {
      const target = records.find(r => r.id === value || r.path === value);
      if (target) return <button className="reference" onClick={() => select(target)}>{target.name}<ArrowUpRight size={13} /></button>;
    }
    return <span className="prose">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    if (!value.length) return <span className="muted">None recorded</span>;
    if (value.every(v => typeof v !== 'object' || v === null)) return <div className="chips">{value.map((v, i) => <span className="chip" key={i}>{plain(v)}</span>)}</div>;
    return <div className="object-list">{value.map((v, i) => <div className="object-card" key={i}><ValueView value={v} records={records} select={select} /></div>)}</div>;
  }
  return <dl className="fields">{Object.entries(value).map(([key, item]) => <div className="field" key={key}><dt>{label(key)}</dt><dd><ValueView value={item} field={key} records={records} select={select} /></dd></div>)}</dl>;
}

function Detail({ entry, records, select, back }: { entry: RecordEntry; records: RecordEntry[]; select: (entry: RecordEntry) => void; back: () => void }) {
  const [copied, setCopied] = useState(false);
  const jsonUrl = useMemo(() => URL.createObjectURL(new Blob([JSON.stringify(entry.data, null, 2)], { type: 'application/json' })), [entry]);
  useEffect(() => () => URL.revokeObjectURL(jsonUrl), [jsonUrl]);
  useEffect(() => setCopied(false), [entry.key]);
  const hidden = new Set(['id', 'name', 'title', 'type', 'version', 'description', 'summary', 'backstory', 'damage', 'healing', 'attack_bonus', 'range', 'duration', 'enchantment', 'sheet', 'hp', 'ac', 'bonuses', 'resolution', 'mechanics_status', 'backstory_status', 'action_type']);
  const modifiers = entry.data.sheet ? asObject(asObject(entry.data.sheet).modifiers) : asObject(entry.data.bonuses);
  async function copy() { try { await navigator.clipboard.writeText(location.href); setCopied(true); } catch { setCopied(false); } }
  return <article className="detail" aria-label="Record details">
    <div className="detail-toolbar"><button className="text-button mobile-back" onClick={back}><ArrowLeft size={16} />All records</button><span className="eyebrow">FIELD REFERENCE</span><div className="detail-actions"><button className="icon-button" aria-label="Copy record link" title="Copy record link" onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}</button><a className="icon-button" aria-label="Download record JSON" title="Download record JSON" href={jsonUrl} download={(entry.id || 'record') + '.json'}><FileJson size={16} /></a></div></div>
    <div className="detail-heading"><span className="badge">{entry.category}</span>{entry.data.action_type && <span className="badge">{label(String(entry.data.action_type))}</span>}<h2>{entry.name}</h2></div>
    <RecordStats data={entry.data} />
    {Object.keys(modifiers).length > 0 && <div className="modifier-strip">{Object.entries(modifiers).map(([key, value]) => <div key={key}><span>{key.slice(0, 3).toUpperCase()}</span><strong>{signed(Number(value))}</strong></div>)}</div>}
    {(entry.data.description || entry.data.summary) && <p className="description">{plain(entry.data.description || entry.data.summary)}</p>}
    {entry.data.backstory && <section className="backstory"><h3>Backstory</h3><p>{plain(entry.data.backstory)}</p></section>}
    {Object.entries(entry.data).filter(([key]) => !hidden.has(key) && !(key === 'effect' && asObject(entry.data.enchantment).effect === entry.data.effect)).map(([key, value]) => key === 'reference_sections' ? <details key={key}><summary>Full reference text</summary><ValueView value={value} records={records} select={select} /></details> : <section className="detail-section" key={key}><h3>{label(key)}</h3>{(key === 'actions' || key === 'abilities') && Array.isArray(value) ? <div className="action-list">{value.map((item, i) => { const action = asObject(item); return <div className="action-summary" key={i}><div><strong>{String(action.name || 'Action')}</strong><small>{String(action.action_type || 'passive')}</small></div>{quickStats(action) && <p className="action-stats">{quickStats(action)}</p>}{action.effect && <p>{String(action.effect)}</p>}{action.spell_ref && <ValueView value={action.spell_ref} field="spell_ref" records={records} select={select} />}{action.weapon_ref && <ValueView value={action.weapon_ref} field="weapon_ref" records={records} select={select} />}{action.repeat && <p>{String(action.repeat)} attacks</p>}{Number(action.equipment_attack_adjustment) !== 0 && action.equipment_attack_adjustment !== undefined && <p>Equipped adjustment {signed(Number(action.equipment_attack_adjustment))}</p>}</div>; })}</div> : <ValueView value={value} records={records} select={select} />}</section>)}
    <details><summary>Record information</summary><p className="record-id">{entry.id || entry.collection}</p>{entry.data.resolution && <ValueView value={entry.data.resolution} records={records} select={select} />}{entry.data.mechanics_status && <p className="prose">{String(entry.data.mechanics_status)}</p>}{entry.data.backstory_status && <p className="prose">{String(entry.data.backstory_status)}</p>}</details>
    <details className="raw-json"><summary><Code2 size={15} />Inspect JSON</summary><JsonCode value={entry.data} /></details>
  </article>;
}

export function ContentViewer({ bundleUrl, title = 'Quadrath' }: ContentViewerProps) {
  const [pack, setPack] = useState<ContentPack | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [collection, setCollection] = useState('');
  const [ascending, setAscending] = useState(true);
  const [selected, setSelected] = useState(hashKey);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDetail, setMobileDetail] = useState(Boolean(hashKey()));
  const searchRef = useRef<HTMLInputElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError('');
    loadPack(bundleUrl, controller.signal).then(data => { setPack(data); setLoading(false); }).catch(reason => {
      if (!controller.signal.aborted) { setError(reason instanceof Error ? reason.message : 'Unable to load content.'); setLoading(false); }
    });
    return () => controller.abort();
  }, [bundleUrl, revision]);
  const handbookUrl = useMemo(() => pack ? URL.createObjectURL(new Blob([pack.resources.handbook], { type: 'text/markdown;charset=utf-8' })) : '', [pack]);
  useEffect(() => () => { if (handbookUrl) URL.revokeObjectURL(handbookUrl); }, [handbookUrl]);
  useEffect(() => {
    const change = () => { const key = hashKey(); setSelected(key); setMobileDetail(Boolean(key)); };
    const shortcut = (event: KeyboardEvent) => { if ((event.ctrlKey || event.metaKey) && event.key === 'k') { event.preventDefault(); searchRef.current?.focus(); } if (event.key === 'Escape') { setMenuOpen(false); setMobileDetail(false); } };
    window.addEventListener('hashchange', change); window.addEventListener('keydown', shortcut);
    return () => { window.removeEventListener('hashchange', change); window.removeEventListener('keydown', shortcut); };
  }, []);
  const records = pack?.records || [];
  const categories = preferredCategories.filter(c => records.some(r => r.category === c));
  const collections = useMemo(() => [...new Set(records.map(r => r.collection))].sort(), [pack]);
  const filtered = useMemo(() => records.filter(r => (!category || r.category === category) && (!collection || r.collection === collection) && query.trim().toLowerCase().split(/\s+/).every(term => (r.name + ' ' + r.category + ' ' + r.search).toLowerCase().includes(term))).sort((a, b) => (ascending ? 1 : -1) * a.name.localeCompare(b.name)), [pack, category, collection, query, ascending]);
  const entry = records.find(r => r.key === selected);
  function select(r: RecordEntry) { setSelected(r.key); setMobileDetail(true); location.hash = encodeURIComponent(r.key); detailRef.current?.scrollTo({ top: 0 }); }
  function choose(c: string) { setCategory(c); setMenuOpen(false); setMobileDetail(false); }
  const count = (c: string) => records.filter(r => r.category === c).length;
  return <div className="app-shell">
    {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={'sidebar ' + (menuOpen ? 'is-open' : '')}>
      <a className="brand" href="https://forsidia.in/products/quadrath-ttrpg" target="_blank" rel="noreferrer"><span className="brand-mark">Q</span><span>{title}<small>COMPENDIUM</small></span></a>
      <div className="pack-label"><span className="status-dot" />QUADRATH / OPEN CONTENT</div>
      <nav aria-label="Content categories"><button className={'nav-item ' + (!category ? 'active' : '')} onClick={() => choose('')}><Boxes size={17} /><span>All content</span><small>{records.length}</small></button><div className="nav-heading">THE COMPENDIUM</div>{categories.map(c => <button key={c} className={'nav-item ' + (category === c ? 'active' : '')} onClick={() => choose(c)}>{categoryIcon(c)}<span>{c}</span><small>{count(c)}</small></button>)}</nav>
      <div className="sidebar-bottom"><div className="open-label">OPEN BY DESIGN <ArrowUpRight size={13} /></div><p>Rules, world, and app are open source. Bring them to your next adventure.</p><a href="https://github.com/Forsidia/quadrath-adventure" target="_blank" rel="noreferrer">View on GitHub ↗</a><div className="license">Code MIT · Content CC BY 4.0</div></div>
    </aside>
    <div className="main-shell"><header className="topbar"><button className="icon-button mobile-menu" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button><a href="https://forsidia.in/products/quadrath-ttrpg" target="_blank" rel="noreferrer">About the game <ArrowUpRight size={14} /></a></header>
      <main><div className="page-heading"><div><div className="eyebrow">YOUR TABLE. YOUR STORY.</div><h1>The Quadrath compendium<span>.</span></h1><p>Find a spell, meet a character, or discover what lies beyond the town gate.</p></div><div className="edition"><span className="status-dot" />OPEN EDITION <small>{pack ? `v${pack.manifest.version}` : 'Loading'}</small></div></div>
        <div className="searchbar"><Search size={19} /><input ref={searchRef} aria-label="Search content" placeholder="Search spells, characters, lore…" type="search" value={query} onChange={e => { setQuery(e.target.value); setMobileDetail(false); }} /><kbd>⌘ / Ctrl K</kbd><button className={'icon-button ' + (loading ? 'spinning' : '')} disabled={loading} onClick={() => setRevision(x => x + 1)} aria-label="Reload content" title="Reload content"><RefreshCw size={17} /></button></div>
        <div className="filterbar"><div className="category-chips"><button className={!category ? 'selected' : ''} onClick={() => choose('')}>Everything</button>{['Player characters', 'NPCs', 'Spells', 'Rules', 'World'].filter(c => categories.includes(c)).map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => choose(c)}>{c}</button>)}</div><label className="collection-filter"><Filter size={14} /><span className="sr-only">Filter by collection</span><select value={collection} onChange={e => { setCollection(e.target.value); setMobileDetail(false); }}><option value="">All collections</option>{collections.map(c => <option key={c}>{c}</option>)}</select></label></div>
        {error && <div className="error" role="alert"><strong>Content could not be loaded.</strong><p>{error}</p><button onClick={() => setRevision(x => x + 1)}>Try again</button></div>}
        <div className={'database ' + (mobileDetail ? 'show-detail' : '')}><section className="record-list" aria-label="Content records"><div className="list-header"><div><h2>{category || 'All records'}</h2><span aria-live="polite">{loading ? 'Loading…' : `${filtered.length} entries`}</span></div><button className="text-button" onClick={() => setAscending(a => !a)} aria-label={ascending ? 'Sort name descending' : 'Sort name ascending'}><ArrowDownAZ size={16} />{ascending ? 'A–Z' : 'Z–A'}</button></div><div className="column-head"><span>NAME / REFERENCE</span><span>TYPE</span></div><div className="record-scroll">{loading && !pack ? <div className="empty">Opening the compendium…</div> : filtered.map(r => <button className={'record-row ' + (selected === r.key ? 'is-selected' : '')} key={r.key} onClick={() => select(r)} aria-pressed={selected === r.key}><span className="record-icon">{categoryIcon(r.category)}</span><span className="record-name"><strong>{r.name}</strong><small>{quickStats(r.data) || r.collection}</small></span><span className="row-badge">{r.category}</span><ChevronRight size={15} /></button>)}{!loading && !filtered.length && <div className="empty"><Search size={26} /><h3>No entries found</h3><p>Try another name or clear your filters.</p><button onClick={() => { setQuery(''); setCategory(''); setCollection(''); }}>Clear filters</button></div>}</div></section><div className="detail-scroll" ref={detailRef}>{entry ? <Detail entry={entry} records={records} select={select} back={() => { setMobileDetail(false); location.hash = ''; }} /> : <div className="detail-placeholder"><div className="placeholder-symbol"><Compass size={40} strokeWidth={1} /></div><span className="eyebrow">A WORLD WITHIN REACH</span><h2>{selected ? 'This entry has moved.' : 'Every adventure starts\nwith a little curiosity.'}</h2><p>{selected ? 'Choose a record from the library to continue.' : 'Select an entry to explore its rules, story, and everything you need at the table.'}</p><div className="placeholder-rule" /><small>BUILT FROM THE OPEN QUADRATH CONTENT</small></div>}</div></div>
        <footer><span><span className="status-dot" />{pack?.manifest.documents.length || 0} collections · Open source</span><a href="https://forsidia.in" target="_blank" rel="noreferrer">Powered by Forsidia <ArrowUpRight size={13} /></a><a href={handbookUrl || undefined} download="quadrath-handbook.md">Session handbook <ArrowUpRight size={13} /></a></footer>
      </main>
    </div>
  </div>;
}
