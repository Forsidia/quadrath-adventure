# Quadrath Adventure

An open source browser adventure and searchable tabletop RPG Compendium for **Quadrath**, built with React, TypeScript, and Vite. Explore Quadrath through choice-driven encounters, or keep its rules and world close at hand during a tabletop session. The game's rules and world data live in this repository too.

**[Play Quadrath Adventure](https://quadrath.forsidia.in/) · [Browse the Compendium](https://quadrath.forsidia.in/?view=compendium) · [Quadrath product page](https://forsidia.in/products/quadrath-ttrpg)**

Maintained by [Forsidia](https://forsidia.in). The current prototype is free to play, works on mobile and desktop, and needs no account.

## What you can do

- **Explore Okla Deli:** choose a traveller, visit locations, roll 2d6 encounters, and decide how to respond.
- **Build a party:** create characters from scratch, or load any player character or NPC from the Compendium to fill in the whole sheet.
- **Keep your progress:** your traveller, gold, acquired items, and journal are saved locally in your browser.
- **Search the world:** browse rules, characters, NPCs, spells, weapons, traps, and lore with linked references.
- **Bring it to the table:** download individual records or the session handbook from the Compendium.

## Project status

Quadrath Adventure is an early prototype under active development. Random encounters are playable. The Campaign page has a character maker; campaign play (sessions, quests, progression) is planned. It does not yet implement full combat, multiplayer, or account sync. Browser saves stay on the device and browser where you play.

Everything here — the app, the rules, and the world — is open source.

## Run locally

Requires Node.js 22 or newer. The checked-in content bundle makes the app self-contained; Python 3.10+ is only needed to edit game content.

```sh
npm ci
npm run dev
```

Open **http://localhost:5174**. Production preview uses **4174**. Ports are fixed to avoid other local apps. Servers are started manually.

## Screens

The bottom menu switches between three mobile-responsive screens:

- **Gameplay:** a choice-driven, Twine-style visit to Okla Deli. Select a traveller, move between locations, roll the 2d6 encounter table, and choose how to respond. Ability checks, a gold purse, acquired items, and a journal are saved in this browser. Start a new traveller using the confirmation control.
- **Campaign:** a character maker for building a party. Start from scratch or load from the Compendium: player characters and NPCs both carry full stat blocks, so either one fills in the form (identity, level and tier, HP, AC, modifiers, actions, abilities, traits, equipment, backstory). Edit anything, save characters to a party kept in this browser, or export one as JSON in the Compendium character format.
- **Compendium:** searchable rules, PCs, NPCs, spells, weapons, traps, and lore. Includes compact stats, enchantment bonuses, linked references, syntax-highlighted JSON, record downloads, and a handbook download.

The Campaign mode button on Gameplay opens the Campaign page. Encounter prompts and character data come from the content bundle; branch outcomes, starting gold, trading profit, and nonlethal check-based duels are app-level rules. Local saves are not an authoritative game server.

## Game content

Rules and world data are maintained as JSON in `content/`; `content/manifest.json` is the content index. The app loads them from a generated bundle, `public/bundles/quadrath.bundle.json`. Do not edit the bundle by hand: edit the JSON, then regenerate.

```sh
python3 scripts/quadrath.py validate   # validate data, D6 expressions, references, weapon bonuses
npm run content:update                 # regenerate the bundle the app serves
```

`content:update` validates format, pack identity, attribution, manifest completeness, and SHA-256 integrity before atomically replacing the bundle; a failed update leaves the previous one in place. Review and commit the regenerated bundle with your content change. Normal builds never regenerate it.

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

Full narrative text is retained in `reference_sections` within the relevant topic documents; the handbook uses a concise presentation for sessions. `python3 scripts/quadrath.py render` writes a standalone handbook to `generated/quadrath.md` (not committed).

### Add and maintain records

Create a JSON document in the appropriate directory and register its path and type in the manifest. For a new player character:

```sh
python3 scripts/quadrath.py add-character content/characters/my-character.json
```

Keep stable IDs and update document versions as the game evolves. The fixed player sheet contains HP, AC, and modifiers for intelligence, constitution, dexterity, persuasion, and charisma; there are no underlying ability scores.

Healing is separate from damage. Spellcasting actions refer to `spell_ref`. Weapons have a numeric default `attack_bonus`, with `enchantment.attack_bonus` on the weapon and `equipment_attack_adjustment` on the equipped character action. The resolved action bonus is checked against those components.

New mechanics assigned where notes lacked values carry draft labels and need balance review.

### Bundle format

The bundle loads as one JSON request and is indexed in memory; record and handbook downloads are generated from it. It contains a versioned `quadrath-content-bundle` format, pack ID, and content version; the manifest and every registered document as `{ path, data }`; a generated handbook and the content license notice; and attribution plus a SHA-256 checksum of the canonical manifest, documents, and resources. Exports are deterministic: unchanged content yields the same bundle and checksum. The checksum detects changed content; it does not authenticate the publisher.

## Structure

| Path | Responsibility |
| --- | --- |
| `content/`, `schema/` | Rules and world data and their formats |
| `src/campaign/` | Character maker, Compendium character loading, party roster |
| `src/game/` | Encounter engine, choice flow, local state, gameplay screen |
| `src/viewer/` | Compendium, record indexing, presentation |
| `src/App.tsx` | Gameplay/Campaign/Compendium navigation |
| `scripts/quadrath.py`, `handbook.py`, `bundle.py` | Content validation, handbook rendering, bundle export |
| `scripts/update-content.mjs` | Regenerate the served bundle |
| `scripts/bundle-format.mjs` | Bundle validation and integrity checks |
| `public/bundles/` | Generated content bundle |
| `tests/`, `scripts/test_*.py` | App and content checks |

## Build and deploy

```sh
npm test
npm run content:check
npm run build
npm run preview
```

The build validates the content bundle, type-checks TypeScript, and creates `dist/`. It does not run the Python tooling. Import this repository into Vercel with the repository root as the project directory; `vercel.json` configures the Vite build and output. No environment variables are required.

Screen selection uses a query parameter; Compendium entries use URL fragments. No SPA path rewrite is required. The app is a static site; it does not require a backend or an account service.

## Contributing

Bug reports, play-test feedback, rules and lore corrections, accessibility improvements, and focused pull requests are welcome. Open an issue to discuss a larger change before building it.

For an app bug, include your browser, steps to reproduce, and what you expected to happen. For rules, lore, or data corrections, edit `content/` and regenerate the bundle as described above.

Before submitting a change, run `npm test` and `npm run build`. For content changes, also run:

```sh
python3 -m unittest discover -s scripts -p 'test_*.py'
```

Do not commit personal browser saves or credentials.

## Licensing

- **Code** (app and tooling): [MIT](LICENSE).
- **Game content** (`content/`, `schema/`, and the generated bundle): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), attributed to Forsidia; see [CONTENT_LICENSE.md](CONTENT_LICENSE.md). Attribution and the license notice are included in the bundle.

See [NOTICE.md](NOTICE.md) for the distinction between software and content.
