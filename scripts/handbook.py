"""Session-oriented Markdown presentation of canonical Quadrath data."""

def build_handbook(documents):
    docs={d['id']:d for d in documents}
    lines=['# Quadrath — Player and DM Handbook','','Free base content by Forsidia · CC BY 4.0','','[Quadrath project](https://forsidia.in/projects/quadrath-ttrpg)','','Draft edition. Mechanics marked draft in the JSON are proposed base rules for review.','','## At the table','','Players describe what they attempt. The DM calls for a roll when the outcome is uncertain and describes the consequences. Use the listed bonuses directly; there are no underlying ability scores.','','| Task | Resolution |','|---|---|','| Check or save | 2d6 + relevant modifier; meet or exceed DC |','| Attack | 2d6 + attack bonus; meet or exceed AC |','| Opposed check | Both roll; ties favor the defender |','| Critical / fumble | Natural 12 doubles damage dice; natural 2 misses |','| Turn | Move up to Speed, one action, at most one reaction |','| Difficulties | Easy 6 · Standard 8 · Challenging 10 · Hard 12 · Exceptional 14 |','','### Damage, defenses, and recovery','','Subtract damage from HP. At 10% HP a creature is incapacitated; at 0 HP it dies. Spells and potions can restore HP during combat. Partial cover grants +1 AC; substantial cover grants +2. Dodge uses an action and gives attackers −2 until your next turn. Disengage uses an action to avoid opportunity attacks. A safe one-hour rest restores 1d6 HP and short-rest abilities; a long rest restores all HP and daily abilities.','','### Choosing a modifier','','Intelligence covers knowledge, reasoning, observation, and magical understanding. Constitution covers endurance and physical effort. Dexterity covers agility and reflexes. Persuasion covers negotiation; charisma covers presence and force of personality. Roleplay may grant +1 or −1.','','## Starting characters','']
    def section(title):lines.extend(['',f'## {title}',''])
    def block(n,pc=False):
        sheet=n.get('sheet',n);mods=sheet.get('modifiers',n.get('bonuses',{}))
        lines.extend([f"### {n.get('name',n.get('title'))}",'',f"HP {sheet['hp']} · AC {sheet['ac']} · "+' · '.join(f'{k[:3].upper()} {v:+d}' for k,v in mods.items()),''])
        if n.get('description'):lines.extend([n['description'],''])
        if n.get('backstory'):lines.extend([n['backstory'],''])
        for a in n.get('actions',[])+n.get('abilities',[]):
            if a.get('spell_ref'):detail=a['spell_ref'].removeprefix('spell.').replace('-',' ').title()+' (see spells)'
            else:
                d=a.get('damage',{});detail=(f"2d6 {a['attack_bonus']:+d} vs AC; " if 'attack_bonus' in a else '')+(f"{d['roll']} {d['type']}" if d.get('roll')!='0' else '')
                if 'healing' in a:detail+=f"; restore {a['healing'].get('roll','damage dealt')} HP"
                detail+='; '+a.get('effect','')
                if a.get('repeat'):detail+=f"; {a['repeat']} attacks"
            lines.extend([f"- **{a['name']}** ({a.get('action_type','passive')}): {detail.strip('; ')}"])
        lines.append('')
    for d in documents:
        if d['type']=='character':block(d,True)
    section('Spells')
    lines.extend(['Attack spells use 2d6 + intelligence against AC unless a save is listed. Zero damage means the spell applies its effect instead. Healing restores HP and is separate from damage. Beam spells require focus. Detailed ranges, targeting, effects, and draft design status are available in the JSON.',''])
    for s in docs['spells.catalog']['spells']:
        d=s['damage'];r=s['resolution'];summary=[]
        if r['kind']=='attack':summary.append('2d6 + INT vs AC')
        elif r['kind'] in ('save','check'):summary.append(f"{r['roll']}, DC {r['dc']}"+(f"; success: {r['success']}" if 'success' in r else ''))
        if d['roll']!='0':summary.append(f"{d['roll']} {d['type']}")
        if s.get('healing'):summary.append('restore '+str(s['healing'].get('roll',s['healing'].get('amount')))+' HP')
        summary.append(f"range {s['range']['value']} {s['range']['unit']}; duration {s['duration']['value']} {s['duration']['unit']}")
        lines.extend([f"### {s['name']}",'',' · '.join(summary)+'. '+s['effect'],''])
        for e in s['effects']:lines.extend(['- '+', '.join(f'{k.replace("_"," ")}: {v}' for k,v in e.items())])
    section('Equipment')
    lines.extend(['| Weapon | Attack bonus | Damage |','|---|---|---|'])
    for w in docs['equipment.catalog']['weapons']:
        enchant=w.get('enchantment',{}).get('attack_bonus',0)
        total=w['attack_bonus']+enchant
        note=f" (default +{w['attack_bonus']}, enchanted +{enchant})" if enchant else ''
        lines.append(f"| {w['name']} | +{total}{note} | {w['damage']['roll']} {w['damage']['type']} |")
    lines.append('')
    for item in docs['equipment.catalog']['items']:lines.extend([f"- **{item['name']}:** {item.get('effect','')}"+(f" Damage: {item['damage']['roll']} {item['damage']['type']}." if item['damage']['roll']!='0' else '')])
    section('DM reference: NPCs')
    for npc in docs['npcs.okla-deli']['npcs']:block(npc)
    section('Supporting cast and encounter templates')
    for npc in docs['npcs.supporting-cast']['npcs']:block(npc)
    section('Traps')
    for t in docs['traps.catalog']['traps']:
        lines.extend([f"### {t['name']}",'',f"**Trigger:** {t['trigger']}. **Notice:** {t['notice']['ability']} DC {t['notice']['dc']}. **Disable:** {t['disable']['ability']} DC {t['disable']['dc']}. **Save:** {t['save']['ability']} DC {t['save']['dc']}. **Damage:** {t['damage']['roll']} {t['damage']['type']}. {t['effect']}",''])
    section('Running Okla Deli')
    adv=docs['adventure.okla-deli'];lines.extend([adv['style'],'',adv['opening_scene'],''])
    for loc in adv['locations']:lines.extend([f"- **{loc['name']}:** {loc['activity']}"])
    q=adv['main_quest'];lines.extend(['','### '+q['title'],'',q['discovery'],'',f"Reward: {q['reward']['base']}; {q['reward']['negotiated']}.",''])
    for scene in q['scenes']:lines.extend([f"- **{scene['id'].replace('-',' ').title()}:** {scene['direction']}"])
    lines.extend(['',q['mystery'],'','### Random encounters','','Roll 2d6.',''])
    for e in adv['random_encounters']:lines.append(f"- **{e['roll']}:** {e['event']}")
    lines.extend(['','### Side quests',''])
    for q in adv['side_quests']:lines.append(f"- **{q['hook']} ({q['reward']}):** {q['twist']}")
    lines.extend(['','### Trading and law','',*adv['trade']['checks'],'',adv['escalation'],'',*adv['dm_principles']])
    section('Setting and campaign context')
    for k in docs['lore.four-kingdoms']['kingdoms']:lines.extend([f"### {k['name']}",'',f"{k['ruler']}, {k['ruler_role']}. {k['description']}",''])
    for p in docs['lore.planes']['places']:lines.extend([f"**{p['name']}:** {p['description']}",''])
    f=docs['faction.travellers-of-the-dark'];lines.extend(['### '+f['title'],'',f['dynamic'],''])
    for m in f['members']:lines.extend([f"**{m['id']}:** {m['profile']}",''])
    story=docs['story.journey-to-the-sword-of-gleam'];lines.extend(['### '+story['title'],'',story['quest'],'',story['eldritch_storm'],'',story['memory'],''])
    section('Session continuity')
    for s in docs['sessions.okla-deli']['sessions']:
        lines.extend([f"### {s['title']} ({s['status']})",''])
        for scene in s['scenes']:lines.extend([f"**{scene['title']}:** "+' '.join(scene['events']),''])
    return '\n'.join(line.rstrip() for line in lines).rstrip()+'\n'
