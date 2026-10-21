# Quadrath — Player and DM Handbook

Free base content by Forsidia · CC BY 4.0

[Quadrath project](https://forsidia.in/projects/quadrath-ttrpg)

Draft edition. Mechanics marked draft in the JSON are proposed base rules for review.

## At the table

Players describe what they attempt. The DM calls for a roll when the outcome is uncertain and describes the consequences. Use the listed bonuses directly; there are no underlying ability scores.

| Task | Resolution |
|---|---|
| Check or save | 2d6 + relevant modifier; meet or exceed DC |
| Attack | 2d6 + attack bonus; meet or exceed AC |
| Opposed check | Both roll; ties favor the defender |
| Critical / fumble | Natural 12 doubles damage dice; natural 2 misses |
| Turn | Move up to Speed, one action, at most one reaction |
| Difficulties | Easy 6 · Standard 8 · Challenging 10 · Hard 12 · Exceptional 14 |

### Damage, defenses, and recovery

Subtract damage from HP. At 10% HP a creature is incapacitated; at 0 HP it dies. Spells and potions can restore HP during combat. Partial cover grants +1 AC; substantial cover grants +2. Dodge uses an action and gives attackers −2 until your next turn. Disengage uses an action to avoid opportunity attacks. A safe one-hour rest restores 1d6 HP and short-rest abilities; a long rest restores all HP and daily abilities.

### Choosing a modifier

Intelligence covers knowledge, reasoning, observation, and magical understanding. Constitution covers endurance and physical effort. Dexterity covers agility and reflexes. Persuasion covers negotiation; charisma covers presence and force of personality. Roleplay may grant +1 or −1.

## Starting characters

### The Merchant

HP 26 · AC 8 · INT +3 · CON +1 · DEX +1 · PER +2 · CHA +1

A practical trader who knows routes, prices, and how to keep a negotiation moving.

A travelling trader accustomed to bargaining from a position of strength, the merchant hired Garran and Veyra to protect the wagon. In the played visit to Okla Deli, refusal to pay a 2 GP gate fee escalated into a deadly confrontation. The merchant rejected surrender and was killed by the Guard Sergeant; both escorts were jailed.

- **Dagger** (action): 2d6 +1 vs AC; 1d6 piercing
- **Crossbow** (action): 2d6 +1 vs AC; 1d6 piercing
- **Experienced Trader** (passive): +2 to INT checks involving appraisal or commerce.
- **Silver Tongue** (short-rest): Reroll a failed negotiation check.
- **Emergency Dodge** (short-rest): +2 AC against one attack.

### The Teacher

HP 7 · AC 10 · INT +2 · CON +0 · DEX +0 · PER +1 · CHA +2

A patient instructor whose lessons turn confusion into a plan of action.

A travelling instructor collects local histories and teaches practical literacy along the road. The ongoing Teacher’s Quest has no recorded events yet; the teacher’s reasons for visiting Okla Deli remain open.

- **Walking Staff** (action): 2d6 +0 vs AC; 1d6 bludgeoning
- **Instruct** (action): Give one ally a clear plan; the DM may grant +1 to the next relevant check.

### The Farmer

HP 10 · AC 11 · INT +0 · CON +2 · DEX +1 · PER +0 · CHA +1

A grounded survivor who understands weather, land, tools, and the cost of a bad season.

A farmer from the surrounding countryside brings produce to market and knows the cart tracks better than the main road. Familiar with repairs and hard seasons, the farmer is drawn into adventure when ordinary work reveals trouble that town officials overlook.

- **Hand Tool** (action): 2d6 +1 vs AC; 1d6 bludgeoning
- **Practical Repair** (action): Repair a simple object or make a useful field improvisation.


## Spells

Attack spells use 2d6 + intelligence against AC unless a save is listed. Zero damage means the spell applies its effect instead. Healing restores HP and is separate from damage. Beam spells require focus. Detailed ranges, targeting, effects, and draft design status are available in the JSON.

### Fire Strike

2d6 + INT vs AC · 2d6 fire · range 60 ft; duration 1 round. A precise projectile of flame.

### Ice Strike

2d6 + intelligence, DC 10; success: negate_condition · 2d6 ice · range 60 ft; duration 1 round. The target may be slowed or hindered at the DM's discretion.

- kind: condition, condition: slowed, duration rounds: 1, repeat save: end_of_turn
### Lightning Strike

2d6 + INT vs AC · 2d6 lightning · range 60 ft; duration 1 round. A fast, targeted lightning projectile.

### TrueLight Strike

2d6 + INT vs AC · 2d6 radiant · range 60 ft; duration 1 round. Especially effective against undead and certain monstrous foes.

### TrueDark Strike

2d6 + INT vs AC · 2d6 corrosive-shadow · range 60 ft; duration 1 round. A projectile of corrosive shadow.

### Fire Storm

2d6 + dexterity, DC 10; success: half_damage · 3d6 fire · range 60 ft; duration 1 round. A fiery area attack.

### Ice Storm

2d6 + intelligence, DC 10; success: negate_condition · 3d6 ice · range 60 ft; duration 1 round. Creatures may be slowed or hindered.

- kind: condition, condition: slowed, duration rounds: 1, repeat save: end_of_turn
### Lightning Storm

2d6 + dexterity, DC 10; success: half_damage · 3d6 lightning · range 60 ft; duration 1 round. An area of crackling lightning.

### Fire Beam

2d6 + INT vs AC · 2d6 fire · range 60 ft; duration 1 round. A sustained attack requiring focus.

### Ice Beam

2d6 + INT vs AC · 2d6 ice · range 60 ft; duration 1 round. A sustained attack requiring focus.

### Lightning Beam

2d6 + INT vs AC · 2d6 lightning · range 60 ft; duration 1 round. A sustained attack requiring focus.

### TrueLight Beam

2d6 + INT vs AC · 2d6 radiant · range 60 ft; duration 1 round. A sustained radiant attack.

### Dark Beam

2d6 + INT vs AC · 2d6 corrosive-shadow · range 60 ft; duration 1 round. A sustained corrosive shadow attack.

### Shield

range 60 ft; duration 1 round. Forms a barrier that deflects or absorbs attacks.

- kind: ac_bonus, value: 2, duration rounds: 3
### Heal

restore 2d6 + INT HP · range 60 ft; duration 1 round. The target regains HP.

### Mass Heal

restore 4d6 + INT HP · range 60 ft; duration 1 round. All chosen creatures regain HP.

### Turn Undead

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Repels or destroys undead with TrueLight, scaling with caster level.

- kind: condition, condition: turned, duration rounds: 1, repeat save: end_of_turn
### Dispel Magic

2d6 + intelligence, DC 10 · range 60 ft; duration 1 round. Nullifies an active spell, enchantment, magical barrier, or curse.

- kind: remove_magic, max effects: 1
### Mass Halt

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 hour. Halts movement for 1 hour; duration can scale with caster skill.

- kind: condition, condition: immobilized, duration rounds: 600, repeat save: end_of_turn, target filter: level < caster_level
### Mana Drain

range 60 ft; duration 1 round. Siphons magical energy and bolsters the caster's reserves.

### Greater Mana Drain

range 60 ft; duration 1 round. A stronger Mana Drain.

### Health Drain

2d6 + INT vs AC · 2d6 necrotic · restore damage_dealt HP · range 60 ft; duration 1 round. Leeches vitality and heals the caster as it wounds the target.

### Greater Health Drain

2d6 + INT vs AC · 3d6 necrotic · restore damage_dealt HP · range 60 ft; duration 1 round. A stronger Health Drain.

### Banish Creature

2d6 + intelligence, DC 10; success: negate · range 60 ft; duration 1 round. Sends an extraplanar being home if it fails a contest based on its power.

- kind: banish, destination: home_plane
### Summon

range 60 ft; duration 1 round. Calls an entity appropriate to the caster's alignment and preparation.

- kind: summon, npc ref: npc.summoned-guardian, count: 1, duration rounds: 10
### Greater Summon

range 60 ft; duration 1 round. Calls a more powerful entity, potentially a dragon, celestial guardian, or fiendish beast.

- kind: summon, npc ref: npc.summoned-guardian, count: 2, duration rounds: 10
### Dominate Creature

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Forces obedience unless the target resists according to its power.

- kind: condition, condition: controlled, duration rounds: 1, repeat save: end_of_turn
### Resurrection

restore 0 HP · range 60 ft; duration 1 round. Restores life using immense focus and rare components; limited to higher-level casters.

- kind: revive, hp: 1, requires: ['rare_components'], minimum level: 11
### Arcane Gate

range 60 ft; duration 1 round. Opens a portal for instant travel or tactical repositioning.

- kind: portal, endpoints: 2, max distance ft: 60, duration rounds: 10
### Hold Monster

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Paralyzes a creature unless it breaks free through will or strength.

- kind: condition, condition: paralyzed, duration rounds: 1, repeat save: end_of_turn
### True Sight

range 60 ft; duration 1 round. Reveals illusions, invisibility, and shape-shifting for a limited time.

- kind: sense, sense: true_sight, range ft: 60, duration rounds: 100
### Mass Suggestion

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Influences multiple minds with a compelling command.

- kind: condition, condition: suggested, duration rounds: 1, repeat save: end_of_turn
### Planar Binding

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Forces a creature into service for a set duration through a contest of wills.

- kind: condition, condition: bound, duration rounds: 1, repeat save: end_of_turn
### Fire Slash

2d6 + INT vs AC · 2d6 fire · range 60 ft; duration 1 round. A sweeping fire attack.

### Fear

2d6 + intelligence, DC 10; success: negate_condition · range 60 ft; duration 1 round. Frightens a target.

- kind: condition, condition: frightened, duration rounds: 1, repeat save: end_of_turn
### Psychic Heal

range 60 ft; duration 1 round. Restores memories; requires a sacrifice and recipients within one meter.

- kind: restore_memory, radius meters: 1, requires: ['sacrifice']

## Equipment

| Weapon | Attack bonus | Damage |
|---|---|---|
| Dagger | +1 | 1d6 piercing |
| Crossbow | +1 | 1d6 piercing |
| Sword | +2 | 2d6 slashing |
| Blade | +3 | 2d6 slashing |
| Scimitar | +1 | 1d6 slashing |
| Spear | +1 | 1d6 piercing |
| Bow | +2 | 1d6 piercing |
| Improvised Weapon | +0 | 1d6 bludgeoning |
| Stone Fist | +2 | 2d6 bludgeoning |
| Bursting Fist | +3 | 3d6 ['piercing', 'bludgeoning'] |
| Anti-Magic Sword | +4 (default +2, enchanted +2) | 4d6 slashing |
| Kick of Fury | +4 | 3d6 bludgeoning |

- **Blast Charge:** Conspicuous and dangerous in crowded streets. Damage: 4d6 ['fire', 'thunder'].
- **Smoke Bomb:** Heavy obscurement; ranged attacks through smoke are -2.
- **Flash Charge:** On a failed save, blinded until the end of the target's next turn.
- **Health Potion:** Restore the rolled HP.
- **Mana Potion:** Causes the user's spells to be doubly effective for the relevant effect.
- **Shared Clan Cloak:** Invisibility for up to 15 minutes at a time; resistance to divine, lightning, piercing, and slashing damage.
- **Leader's Mask:** See in total darkness up to 100 meters and gain resistance to psychic damage; enables Fear and Hold Monster without cooldown.
- **Old Man's Wooden Bracelet:** Casts Lightning Beam with a 0.5 second cooldown. Damage: 2d6 lightning.
- **Wolf's Wooden Bracelet:** Casts Fire Beam and Fire Slash with a 3 second cooldown. Damage: 2d6 fire.
- **Wolf's Ring:** Immunity to fire and poison.

## DM reference: NPCs

### Town Guard

HP 16 · AC 8 · INT +0 · CON +1 · DEX +0 · PER +0 · CHA +0

A local recruit assigned to gate duty and patrols. During the merchant’s visit, two guards demanded 2 GP at the gate; one was seriously injured. Later reinforcements suffered five deaths. Surviving guards remember the incident as a warning against letting a routine dispute turn into a battle.

- **Spear** (action): 2d6 +1 vs AC; 1d6 piercing
- **Hold the Line** (passive): +1 AC while adjacent to another shield-bearing guard.

### Halven, Guard Sergeant

HP 32 · AC 9 · INT +1 · CON +2 · DEX +0 · PER +0 · CHA +0

Halven rose through the watch by keeping patrols disciplined. During the merchant’s visit, he led reinforcements, offered surrender with 100 GP bail, and killed the merchant after refusal. Injured and below half HP, he was taken for treatment and later praised by the Captain.

- **Sword** (action): 2d6 +2 vs AC; 2d6 slashing; ; 2 attacks
- **Command** (once-per-fight): Nearby guards gain +1 to hit for one round.

### Edric, Okla Deli Mage

HP 38 · AC 7 · INT +4 · CON +1 · DEX +0 · PER +0 · CHA +0

Edric, Okla Deli’s patient and absent-minded mage, seeks to preserve old knowledge in the town library. He posted a request for a volunteer escort to retrieve a forgotten scroll. The merchant noticed the request but ignored it; the expedition remains an adventure opportunity rather than a completed session event.

- **Fire Strike** (action): Fire Strike (see spells)
- **Lightning Beam** (action): Lightning Beam (see spells)
- **Shield** (action): Shield (see spells)
- **Heal** (action): Heal (see spells)
- **Ward** (action): Increase AC to 9 for 3 rounds.

### Guard Captain, Half-Elf Barbarian

HP 60 · AC 12 · INT +2 · CON +3 · DEX +0 · PER +0 · CHA +0

A half-elf barbarian whose enchanted armor and anti-magic sword make the Captain the watch’s final response to dangerous threats. Arriving after the merchant’s battle, the Captain praised the sergeant and said the mayor might reward him. The Captain did not participate in the recorded fight.

- **Bursting Fist** (action): 2d6 +3 vs AC; 3d6 ['piercing', 'bludgeoning']
- **Anti-Magic Sword** (action): 2d6 +4 vs AC; 4d6 slashing; Negates magical attacks and effects on the target.
- **Kick of Fury** (action): 2d6 +4 vs AC; 3d6 bludgeoning
- **Enchanted Armor** (passive): Resistance to piercing and slashing damage.

### Mayor Liora Venn

HP 12 · AC 7 · INT +1 · CON +1 · DEX +0 · PER +0 · CHA +0

A former market administrator, Liora Venn became mayor by promising dependable roads and a prosperous town. The merchant’s deadly visit now tests her ability to support the watch while reassuring traders. The Captain suggested a reward for the sergeant, but the played session records no decision by the mayor.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Tomas Reed, Horsecart Owner

HP 18 · AC 8 · INT +1 · CON +1 · DEX +0 · PER +0 · CHA +0

Tomas earns a living moving passengers and goods between the town gate, farms, and market. He carries a watch-pattern sword and claims a retiring guard gave it to him after he helped recover a stranded patrol cart. A missing armory mark has led others to suspect theft; the truth remains open for play. No encounter with Tomas has yet been recorded in the played session.

- **Sword** (action): 2d6 +2 vs AC; 2d6 slashing


## Supporting cast and encounter templates

### Garran, Elite Guard

HP 58 · AC 10 · INT +1 · CON +3 · DEX +0 · PER +0 · CHA +0

A hired escort of the merchant, taken to jail after the merchant’s death. The session does not identify which escort was nearly incapacitated.

- **Sword** (action): 2d6 +3 vs AC; 2d6 slashing; ; 2 attacks
- **Crossbow** (action): 2d6 +2 vs AC; 1d6 piercing
- **Interpose** (reaction): An adjacent guard gives an attack against the merchant -2 to hit.
- **Second Wind** (short-rest): restore 2d6 HP; Heal the guard.

### Veyra, Elite Guard

HP 52 · AC 9 · INT +2 · CON +2 · DEX +0 · PER +0 · CHA +0

A hired escort of the merchant, taken to jail after the merchant’s death. The session does not identify which escort was nearly incapacitated.

- **Blade** (action): 2d6 +3 vs AC; 2d6 slashing; ; 2 attacks
- **Crossbow** (action): 2d6 +3 vs AC; 1d6 piercing
- **Interpose** (reaction): An adjacent guard gives an attack against the merchant -2 to hit.
- **Second Wind** (short-rest): restore 2d6 HP; Heal the guard.

### Civilian

HP 5 · AC 6 · INT +0 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Bandit

HP 12 · AC 7 · INT +0 · CON +1 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Scimitar** (action): 2d6 +1 vs AC; 1d6 slashing

### Town Archer

HP 13 · AC 7 · INT +1 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Bow** (action): 2d6 +2 vs AC; 1d6 piercing
- **Aimed Shot** (passive): +1 to hit if stationary.

### Bandit Leader

HP 36 · AC 8 · INT +1 · CON +2 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Sword** (action): 2d6 +2 vs AC; 2d6 slashing; ; 2 attacks
- **Reposition Ally** (once-per-fight): One ally repositions without triggering an opportunity attack.

### Archive Guardian

HP 24 · AC 9 · INT +0 · CON +2 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Stone Fist** (action): 2d6 +2 vs AC; 2d6 bludgeoning

### Halven, Sergeant

HP 32 · AC 9 · INT +1 · CON +2 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Sword** (action): 2d6 +2 vs AC; 2d6 slashing; ; 2 attacks

### Mara, Innkeeper

HP 5 · AC 6 · INT +0 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Torren, Blacksmith

HP 5 · AC 6 · INT +0 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Selvik, Trader

HP 5 · AC 6 · INT +0 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Ilwen, Collector

HP 5 · AC 6 · INT +0 · CON +0 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Improvised Weapon** (action): 2d6 +0 vs AC; 1d6 bludgeoning

### Goblin Burglar

HP 10 · AC 7 · INT +0 · CON +1 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Strike** (action): 2d6 +1 vs AC; 1d6 piercing

### Lizard Warden

HP 22 · AC 9 · INT +0 · CON +1 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Strike** (action): 2d6 +2 vs AC; 1d6 piercing

### Summoned Guardian

HP 24 · AC 9 · INT +0 · CON +1 · DEX +0 · PER +0 · CHA +0

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Strike** (action): 2d6 +2 vs AC; 2d6 piercing

### Old Man

HP 24 · AC 7 · INT +1 · CON +1 · DEX +1 · PER +0 · CHA +1

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Spellcasting** (action): Lightning Beam (see spells)

### Wolf

HP 52 · AC 9 · INT +2 · CON +2 · DEX +2 · PER +0 · CHA +2

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Spellcasting** (action): Fire Beam (see spells)

### Leader

HP 60 · AC 10 · INT +4 · CON +4 · DEX +4 · PER +0 · CHA +4

A reusable encounter character. Place this figure where the adventure needs them; no individual involvement in the merchant’s recorded visit is established.

- **Spellcasting** (action): Hold Monster (see spells)


## Traps

### Poison Needle Lock

**Trigger:** Opening a trapped lock without disarming it. **Notice:** intelligence DC 8. **Disable:** intelligence DC 9. **Save:** constitution DC 8. **Damage:** 1d6 poison. On a failed save, the target is poisoned until the end of its next turn.

### Falling Stones

**Trigger:** Crossing a cracked archway. **Notice:** intelligence DC 10. **Disable:** dexterity DC 10. **Save:** dexterity DC 10. **Damage:** 2d6 bludgeoning. On a successful save, take half damage; the route becomes blocked.

### Fire Rune

**Trigger:** Touching or crossing the marked threshold. **Notice:** intelligence DC 10. **Disable:** intelligence DC 12. **Save:** dexterity DC 10. **Damage:** 3d6 fire. The rune flashes and burns creatures in a 10 ft area; half damage on a successful save.

### Weighted Net Snare

**Trigger:** Stepping on a concealed pressure plate. **Notice:** intelligence DC 8. **Disable:** dexterity DC 8. **Save:** dexterity DC 9. **Damage:** 0 none. The target is restrained until it uses an action and succeeds on a CON or DEX DC 9 check.

### Archive Alarm Seal

**Trigger:** Opening the scroll case incorrectly. **Notice:** intelligence DC 10. **Disable:** intelligence DC 10. **Save:** none DC 0. **Damage:** 0 none. Raises an alarm and awakens one additional archive guardian.


## Running Okla Deli

Open sandbox; players may trade, explore, negotiate, investigate, fight, steal, hire help, or leave.

The road widens as Okla Deli comes into view. Wagons creak between market stalls. A blacksmith's hammer rings out beyond the crowded square. Two town guards look over the merchant's cargo and exchange wary glances at the well-equipped escorts. Town Hall stands beyond the market, but nobody directs the merchant toward it.

- **Market Square:** Bargaining, a counterfeit-goods accusation, a pickpocket, or an unusual bulk buyer.
- **Town Hall:** Administrative business and a noticeboard. The only location that reveals Edric's volunteer request.
- **Copper Lantern Tavern:** Gossip, gambling, a mercenary duel, a suspicious traveler, or cellar noise.
- **Iron Hearth Smithy:** Armor repairs, weapon prices, or a missing iron shipment.
- **Town Library:** Maps, local history, rare books, and research.
- **Town Gate:** Entry tolls, guard inspections, and the opening location of the merchant session.

### The Forgotten Scroll

At Town Hall, Edric seeks a volunteer escort for an expedition to retrieve an ancient scroll from an abandoned underground archive half a day outside town.

Reward: 100 GP plus up to 25 GP expenses; 140 GP after a challenging INT negotiation check, DC 10.

- **Meeting:** Let the merchant question Edric, negotiate, inspect maps, and decide whether to accompany him.
- **Road:** The journey takes half a day. Optionally roll a travel encounter.
- **Entrance:** A collapsed doorway blocks the way. INT DC 8 finds a hidden side passage.
- **Guardian Room:** Two archive guardians are present. INT DC 10 finds a safe authorization phrase and avoids combat.
- **Scroll Case:** INT DC 10 opens the case safely. Failure triggers an alarm and awakens one additional guardian; retry after dealing with the alarm.
- **Return:** Edric places the scroll in the library, pays the reward, and offers access to selected records.

Several passages in the scroll remain untranslated. Their significance can be established later; do not force a connection to the Travellers of the Dark.

### Random encounters

Roll 2d6.

- **2:** Suspicious travelers observe the merchant's wagon; a planned theft may be underway.
- **3:** A rare-item seller offers an uncertain old ring for 40 GP.
- **4:** Guard inspection: questions about weapons and explosive cargo.
- **5:** Disputed cargo: two traders demand a neutral judgment.
- **6:** A street performer draws a crowd while someone manipulates wagers.
- **7:** Quiet business; ordinary trade proceeds.
- **8:** A wagon accident blocks the road and cargo spills.
- **9:** A tavern argument escalates unless someone intervenes.
- **10:** A mercenary challenges an escort to a nonlethal duel for 20 GP.
- **11:** A missing child was last seen near the outskirts.
- **12:** A pickpocket attempts to steal 2d6 GP; INT DC 9 notices.

### Side quests

- **Missing iron shipment (45 GP):** The driver sold it to settle a debt.
- **Counterfeit coins (30 GP):** A rival framed the accused trader.
- **Roadside bandits (60 GP):** Desperate deserters might negotiate.
- **Locked tavern cellar (25 GP and lodging):** A tunnel may conceal smugglers or old storage.
- **Duelist (20–50 GP wager):** Use the bandit leader stat block; duel is nonlethal.
- **Collector's map (35 GP):** The seller is reluctant and wants a favor.

### Trading and law

INT DC 8 improves the price by 10%.
INT DC 12 improves the price by 20%.
Failing by 4 or more worsens the price by 10%, or the buyer leaves.
The Merchant's Experienced Trader bonus applies.
Buyers have limited cash; large stockpiles may require multiple days or new markets.

Local patrols attempt an arrest. A sergeant organizes reinforcements. Archers use cover. The mage intervenes if necessary. Officials may seek external help. Guards may retreat or negotiate rather than fight to the death.

NPCs pursue their goals when ignored.
Keep a calendar of shop hours, departures, and guard shifts.
The player is not automatically a hero.
Let trading, influence, debts, relationships, and consequences matter as much as combat.
A quiet departure, lucrative contract, unexpected feud, or scroll expedition are all valid outcomes.

## Setting and campaign context

### North Kingdom

King Tharok Ironfang, Legendary Barbarian. A rugged, icy expanse of mountains, frozen tundras, and pine forests. Its people value strength, honor, and survival. Tharok wields a greataxe said to have cleaved a glacier; the North is home to barbarians, berserkers, and warriors who test themselves against harsh elements and monstrous beasts. Festivals feature feats of strength and bonfires.

### South Kingdom

King Valthar the Shadowpact, Legendary Warlock. Scorched deserts, oases, and ruins whispering of forgotten pacts. Valthar bends shadows and summons fiends while Lyssera's healing miracles and radiant spells balance his darkness. Mystics, sorcerers, and seekers of forbidden knowledge trade in arcane relics among temples and arcane towers.

### West Kingdom

King Elyndor Swiftarrow, Legendary Ranger. Vast plains, rolling hills, and ancient woodlands. Explorers, hunters, and druids live with nature and defend their borders through guerrilla tactics. Port Westward is sometimes visited by undead skeletons swimming from Earn Island, where a mysterious TrueDark infestation has created many undead creatures.

### East Kingdom

King Auren Lightsworn, Legendary Paladin. Golden fields, gleaming cities, and cathedrals devoted to justice and honor. Auren is a paragon whose divine smites have felled demons and tyrants; Meridia's prayers mend the broken and banish evil. Knights, paladins, and clerics uphold chivalric codes through tournaments, pilgrimages, and sacred libraries.

**Dragon Kingdom:** Home to the dragons and Dragon Lords.

**Light Square:** A plane approximately the size of the Quadrathian Plane and Dark Square. It is home to the TrueLights, effectively immortal beings who source TrueLight energies and protect the Mortal Plane. They possess legendary light armor and weapons and can cast many spells without incantation. Quadrathian clerics draw on TrueLight and may communicate with them.

**Dark Square:** A plane approximately the size of Light Square and the Quadrathian Plane. It is not below Quadrath; it is a greater extension containing it. When Light Square cast its shadow across the Dark Square, the shadowed portion became Quadrath. TrueDark reaches far beyond the known Mortal Plane.

**Bondry Mountains:** Mountains surrounding the four kingdoms, home to many varieties of Giants and some rogue dragons outside the Dragon Kingdom.

### Travellers of the Dark

The Old Man looks like he knows everything but does not. The Wolf looks like a monster but is a scholar. The Leader knows far too much and refuses to explain it.

**old-man:** Thoughtful, composed, and genuinely intelligent, but mistaken for a magical expert because of age and manner.

**wolf:** Combines extraordinary strength and agility with genuine scholarship. Instinct and intellect are not opposites.

**leader:** Mastered nearly every form of magic to roughly Master level but lacks Apex magic. An ancient curse gave him knowledge at a cost, including the ailment responsible for his eyesight. His relationship with TrueDark is deliberately unclear.

### The Journey to the Sword of Gleam

The Leader, Wolf, and Old Man travelled from the western woodlands toward the Dark Square beyond the Bondry Mountains to find a trail to the enchanted divine Sword of Gleam, supposedly left by old King Alof.

A Legendary Sorcerer created a storm to capture the trio after they tried to steal an artifact near a West Kingdom city. The city's guild escalated the matter to the Sorcerer's Guild because TrueDark connections were suspected. The Leader's mana shielded the trio, but a counter-spell disturbed the storm and caused memory loss.

Seeing one another identifies a fellow cult member. Conversation restores who they are but not their destination. A special library scroll casts Psychic Heal; it requires a sacrifice and the members must be within one meter of the casting point.


## Session continuity

### Merchant's Visit (completed)

**Arrival at the town gate:** The merchant and two elite guards arrive. Two town guards demand 2 GP entry fee. The merchant refuses and fails an intimidation check. The guards draw spears; one is seriously injured and the other lets the party pass.

**Town hub and library:** The library is closed. The merchant sees the town mage's volunteer notice but ignores it and goes to market.

**Market confrontation:** Three guards demand a 10 GP fine and threaten arrest. The merchant refuses; ten guards and the Guard Sergeant join the combat.

**Battle and arrest:** Five guards die. The sergeant, below half HP, offers surrender and 100 GP bail. The merchant refuses and is killed by the sergeant. The two elite guards surrender as reinforcements and archers arrive.

**Aftermath:** Residents say the merchant died for a meagre 2 GP because of ego. The sergeant and injured guards receive treatment. The Guard Captain praises the sergeant and hints at a reward from the mayor.

### Visit to Jungle (ongoing)

### Teacher's Quest (ongoing)
