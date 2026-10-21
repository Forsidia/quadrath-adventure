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
