# Quadrath Base Content

The open foundation for **Quadrath**, a tabletop roleplaying game by Forsidia. This repository contains the maintained rules and structured game data, the session handbook, and a portable database bundle for applications.

[Quadrath product page](https://forsidia.in/products/quadrath-ttrpg) · [Forsidia](https://forsidia.in)

## Work with the content

Requires Python 3.10 or newer, with no third-party Python packages.

```sh
python3 scripts/quadrath.py validate
python3 scripts/quadrath.py render
python3 scripts/bundle.py
```

The first command validates the data, D6 expressions, references, and equipped weapon bonuses. The second generates the session-ready handbook at `generated/quadrath.md`. The third exports `generated/quadrath-base.bundle.json`, containing the current content and an up-to-date handbook.

The browser app lives in a separate repository. This repository has no React app, Node.js dependency, or deployment step.

## Content layout

| Directory | Contents |
| --- | --- |
| `content/rules/` | Core 2d6 rules and character model |
| `content/characters/` | Merchant, teacher, and farmer player characters |
| `content/magic/spells/` | Spell mechanics, damage, healing, and effects |
| `content/equipment/` | Weapons, enchanted items, and equipment |
| `content/npcs/` | Town NPCs and supporting cast |
| `content/traps/` | Detection, disabling, saves, and consequences |
| `content/adventures/` | Locations, quests, and encounter tables |
| `content/sessions/` | Recorded play and continuity |
| `content/factions/` and `content/lore/` | Factions, places, history, and stories |
| `schema/` | Machine-readable format definitions |
| `scripts/` | Validation, handbook rendering, and bundle export |
| `generated/` | Handbook and distributable base bundle |

`content/manifest.json` is the maintained content index. Edit the JSON, then regenerate the handbook and bundle. Full narrative text is retained in `reference_sections` within the relevant topic documents; the handbook uses a concise presentation for sessions.

## Export an application database

```sh
python3 scripts/bundle.py
python3 scripts/bundle.py --output /path/to/quadrath-base.bundle.json
```

The JSON bundle is designed to load as one database request in JavaScript applications. It includes:

- A versioned `quadrath-content-bundle` format, pack ID, and content version.
- The manifest and every registered document as `{ path, data }`.
- A generated handbook and content license notice.
- Attribution and a SHA-256 checksum of the canonical manifest, documents, and resources.

Exports are deterministic: unchanged content yields the same bundle and checksum. Consumers should check the format version, document index, and checksum before replacing their existing database. The checksum detects changed content; it does not authenticate the publisher.

```js
const bundle = await fetch('/bundles/quadrath-base.bundle.json').then(r => r.json());
const documents = bundle.documents;
const spells = documents.find(entry => entry.data.id === 'spells.catalog').data.spells;
```

Publish the regenerated bundle alongside a content release so consuming applications can download that exact release or refresh from the repository's current branch. This package exports only open base content. Application-specific and paid packs belong in their respective application repositories.

## Add and maintain records

Create a JSON document in the appropriate directory and register its path and type in the manifest. For a new player character:

```sh
python3 scripts/quadrath.py add-character content/characters/my-character.json
```

Keep stable IDs and update document versions as the game evolves. The fixed player sheet contains HP, AC, and modifiers for intelligence, constitution, dexterity, persuasion, and charisma; there are no underlying ability scores.

Healing is separate from damage. Spellcasting actions refer to `spell_ref`. Weapons have a numeric default `attack_bonus`, with `enchantment.attack_bonus` on the weapon and `equipment_attack_adjustment` on the equipped character action. The resolved action bonus is checked against those components.

New mechanics assigned where notes lacked values carry draft labels and need balance review.

## Checks

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
```

Tests cover content validation, equipped weapon totals, and deterministic bundle generation.

## License

Game content in `content/`, `schema/`, and `generated/` is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); see [CONTENT_LICENSE.md](CONTENT_LICENSE.md). The Python tooling uses the [MIT License](LICENSE).

This content forms part of the free foundation for the upcoming Quadrath VTT.
