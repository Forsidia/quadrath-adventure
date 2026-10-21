# Quadrath Base Content

The open rules, character model, starter characters, magic reference, and setting foundation for Quadrath.

Version: `0.1.0`

## Core Rules

_Document id: `rules.core` · type: `rules`_

## Resolution
- **Die:** d6
- **Check:** Roll 1d6 and add the relevant modifier. Meet or exceed the task difficulty to succeed.
### Difficulty Guidance
- **Routine:** 3
- **Challenging:** 4
- **Hard:** 5
- **Extreme:** 6
- **Contested:** Each side rolls 1d6 plus the relevant modifier; the higher total wins. Reroll ties if the table needs a decisive result.
## Character Progression
- **Level Range:** 1, 20
### Tiers
#### novice
- **Levels:** 1, 5
- **Description:** Starting adventurers learning the basics.
#### adept
- **Levels:** 6, 10
- **Description:** Skilled practitioners beginning to make a name for themselves.
#### master
- **Levels:** 11, 15
- **Description:** Renowned heroes capable of remarkable feats.
#### legendary
- **Levels:** 16, 20
- **Description:** Living legends whose deeds shape Quadrath.
## Combat
- **Initiative:** Each participant rolls 1d6 plus dexterity; highest acts first.
- **Attack:** Roll 1d6 plus the modifier that best represents the attack. Meet or exceed the target's AC to hit.
- **Damage:** The attack, weapon, spell, or effect defines its damage. The base package does not prescribe a universal damage table yet.
- **Hp:** At 0 HP, a character is incapacitated until the table's recovery rules or an effect restores them. Detailed recovery is an extension point.
- **Extension Points:** damage_and_condition catalog, equipment catalog, recovery and death rules, class, role, or talent progression, game-master guidance
The smallest playable resolution layer for Quadrath.

## Player Character Model

_Document id: `rules.character` · type: `rules`_

## Fields
### hp
- **Kind:** resource
- **Value Type:** integer
- **Required:** True
- **Description:** Current hit points.
### ac
- **Kind:** defense
- **Value Type:** integer
- **Required:** True
- **Description:** Armor class; attacks must meet or exceed it.
### intelligence
- **Kind:** modifier
- **Value Type:** integer
- **Required:** True
- **Description:** Reasoning, memory, study, and technical understanding.
### constitution
- **Kind:** modifier
- **Value Type:** integer
- **Required:** True
- **Description:** Endurance, resilience, and physical grit.
### dexterity
- **Kind:** modifier
- **Value Type:** integer
- **Required:** True
- **Description:** Agility, balance, reflexes, and initiative.
### persuasion
- **Kind:** modifier
- **Value Type:** integer
- **Required:** True
- **Description:** Convincing, negotiating, and leading through words.
### charisma
- **Kind:** modifier
- **Value Type:** integer
- **Required:** True
- **Description:** Presence, confidence, and force of personality.
- **Notes:** Modifiers are the recorded values; base content does not require hidden ability scores., Character-specific bonuses may be represented as effects or traits rather than changing the sheet fields., The canonical key is intelligence.
The stable player-sheet fields used by Quadrath base content.

## The Merchant

_Document id: `character.sample.merchant` · type: `character`_

- **Role:** merchant
- **Status:** sample-character
- **Description:** A practical trader who knows routes, prices, and how to keep a negotiation moving.
- **Level:** 1
- **Tier:** novice
## Sheet
- **Hp:** 8
- **Ac:** 10
### Modifiers
- **Intelligence:** 2
- **Constitution:** 0
- **Dexterity:** 1
- **Persuasion:** 2
- **Charisma:** 1
- **Traits:** Market sense, Route memory, Measured bargaining
- **Equipment:** Ledger, Traveling scale, Trade goods, Practical clothing
- **Hooks:** A shipment has vanished between kingdoms., A rival merchant is selling goods no one remembers importing.
## The Teacher

_Document id: `character.sample.teacher` · type: `character`_

- **Role:** teacher
- **Status:** sample-character
- **Description:** A patient instructor whose lessons turn confusion into a plan of action.
- **Level:** 1
- **Tier:** novice
## Sheet
- **Hp:** 7
- **Ac:** 10
### Modifiers
- **Intelligence:** 2
- **Constitution:** 0
- **Dexterity:** 0
- **Persuasion:** 1
- **Charisma:** 2
- **Traits:** Clear explanation, Patient listener, Improvised lesson
- **Equipment:** Lesson book, Chalk, Annotated map, Walking staff
- **Hooks:** A student has copied a dangerous symbol into their notebook., The local school is built over a sealed ruin.
## The Farmer

_Document id: `character.sample.farmer` · type: `character`_

- **Role:** farmer
- **Status:** sample-character
- **Description:** A grounded survivor who understands weather, land, tools, and the cost of a bad season.
- **Level:** 1
- **Tier:** novice
## Sheet
- **Hp:** 10
- **Ac:** 11
### Modifiers
- **Intelligence:** 0
- **Constitution:** 2
- **Dexterity:** 1
- **Persuasion:** 0
- **Charisma:** 1
- **Traits:** Weather sense, Field endurance, Practical repair
- **Equipment:** Hand tool, Seed pouch, Weathered cloak, Rations
- **Hooks:** The crops are growing in a perfect ring around an old stone., Something is taking livestock without leaving tracks.
## Magic System Reference

_Document id: `magic.system` · type: `magic`_

## Elements
### fire
- **Description:** Searing flames that burn and destroy.
### ice
- **Description:** Freezing cold that slows and shatters.
### lightning
- **Description:** Crackling energy that strikes with speed and power.
### truelight
- **Description:** Radiant energy with healing properties and special potency against undead and certain monstrous foes.
### truedark
- **Description:** Shadowy, corrosive energy tied to secrecy and decay.
## Structures
### touch
- **Description:** Magic channeled through physical contact.
### strike
- **Description:** One or more precise projectile attacks.
### storm
- **Description:** An area effect tempest of the chosen element.
### beam
- **Description:** A sustained stream of energy requiring focus.
### shield
- **Description:** A barrier that deflects or absorbs attacks.
## Special Types
### draconic
- **Description:** Dragon-soul energy that amplifies a spell; usually requires a pact or ritual tied to the Dragon Kingdom.
### apex
- **Description:** Legendary magic that can alter battlefields or defy natural laws.
- **Pure Special Examples:** turn-undead, dispel-magic, mana-drain, health-drain, banish-creature, summon, dominate-creature, resurrection, arcane-gate, hold-monster, true-sight, mass-suggestion, planar-binding
- **Design Note:** This document is a reference vocabulary. Precise spell costs, damage, cooldowns, and casting procedures belong in future spell entries or a game-master expansion.
Open reference data for Quadrath's elemental and spell structures.

## The Four Kingdoms of Quadrath

_Document id: `lore.four-kingdoms` · type: `lore`_

## Kingdoms
### North Kingdom
- **Theme:** ice, mountains, survival, and warrior culture
- **Ruler Title:** Legendary Barbarian
### South Kingdom
- **Theme:** desert, oases, arcane relics, and forbidden pacts
- **Ruler Title:** Legendary Warlock
### West Kingdom
- **Theme:** plains, forests, exploration, and the wild
- **Ruler Title:** Legendary Ranger
### East Kingdom
- **Theme:** golden fields, cities, justice, and sacred lore
- **Ruler Title:** Legendary Paladin
- **Related Places:** Bondry Mountains, Dragon Kingdom, Light Square, Dark Square, Port Westward, Earn Island
- **Design Note:** Names, detailed histories, factions, and adventures can be added as separate documents without changing this stable kingdom vocabulary.
A compact setting foundation for the four-sided land.

## East Kingdom

_Document id: `source.01-world-kingdoms-east-kingdom` · type: `source-document`_

# East Kingdom

- Ruler: King Auren Lightsworn, the Legendary Paladin

- Archmage: High Cleric Meridia, the Legendary Cleric

- Description: The East Kingdom is a realm of golden fields, gleaming cities, and towering cathedrals dedicated to justice and honor. King Auren Lightsworn, clad in resplendent armor that shines like the sun, is a paragon of virtue and a legendary paladin whose divine smites have felled demons and tyrants alike. Beside him stands High Cleric Meridia, a serene and wise figure whose prayers can mend the broken and banish evil. The East is a bastion of order, populated by knights, paladins, and clerics who uphold chivalric codes. Grand tournaments and holy pilgrimages define its culture, while its libraries hold tomes of sacred lore. The kingdom’s borders are fortified against threats, both mundane and supernatural.

## The Four Kingdoms of Quadrath

_Document id: `source.01-world-kingdoms-kingdoms-of-quadrath` · type: `source-document`_

# The Four Kingdoms of Quadrath

The kings/queens here need not be named exactly as below during gameplay because the character names are not that important because most are random encounters. But the classes do remain same for the king/queen of each kingdom (and also for important characters) for lore consistency at a high level.

- [[North Kingdom]]
- [[South Kingdom]]
- [[West Kingdom]]
- [[East Kingdom]]

## North Kingdom

_Document id: `source.01-world-kingdoms-north-kingdom` · type: `source-document`_

# North Kingdom

- Ruler: King Tharok Ironfang, the Legendary Barbarian

- Description: The North Kingdom is a rugged, icy expanse of towering mountains, frozen tundras, and dense pine forests. Its people are hardy and fiercely independent, valuing strength, honor, and survival above all. King Tharok Ironfang, a towering figure clad in furs and wielding a greataxe said to have cleaved a glacier in two, rules with a primal charisma. His legendary rage is whispered to summon storms, and his battle cries echo through the peaks. The North is home to barbarian tribes, berserkers, and warriors who test their mettle against the harsh elements and monstrous beasts that roam the wilds. Festivals here involve feats of strength and endurance, often ending in raucous feasts around roaring bonfires.

## South Kingdom

_Document id: `source.01-world-kingdoms-south-kingdom` · type: `source-document`_

# South Kingdom

- Ruler: King Valthar the Shadowpact, the Legendary Warlock

- Archmage: High Cleric Lyssera, the Legendary Cleric

- Description: The South Kingdom is a land of scorched deserts, shimmering oases, and ancient ruins whispering of forgotten pacts. King Valthar, a gaunt figure with eyes that glow like embers, rules through cunning and the dark power of his otherworldly patron. His legendary warlock abilities allow him to bend shadows and summon fiendish allies, striking fear into his enemies. At his side is High Cleric Lyssera, a beacon of divine light whose healing miracles and radiant spells counterbalance Valthar’s darkness. The South is a land of mystics, sorcerers, and those who seek forbidden knowledge, with sprawling markets trading in arcane relics and exotic goods. Temples and arcane towers dot the landscape, drawing adventurers seeking power or redemption.

## West Kingdom

_Document id: `source.01-world-kingdoms-west-kingdom` · type: `source-document`_

# West Kingdom

- Ruler: King Elyndor Swiftarrow, the Legendary Ranger

- Description: The West Kingdom stretches across vast plains, rolling hills, and ancient woodlands teeming with life. King Elyndor, a lithe and weathered figure with a bow that never misses its mark, is a master of the wilds. His legendary ranger skills let him track prey across continents and commune with the beasts of the land. The people of the West are explorers, hunters, and druids who live in harmony with nature, though they fiercely defend their borders with guerrilla tactics. Villages are built into treetops or carved into cliffs, and archery contests and beast-taming rituals are central to their culture. Elyndor’s bond with a massive silver wolf companion is the stuff of tavern tales.

- The west kingdom also has a port called Port Westward which is sometimes visited by undead skeletons swimming over from the nearby Earn Island which has fallen to a mysterious TrueDark infestation causing various sorts of undead creatures to occupy it.

## Kingdoms beyond Quadrath

_Document id: `source.01-world-planes-kingdoms-beyond-quadrath` · type: `source-document`_

# Kingdoms beyond Quadrath

## Dragon Kingdom

Home to the dragons and Dragon Lords.

## Light Square

The Light Square is a plane approximately the same size as the Quadrathian Plane (Mortal Plane) and the Dark Square. It is home to the TrueLights, powerful beings who are the source of TrueLight magical energies in the Quadrathian universe. They are considered effectively immortal and on-par with, or beyond, the legendary creatures of Quadrath. TrueLights maintain the balance of TrueLight energies and protect the Mortal Plane from threats beyond it.

They possess rare legendary armor and weapons of light enchantment for defense and offense. They can also cast many spells without incantation, something no mortal can do with the exception of some legendary wizards and sorcerers. Clerics of Quadrath draw upon TrueLight energies and may communicate with the TrueLights from the Mortal Plane.

## Dark Square

The Dark Square is a plane approximately the same size as the Light Square and the Quadrathian Plane. It is not below the Quadrathian Plane; rather, it is a greater extension that contains it. When the Light Square cast its shadow across the Dark Square, the shadowed portion became Quadrath—the Mortal Plane. The Dark Square still extends beyond Quadrath, where the TrueDark reaches far beyond the lands known to its inhabitants.

## The Bondry Mountains

The four kingdoms are surrounded by the **Bondry Mountains** which are home to many varieties of Giants and some rogue dragons (who are not part of the Dragon Kingdom)

## Magic System

_Document id: `source.02-magic-magic-system` · type: `source-document`_

# Magic System

The power and spectacle of magic in Quadrath scale with the caster’s skill level. Novices (Levels 1–5) might conjure faint sparks, while Legendary casters (Levels 15–20) reshape battlefields. Spells are categorized by elemental, structural, special, and pure-special types. This is a general lore reference; D6 damage and attack handling belong in the DM guide.

## Elemental Types

Each normal spell draws from one of these primal forces:

| Element | Description |
|---|---|
| Fire | Searing flames that burn and destroy. |
| Ice | Freezing cold that slows and shatters. |
| Lightning | Crackling energy that strikes with speed and power. |
| TrueLight | Radiant light with healing properties; deals extra damage to undead and certain monstrous foes, such as fiends and aberrations. |
| TrueDark | Shadowy, corrosive energy tied to secrecy and decay. |

## Structural Types

The form a spell takes defines its delivery:

| Structure | Description |
|---|---|
| Touch | Requires physical contact, channeling magic through the caster’s hands. |
| Strike | Launches one or more arrow-like projectiles for precise, targeted attacks. |
| Storm | Unleashes an area-of-effect tempest of the chosen element. |
| Beam | Projects a continuous stream of energy, requiring focus to sustain. |
| Shield | Forms a protective barrier, deflecting or absorbing attacks. |

## Special Types (Hybrid-Special Spells)

These enhance normal spells, blending with elemental and structural types:

| Special type | Description |
|---|---|
| Draconic | Infuses a spell with dragon soul energy, amplifying its potency and adding a draconic flair. Requires a pact or ritual tied to the Dragon Kingdom. |
| Apex | Reserved for Legendary casters (Levels 15–20), these spells push magic to its pinnacle, with effects so grand they alter the battlefield or defy natural laws. |

For example, a Fire Beam may roar like a dragon’s breath when enhanced with Draconic magic, while an Apex Fire Storm might summon a meteor shower.

## Pure-Special Spells

These stand-alone spells lack elemental or structural types and focus on unique, powerful effects. Many draw from D&D 5e roots, tailored for Quadrath’s LARP flair:

| Spell | Effect |
|---|---|
| Turn Undead | Repels or destroys undead with a burst of TrueLight, scaling with the caster’s level. |
| Dispel Magic | Nullifies active spells or enchantments, breaking magical barriers or curses. |
| Mass halt | Halts all movement for creatures below the caster’s level for 1 hour. Duration varies with caster skill; Legendary casters can halt people for days. |
| Mana Drain / Greater Mana Drain | Siphons magical energy from a target, weakening its casting ability while bolstering the caster’s reserves. |
| Health Drain / Greater Health Drain | Leeches vitality from a foe and heals the caster as it wounds the target. |
| Banish Creature | Sends extraplanar beings, such as fiends or elementals, back to their home plane, with a chance to resist based on the target’s power. |
| Summon / Greater Summon | Calls forth powerful entities—dragons, celestial guardians, or fiendish beasts—depending on the caster’s alignment and preparation. |
| Dominate Creature | Bends a creature’s mind to the caster’s will, forcing obedience. Duration and resistance depend on the caster’s skill. |
| Resurrection | Restores life to a fallen ally, requiring immense focus and rare components. It is limited to higher-level casters due to its divine cost. |
| Arcane Gate | Opens a portal between two points within sight, allowing instant travel or tactical repositioning. |
| Hold Monster | Paralyzes a creature with magical bonds unless it breaks free through sheer will or strength. It can scale to multiple targets with caster level. |
| True Sight | Lets the caster or an ally see through illusions, invisibility, and shape-shifting for a limited time. |
| Mass Suggestion | Influences multiple minds with a compelling command. Legendary casters can sway entire armies. |
| Planar Binding | Forces a summoned or extraplanar creature into servitude for a set duration, requiring a contest of wills. It is favored by South Kingdom warlocks. |

## Lore Integration

This magic system reflects Quadrath’s history and culture:

| Tradition | Lore integration |
|---|---|
| Draconic spells | Trace back to the [[03 - History/War of the Dragon's Wrath|War of the Dragon’s Wrath]], when Dragon Lords taught select mortals their secrets as part of the truce. The Central Guild guards these rituals jealously. |
| Apex spells | Emerged from Grandmaster Elytheris’s efforts to counter dragon assaults, with Zoryn refining them into the modern era. Only Legendary heroes like the four kings wield them. |
| Pure-special spells | Resurrection and True Sight are tied to the East and South’s clerical traditions, while Planar Binding and Dominate Creature echo the South’s darker pacts. The North favors raw elemental magic and shuns complex specials. |

## The War of the Dragon’s Wrath

_Document id: `source.03-history-war-of-the-dragon-s-wrath` · type: `source-document`_

# The War of the Dragon’s Wrath

Timeline: Approximately 200 years before the present day (April 06, 2025, in Quadrath’s reckoning).

Cause: A catastrophic misunderstanding ignited by greed, pride, and a broken pact.

## Prelude to Conflict

The North Kingdom, under the rule of King Hrothgar Skullsplitter (a legendary barbarian ancestor of Tharok Ironfang), sought to harness the power of dragons to secure dominance over Quadrath’s harsh winters. Hrothgar’s shamans uncovered an ancient ritual to summon a Dragon Lord, believing they could bind it to their will. Meanwhile, the South Kingdom, led by Queen Sylvara the Soulbound (a legendary warlock and predecessor to Valthar the Shadowpact), coveted the dragons’ arcane secrets, hoping to siphon their essence for her patron’s dark designs. High Cleric Damorin (Sylvara’s legendary cleric advisor) warned against this hubris, but his pleas were ignored.

The two kingdoms, unbeknownst to each other, performed their rituals simultaneously, targeting the same Dragon Lord: Kravethrax the Emberheart, a towering red-scaled Dragonborn whose fiery breath had forged the volcanic peaks of the Dragon Kingdom. The dual summoning tore Kravethrax from his lair, enraged and unbound, and he retaliated by rallying the Dragon Lords and their draconic kin for war.

## The Battle Unfolds

- Northern Front: Kravethrax descended upon the North Kingdom with a host of chromatic dragons—reds, blacks, and blues—unleashing fire, acid, and lightning upon the tundra. Hrothgar led his barbarian hordes in a brutal counterattack, wielding runed axes and war chants to bolster their resilience. The clash was primal: dragonfire melted glaciers into raging floods, while North warriors scaled the beasts with grappling hooks fashioned from mammoth tusks. Hrothgar slew a black dragon single-handedly, earning the epithet “Drakesbane,” but the cost was steep—entire tribes were reduced to ash, and the North’s pine forests burned for weeks.
- Southern Front: In the South, Sylvara and her warlocks met the dragons with shadow magic and summoned fiends, creating a surreal battlefield of swirling darkness and molten sand. Kravethrax’s metallic dragons—bronze and copper—joined the fray, their lightning and acid breaths shattering arcane towers. High Cleric Damorin turned the tide briefly with a radiant barrier that shielded key cities, but Sylvara’s reckless pact with her patron backfired, summoning a fiendish entity that clashed with the dragons, escalating the chaos. The deserts became scarred with glassy craters, still visible today as grim reminders.
- The Turning Point: The Central Guild, led by Grandmaster Elytheris (a legendary wizard of that era), intervened to prevent Quadrath’s annihilation. Elytheris brokered a tenuous truce by offering Kravethrax a trove of arcane relics and a vow that no kingdom would summon the Dragon Lords again without consent. The East and West Kingdoms, though uninvolved, sent emissaries to reinforce the peace, fearing the dragons’ wrath might spread.

## Aftermath

- North Kingdom: The North emerged battered but proud, their warrior culture forever marked by tales of dragon-slaying. Tharok Ironfang keeps a black dragon’s skull in his hall as a trophy and a warning. Relations with the Dragon Kingdom remain frosty, though a grudging respect lingers.
- South Kingdom: The South suffered greater losses—Sylvara’s death in the fiendish backlash left the kingdom fractured until Valthar rose to power. The current warlock king mistrusts dragons but secretly studies their magic, while High Cleric Lyssera seeks to heal old wounds with diplomacy.
- Dragon Kingdom: The Dragon Lords withdrew to isolation, deeming the four kingdoms unworthy of their trust. Kravethrax’s descendants still rule, and the summoning ritual’s scars fuel their disdain for outsiders. Dragons now only engage Quadrath during dire wars or when called by worthy champions.
- Central Guild: The Guild’s role as mediators cemented its neutrality, though some whisper Zoryn keeps dragon lore hidden in the citadel’s deepest vaults, preparing for future conflicts.

## Legacy in Quadrath

- Artifacts: Relics from the war—like the Drakebane Axe (a North-forged weapon) or Sylvara’s Shattered Grimoire (a South spellbook)—are prized by adventurers and could spark LARP quests.
- Cultural Impact: North bards sing of Hrothgar’s valor, while South mystics curse Sylvara’s folly. The Dragon Kingdom’s borders are taboo, marked by warning totems.
- Current Tensions: Rumors swirl that a young dragon has been spotted near the North, hinting at unrest—or an opportunity for heroes to mend ancient rifts.

## Travellers of the Dark

_Document id: `source.04-factions-travellers-of-the-dark` · type: `source-document`_

# Travellers of the Dark

These are compact working profiles rather than finished canon, leaving room for discovery during the worldbuilding process.

## Origin

The Travellers of the Dark originate somewhere in the western woodlands of the [[West Kingdom]], within reach of Port Westward. Their homeland sits in a region shaped by the West’s explorers, hunters and druids, while the nearby Earn Island and its mysterious TrueDark infestation keep the dangers of TrueDark close to the kingdom’s borders.

The exact settlement they came from is unknown. Their origin in the West Kingdom helps explain their familiarity with wilderness travel, old routes and the threats that arrive from beyond the known lands.

## The Old Man

**Role:** Apparent sage; actual novice
**Visual:** Elderly face, enormous white beard, prescription glasses, black hooded robe
**First impression:** Ancient wizard who has probably been with the cult for decades
**Reality:** One of its least experienced members

The Old Man is thoughtful, composed and genuinely intelligent, but people routinely mistake his age and manner for magical expertise. He doesn't necessarily pretend to be more experienced—the assumptions of others do much of that work for him. His magical ability remains around Quadrath's Novice range, where characters are still developing their craft. ([[Character Levels]])

His strongest character theme is wisdom ≠ expertise. He can give excellent advice about people, survival or life while completely misunderstanding an advanced magical phenomenon.

**Worldbuilding questions:** Why did the Leader recruit/transform someone this old? What was he before the cult? Does he resent being a novice? What does he remember from before the eldritch storm?

## The Wolf

**Role:** Scholar / physical powerhouse
**Visual:** Wolf-like head and physiology, prescription glasses, black hooded robe
**First impression:** Cult enforcer or barely controlled beast
**Reality:** Probably the member most likely to have actually read the relevant book

The Wolf combines extraordinary strength and agility with genuine scholarship. His werewolf-like physiology means he's dangerous even when magic is unavailable, but physical power shouldn't become his entire personality. He's observant, well-read and likely the person who notices when the Old Man confidently gets something wrong.

His defining tension is instinct versus intellect, without treating them as opposites. He is capable of carefully discussing some obscure manuscript and then physically tearing through a threat when discussion stops being useful.

**Worldbuilding questions:** Was he wolf-like before joining? What subjects does he study? How powerful is his magic compared with his physical abilities? Does he actually like the Leader? What happened during his transformation?

## The Cult Leader

**Role:** Founder/leader; master magician; central mystery
**Visual:** Featureless human mask—normally black, with white and red variants—prescription glasses, black hooded robe
**First impression:** Almost impossible to read
**Reality:** Still almost impossible to read

The Leader possesses enormous magical breadth, having mastered nearly every form of magic to roughly Master level while lacking Apex magic. In Quadrath, Master corresponds to levels 10–15, while Apex magic is specifically associated with Legendary levels 15–20, so that distinction fits the existing progression. ([[Character Levels]], [[02 - Magic/Magic System|Magic System]])

An ancient curse gave him extraordinary magical knowledge at a cost, including the ailment responsible for his eyesight. The other members subsequently acquired a related condition through becoming cult members. His relationship with TrueDark is deliberately unclear. TrueDark is an actual elemental magical force in Quadrath, associated with corrosive energy, secrecy and decay, rather than merely a synonym for generic evil magic. ([[02 - Magic/Magic System|Magic System]]) His occasional necromancy therefore shouldn't automatically explain what that relationship is.

His defining theme is knowledge at a cost.

**Worldbuilding questions:** What exactly did the curse give and take? Why did he create the cult? Why transform other people? What does each mask signify? What does he know about TrueDark? Does TrueDark know him? And crucially: how much of the eldritch storm did he actually forget?

## The trio's core dynamic

The trio's central dynamic can be summarized as follows:

> The Old Man looks like he knows everything but doesn't. The Wolf looks like a monster but is a scholar. The Leader actually knows far too much and refuses to explain it.

The eldritch storm and shared magical ailment are the two things binding all three together. This gives them a stable character triangle while leaving the cult's purpose, history, morality, curse, transformations and TrueDark connection open for further worldbuilding.

## The Journey to the Sword of Gleam

_Document id: `source.05-stories-the-journey-to-the-sword-of-gleam` · type: `source-document`_

# The Journey to the Sword of Gleam

## The Quest

Originating somewhere in the western woodlands of the West Kingdom, three members of the [[04 - Factions/Travellers of the Dark|Travellers of the Dark]]—the Leader, the Wolf and the Old Man—were trying to go into the [[01 - World/Planes/Kingdoms beyond Quadrath|Dark Square]], beyond the [[01 - World/Planes/Kingdoms beyond Quadrath|Bondry Mountains]], to find a trail that would lead them to an artifact called the **Sword of Gleam**, an enchanted divine sword supposedly left behind by the old King Alof.

## The Eldritch Storm

During the journey, the cult members encountered the eldritch storm and sustained psychic damage. The Leader possibly took less damage, but how much less is not known.

The storm was created by a Legendary Sorcerer protecting the nearby city in the [[01 - World/Kingdoms/West Kingdom|West Kingdom]], where a couple of members of the cult were trying to steal another artifact. The city's main guild was notified, which in turn escalated the matter to the Sorcerer's Guild, as TrueDark connections were suspected.

The aim of the storm was to capture and mentally incapacitate the trio temporarily to ensure their capture. However, the immense mana of the Leader shielded them from taking higher damage, though they still faced memory loss. A likely high-tier spell cast by the Leader as a counter-attack disturbed the storm, and the guild team was unable to find them after the storm cleared.

## Stranded after the storm

After the encounter, they seemed to have forgotten where they were going.

All three of them were in separate but nearby locations, stranded in the small town of Olka Deli. They did not remember each other. The challenge was now to join forces again, resume their quest, possibly gain strength in some way, and recover their memories.

The Leader seemed calm, the Wolf was alert, and the Old Man was highly confused.

## The Trio in Olka Deli

### The Old Man

**Inventory and equipment**

- **Wooden bracelet:** Enchanted. It can cast Lightning Beam with a very short cooldown of 0.5 seconds. The Old Man has forgotten that the bracelet has this ability.
- **Backpack:** Contains a torn map, 3 health potions and 4 mana potions.
  - **Mana potions:** Used for the mana boost ability, causing all spells to be doubly effective.

The Old Man retains knowledge of all spells associated with his class.

### The Wolf

**Inventory and equipment**

- **Wooden bracelet:** Enchanted. It can cast Fire Beam and Fire Slash, with a cooldown of 3 seconds.
- **Ring:** Grants immunity to fire and poison.

The Wolf retains knowledge of all spells associated with his class.

### The Leader

**Inventory and equipment**

- **Weapons and ornaments:** None.
- **Mask:** Enchanted. It allows the Leader to see in total darkness up to 100 meters and grants resistance to psychic damage.

Through the mask, he can use Fear and Hold Monster without cooldown. Due to his temporary partial memory loss, his Master-level spells have a 50% chance of not working until his memory is returned.

## Shared Clan Cloak

All three members wear the magical cloak of the clan.

**Cloak abilities**

- Grants invisibility for up to 15 minutes at a time if needed.
- Grants resistance to divine, lightning, piercing and slashing damage.

## Recognition and Memory

If the members see one another, they are able to recognize that the other person is a member of the same cult. If they talk for a while without distraction, they remember who they are, but not where they were going.

To completely recover their memories, they need to find a special scroll in the nearby library. The scroll allows them to cast the ancient spell Psychic Heal. The spell requires a sacrifice, and the members must be within one meter of the casting point for it to fully heal them.

## Hostiles in Olka Deli

Hostiles are nearby. Town guards, led by the Guard Captain, already suspect the trio because of their black cloaks and have begun moving towards them.

Monsters lurk in the shadows and alleys, including goblin burglars and a few lizard wardens. The lizard wardens are in the town to accompany a delegation that has come to meet the mayor. They patrol near the town hall and can get into quarrels with the city guards if provoked, as they are short-tempered. Each lizard warden carries a spear and a sword.

City archers are also present, mostly hidden while covering important areas.

The city hall contains the library where the ancient scroll is kept.

## Okla Deli TTRPG Sessions

_Document id: `source.06-ttrpg-sessions-okla-deli-ttrpg-sessions` · type: `source-document`_

# Okla Deli TTRPG Sessions

## Session 1: Merchant’s Visit

### Arrival at the town gate

The merchant and two elite guards arrive near the entrance to town.

Two town guards are stationed at the gate. One asks the merchant the reason for the visit and becomes somewhat alert after seeing the two elite guards. He asks the merchant to pay 2 GP to enter.

The merchant refuses, arguing that there should be no entry fee.

The merchant then attempts to intimidate the guards but fails the check. The guards draw their spears.

After the combat, one town guard is seriously injured. The other is frightened and allows the party to pass through.

### The town hub and library

The party reaches the town hub and decides to travel toward the town library, but the library is closed.

The merchant sees a note on the noticeboard stating that the town mage is looking for a volunteer to accompany him on a quest. The merchant ignores the note and continues with the guards toward the market to trade some items.

### The market confrontation

A group of three guards blocks the party’s way and asks whether they caused trouble near the entry gate. The merchant tries to avoid the confrontation, but the guards continue blocking the way and demand 10 GP as a fine for the nuisance. Otherwise, they threaten arrest.

The merchant refuses outright and also refuses to submit to arrest. Angered and annoyed, the guard team calls for more guards. There are now ten town guards present, and the Guard Sergeant joins the combat.

### The battle and arrest

After a brutal battle, five guards are dead. The sergeant is slightly below half HP but still standing. He gives the merchant the option to surrender and be arrested, with bail set at 100 GP.

The merchant continues to refuse. The sergeant is then able to target the merchant directly and kill him with a sword attack.

The two elite guards are taken to the town jail. One is nearly incapacitated; the other still has good HP but is unwilling to continue fighting, especially as more reinforcements arrive and the archers begin taking position. They are made to surrender.

### Aftermath

Bystanders and town residents tell pitying stories about how the merchant died for a meagre 2 GP because of his ego.

The sergeant and the injured town guards are taken to the town medic and begin treatment.

Later, the Guard Captain arrives, praises the sergeant, and says that he may soon be rewarded by the mayor.

---

## Session 2: Visit to Jungle (ongoing)


---


## Session 3: Teacher's Quest (ongoing)

---

## Quadrath D6 TTRPG DM Guide

_Document id: `source.06-ttrpg-sessions-quadrath-d6-ttrpg-dm-guide` · type: `source-document`_

# Quadrath D6 TTRPG DM Guide

## General DM handbook

**A reusable guide for running Quadrath with the compact D6 rules**
**Style:** fast, flexible, low-complexity play with fixed HP and AC and bonus-based abilities

The rules, NPCs, equipment, and DM procedures in this guide are intended for general Quadrath play. The Okla Deli material later in the guide is an optional example sandbox and can be replaced with any town, faction, or adventure.

## How to use this guide

Use the core rules, weapon reference, and NPC stat blocks for any Quadrath adventure. Treat locations, quests, and NPC motivations as prompts rather than a fixed plot. Players may trade, explore, negotiate, investigate, fight, steal, hire help, or leave; follow their choices and let the world react.

Players may begin with a higher-level or more capable character if the group agrees with the DM. Increase relevant bonuses as needed for that agreed starting point. Quadrath has no required level progression during play; the goal is to keep sessions short, readable, and easy to run.

## At a glance

| Situation | Rule |
|---|---|
| Attack | `2d6 + Attack bonus` vs. Armor Class (AC). Equal to or higher than AC hits. |
| Damage | Roll the listed d6 damage and subtract it from HP. Damage types use familiar 5e terminology. |
| Check or save | `2d6 + relevant bonus` vs. the target difficulty. |
| Critical | A natural 12 on 2d6 always hits; roll twice the listed damage dice. |
| Fumble | A natural 2 always misses. There is no mandatory extra penalty. |
| Turn | Move up to Speed, take one action, and take at most one reaction before the next turn. |

## 1. D6 system: quick rules

### Bonuses, abilities, and checks

This handbook uses bonuses rather than full ability scores. A stat block's `CON +1` or `INT +3` is already the bonus to add to a roll; there is no underlying ability value to calculate.

The core bonuses used in this adventure are:

- **CON:** toughness, physical effort, stamina, and resistance to physical effects.
- **INT:** observation, reasoning, tactics, negotiation, magical understanding, and technical tasks.

Other major 5e-style abilities—such as STR, DEX, WIS, and CHA—may be represented descriptively or assigned a situational bonus when the DM and player agree. They do not need full scores. Perception is normally handled as an INT check in this handbook unless the DM decides another bonus fits the situation.

Roleplay can grant a situational `+1` or `-1`.

### Difficulties

| Difficulty | DC |
|---|---:|
| Easy | 6 |
| Standard | 8 |
| Challenging | 10 |
| Hard | 12 |
| Exceptional | 14 |

A `2d6` result ranges from 2 to 12 before bonuses. For opposed checks, both sides roll `2d6 + the most fitting bonus`; ties favor the defender.

### Armor and cover

AC uses a compact 2d6 scale and is not the same scale as D&D 5e AC. A shield is included where specified.

- Partial cover: `+1 AC`
- Substantial cover: `+2 AC`
- An adjacent ally can block a passage, but cannot prevent all ranged attacks.

### Saving throws

Roll `2d6 + CON` for poison, fire exposure, explosions, and physical endurance. Roll `2d6 + INT` for illusions, magical puzzles, mental effects, or spotting a trap. Each effect specifies its DC and what happens on a success.

### Combat pacing

Rounds are about six seconds.

- **Disengage:** Use an action to move without provoking opportunity attacks.
- **Dodge:** Use an action to give attackers `-2` on attack rolls until your next turn.
- **At 0 HP:** The creature is dead. At 10% HP creature is incapacitated with no direct recovery during combat unless via a spell or potion.

### Rest

A short rest takes about one hour and requires a safe situation. It restores `1d6 HP` to each resting character and recharges short-rest abilities. A long rest restores all HP and daily abilities. Use fewer rests during a tense expedition.

## 2. Common weapons

Weapon damage and attack bonuses are listed here so NPC and player stat blocks only need to name the weapon they use. Attack bonuses are shown by wielder where the guide already defines them; for a new wielder, assign an appropriate bonus.

| Weapon | Attack bonus | Damage | Damage type | Notes |
|---|---|---:|---|---|
| Dagger | Merchant `+1` | `1d6` | Piercing | — |
| Crossbow | Merchant `+1`; Garran `+2`; Veyra `+3` | `1d6` | Piercing | Ranged weapon. |
| Sword | Garran `+3`; Guard sergeant `+2`; Bandit leader `+2` | `2d6` | Slashing | — |
| Blade | Veyra `+3` | `2d6` | Slashing | — |
| Scimitar | Bandit `+1` | `1d6` | Slashing | — |
| Spear | Town guard `+1` | `1d6` | Piercing | — |
| Bow | Town archer `+2` | `1d6` | Piercing | Ranged weapon. |
| Improvised weapon | Civilian `+0` | `1d6` | Bludgeoning | Use whatever object is available. |
| Stone fist | Archive guardian `+2` | `2d6` | Bludgeoning | Natural or constructed attack. |
| Bursting Fist | Guard Captain `+3` | `3d6` | Piercing and bludgeoning | Guard Captain attack. |
| Anti-Magic Sword | Guard Captain `+4` | `4d6` | Slashing | On a hit, negates magical attacks and effects on the target. |
| Kick of Fury | Guard Captain `+4` | `3d6` | Bludgeoning | Guard Captain attack. |

## 3. Magic spells

Use the full [[02 - Magic/Magic System|Quadrath Magic System]] for spell lore, special spells, scaling, and non-combat effects. This section separates combat spell forms from defensive spells for D6 play. These names combine the existing elemental and structural types; they do not add new lore spells.

### Attack spells

| Attack spell form | Effect                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Fire Strike       | Deals `2d6` fire damage to one target.                                                                    |
| Ice Strike        | Deals `2d6` ice damage to one target and may slow or hinder it.                                           |
| Lightning Strike  | Deals `2d6` lightning damage to one target.                                                               |
| TrueLight Strike  | Deals `2d6` radiant damage to one target; especially effective against undead and certain monstrous foes. |
| TrueDark Strike   | Deals `2d6` corrosive shadow damage to one target.                                                        |
| Fire Storm        | Deals `3d6` fire damage in an area.                                                                       |
| Ice Storm         | Deals `3d6` ice damage in an area and may slow or hinder creatures.                                       |
| Lightning Storm   | Deals `3d6` lightning damage in an area.                                                                  |
| Fire Beam         | Deals `2d6` fire damage as a sustained attack requiring focus.                                            |
| Ice Beam          | Deals `2d6` ice damage as a sustained attack requiring focus.                                             |
| Lightning Beam    | Deals `2d6` lightning damage as a sustained attack requiring focus.                                       |
| TrueLight Beam    | Deals `2d6` radiant damage as a sustained attack requiring focus.                                         |
| Dark Beam         | Deals `2d6` corrosive shadow damage as a sustained attack requiring focus.                                |

### Defense spells

| Defense spell | Effect |
|---|---|
| Shield | Forms a protective barrier that deflects or absorbs attacks. |
| Heal | One target regains `2d6 + INT bonus` HP. |
| Mass Heal | All chosen creatures within a 20-ft radius regain `4d6 + INT bonus` HP. |

Resolve attack bonuses with the caster's agreed D6 spell bonus and the normal combat rules. The Magic System file remains the authority for spell lore and full effect.

## 4. Explosives and equipment

| Item         | Stock | Effect                                                                                                                                                                    |
| ------------ | ----: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blast charge |     2 | One action to place or throw within 20 ft. Creatures within 10 ft make a CON DC 9 save. On a failure, take `4d6` fire and thunder damage; on a success, take half damage. |
| Smoke bomb   |     2 | Creates a 15-ft radius of heavy obscurement for 3 rounds. Ranged attacks through smoke are at `-2`; unseen targets may be impossible to select.                           |
| Flash charge |     1 | Creatures within 10 ft make a CON DC 9 save or become blinded until the end of their next turn.                                                                           |

Explosives are conspicuous, limited fantasy items. In crowded streets they risk collateral damage, property destruction, and a serious guard response. A blast charge is intentionally powerful but is not guaranteed to defeat a fully healthy elite guard.

## 5. Optional example sandbox: Okla Deli

### Opening scene

> The road widens as Okla Deli comes into view. Wagons creak between market stalls. A blacksmith's hammer rings out beyond the crowded square. Two town guards look over the merchant's cargo and exchange wary glances at the well-equipped escorts. Town Hall stands beyond the market, but nobody directs the merchant toward it.

Ask: **What do you do?**

The merchant may trade, explore, seek lodging, gamble, negotiate, hire help, steal, investigate, or leave. Do not introduce the scroll quest unless the party visits Town Hall.

### Locations and quick hooks

| Location | What is happening |
|---|---|
| Market Square | Bargaining, a counterfeit-goods accusation, a pickpocket, or an unusual bulk buyer. |
| Town Hall | Administrative business and a noticeboard. This is the **only** location that reveals Edric's volunteer request. |
| Copper Lantern Tavern | Gossip, gambling, a mercenary duel, a suspicious traveler, or cellar noise. |
| Iron Hearth Smithy | Armor repairs, weapon prices, or a missing iron shipment. |
| Town Library | Maps, local history, rare books, and research. |

### The Forgotten Scroll: optional main quest

#### Discovery gate

At Town Hall, the party can find a notice seeking a volunteer escort for a scholarly expedition. Edric wants an ancient scroll retrieved from an abandoned underground archive about half a day outside Okla Deli so it can be preserved in the library.

Edric offers **100 GP plus up to 25 GP in expenses**. A challenging INT negotiation check, DC 10, raises the payment to **140 GP**.

| Scene | DM direction |
|---|---|
| Meeting | Let the merchant question Edric, negotiate, inspect maps, and decide whether to accompany him. |
| Road | The journey takes half a day. Optionally roll a travel encounter. |
| Entrance | A collapsed doorway blocks the way. INT DC 8 finds a hidden side passage. |
| Guardian room | Two archive guardians are present. An INT DC 10 inscription check discovers a safe authorization phrase and avoids combat. |
| Scroll case | INT DC 10 opens the case safely. Failure triggers an alarm and awakens one additional guardian. A retry is possible after dealing with the alarm. |
| Return | Edric places the scroll in the library, pays the reward, and offers access to selected records. |

**Optional mystery:** Several passages in the scroll remain untranslated. Their significance can be established later. Do not force a connection to the Travellers of the Dark.

### Random encounters

Roll `2d6` when entering a busy district, traveling, waiting, or whenever the sandbox needs motion. Middle results are more common; extreme results are rare.

| Roll | Encounter or prompt |
|---:|---|
| 2 | Suspicious travelers observe the merchant's wagon; a planned theft may be underway. |
| 3 | A rare-item seller offers an uncertain old ring for 40 GP. |
| 4 | Guard inspection: questions about weapons and explosive cargo. |
| 5 | Disputed cargo: two traders demand a neutral judgment. |
| 6 | A street performer draws a crowd while someone manipulates wagers. |
| 7 | Quiet business: no incident; ordinary trade proceeds. |
| 8 | A wagon accident blocks the road and cargo spills. |
| 9 | A tavern argument escalates unless someone intervenes. |
| 10 | A mercenary challenges an escort to a nonlethal duel for 20 GP. |
| 11 | A missing child was last seen near the outskirts. |
| 12 | A pickpocket attempts to steal `2d6 GP`; INT DC 9 notices the attempt. |

### Side quests

| Hook | Twist and reward |
|---|---|
| Missing iron shipment | The blacksmith offers 45 GP; the driver sold it to settle a debt. |
| Counterfeit coins | Reward: 30 GP. A rival framed the accused trader. |
| Roadside bandits | Reward: 60 GP. The desperate deserters might negotiate. |
| Locked tavern cellar | Reward: 25 GP and lodging. A tunnel may conceal smugglers or old storage. |
| Duelist | A 20–50 GP wager. Use the bandit leader stat block; the duel is nonlethal. |
| Collector's map | Reward: 35 GP. The seller is reluctant and wants a favor. |

### Trading and law

### Goods and resale

| Goods | Buy | Typical resale |
|---|---:|---:|
| Common cloth bundle | 8 GP | 10–12 GP |
| Spice crate | 15 GP | 18–24 GP |
| Iron tools | 6 GP | 8–10 GP |
| Fine wine crate | 20 GP | 24–30 GP |
| Ornamental dagger | 12 GP | 15–20 GP |
| Rare manuscript | 35 GP | 40–70 GP |

### Trade checks

- INT DC 8 improves the price by 10%.
- INT DC 12 improves the price by 20%.
- Failing by 4 or more worsens the price by 10%, or the buyer leaves.
- The merchant's Experienced Trader bonus applies.
- Buyers have limited cash. Large stockpiles may require multiple days or new markets.

### Escalation

Local patrols attempt an arrest. A sergeant organizes reinforcements. Archers use cover. The mage intervenes if necessary. Officials may seek external help. Guards may retreat or negotiate rather than fight to the death.

## 6. NPCs, stat blocks, and improvisation

### Combat stat blocks

All entries under **Bonuses** are bonuses to add directly to the relevant roll. HP and AC remain fixed values. These are reusable Quadrath NPC reference entries, not level-based character sheets.

| Character | HP | AC | Bonuses | Weapons |
|---|---:|---:|---|---|
| Merchant | 26 | 8 | CON `+1`; INT `+3` | Dagger; Crossbow |
| Garran, elite guard | 58 | 10 | CON `+3`; INT `+1` | Sword; Crossbow |
| Veyra, elite guard | 52 | 9 | CON `+2`; INT `+2` | Blade; Crossbow |
| Civilian | 5 | 6 | CON `+0`; INT `+0` | Improvised weapon |
| Bandit | 12 | 7 | CON `+1`; INT `+0` | Scimitar |
| Town guard | 16 | 8 | CON `+1`; INT `+0` | Spear |
| Town archer | 13 | 7 | CON `+0`; INT `+1` | Bow |
| Guard sergeant | 32 | 9 | CON `+2`; INT `+1` | Sword |
| Bandit leader | 36 | 8 | CON `+2`; INT `+1` | Sword |
| Town mage Edric | 38 | 7 (`9` warded) | CON `+1`; INT `+4` | Magic System spells |
| Archive guardian | 24 | 9 | CON `+2`; INT `+0` | Stone fist |
| Guard Captain, half-elf barbarian | 60 | 12 | CON `+3`; INT `+2` | Bursting Fist; Anti-Magic Sword; Kick of Fury |

### Party and foe abilities

- **Merchant — Experienced Trader:** `+2` to INT checks involving appraisal or commerce.
- **Merchant — Silver Tongue** *(once per short rest):* Reroll a failed negotiation check.
- **Merchant — Command Escort:** The merchant can communicate a tactical order freely; the guard still acts on the guard's own turn.
- **Merchant — Emergency Dodge** *(once per short rest):* Gain `+2 AC` against one attack.
- **Elite guards — Two attacks:** An elite guard makes two attacks with their main weapon when taking the Attack action.
- **Elite guards — Interpose** *(reaction):* An adjacent guard gives an attack against the merchant `-2` to hit.
- **Elite guards — Second Wind** *(once per short rest):* Heal `2d6 HP`.
- **Town guard — Hold the Line:** `+1 AC` while adjacent to another shield-bearing guard.
- **Town archer — Aimed Shot:** `+1 to hit` if stationary.
- **Guard sergeant:** Makes two sword attacks. Once per fight, grants nearby guards `+1 to hit` for one round.
- **Bandit leader:** Makes two sword attacks. Once per fight, lets one ally reposition without triggering an opportunity attack.
- **Town mage — Ward:** One action increases AC to 9 for 3 rounds.
- **Town mage — Magic System spells:** Use the established [[02 - Magic/Magic System|Quadrath Magic System]] for the mage's elemental, structural, and pure-special spells. Do not add a separate attack profile or damage value here.
- **Guard Captain — Enchanted Armor:** The armor grants resistance to piercing and slashing damage.
- **Guard Captain — Anti-Magic Sword:** On a hit, the attack deals `4d6` slashing damage and negates magical attacks and effects on the target.

The Guard Captain's AC and non-attack bonuses are left DM-set because they were not specified. Assign only the direct bonuses needed for the scene.

The two elite guards are deliberately formidable. A single guard can usually defeat several ordinary town guards. Coordinated archers, terrain, magic, injuries, and attrition remain dangerous. Do not use one-to-one 5e challenge-rating assumptions with this homebrew system.

| NPC                | Personality and desire                                           |
| ------------------ | ---------------------------------------------------------------- |
| Edric, town mage   | Patient, curious, and absent-minded; wants the scroll preserved. |
| Halven, sergeant   | Strict and practical; wants order.                               |
| Mara, innkeeper    | Friendly and observant; wants a thriving tavern.                 |
| Torren, blacksmith | Blunt and proud; wants his iron back.                            |
| Selvik, trader     | Charming and competitive; seeks commercial advantage.            |
| Ilwen, collector   | Reserved and studious; wants rare documents.                     |

NPCs pursue their goals when ignored. Keep a calendar of shop hours, departures, and guard shifts. The player is not automatically a hero. Let trading, influence, debts, relationships, and consequences matter as much as combat. End wherever the merchant's decisions naturally lead.


> **DM reminder:** A quiet departure, a lucrative contract, an unexpected feud, or the scroll expedition are all valid outcomes. Follow the player's choices, not a predetermined ending.

## Character Levels

_Document id: `source.character-levels` · type: `source-document`_

# Character Levels

- 1 to 5: Novice
    Starting adventurers finding their footing in the world, learning the basics of their craft.

- 5 to 10: Adept
    Skilled practitioners who have honed their abilities and begun to make a name for themselves.

- 10 to 15: Master
    Renowned heroes whose prowess is widely recognized, capable of feats that inspire awe.

- 15 to 20: Legendary
    Living legends whose deeds shape the fate of Quadrath, wielding power that rivals the gods.

## Quadrath

_Document id: `source.start-here` · type: `source-document`_

# Quadrath

The *land of four sides*: North Kingdom, South Kingdom, West Kingdom and East Kingdom.

Quadrath is based on DnD 5e characters mostly and have all DnD classes and most races but ***fully geared towards Live Action RPG (LARPG) style of play***.

## Vault map

- [[Character Levels]]
- [[02 - Magic/Magic System|Magic System]]
- [[01 - World/Kingdoms/Kingdoms of Quadrath|The Four Kingdoms of Quadrath]]
- [[01 - World/Kingdoms/North Kingdom|North Kingdom]]
- [[01 - World/Kingdoms/South Kingdom|South Kingdom]]
- [[01 - World/Kingdoms/West Kingdom|West Kingdom]]
- [[01 - World/Kingdoms/East Kingdom|East Kingdom]]
- [[03 - History/War of the Dragon's Wrath|The War of the Dragon’s Wrath]]
- [[01 - World/Planes/Kingdoms beyond Quadrath|Kingdoms beyond Quadrath]]
- [[04 - Factions/Travellers of the Dark|Travellers of the Dark]]
- [[The Journey to the Sword of Gleam|The Journey to the Sword of Gleam]]
