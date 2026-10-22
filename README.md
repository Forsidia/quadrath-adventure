# Quadrath Adventure

An open source browser adventure and searchable tabletop RPG Compendium, built with React, TypeScript, and Vite. Explore Quadrath through choice-driven encounters, or keep its rules and world close at hand during a tabletop session.

**[Play Quadrath Adventure](https://quadrath.forsidia.in/) · [Browse the Compendium](https://quadrath.forsidia.in/?view=compendium) · [Open base content](https://github.com/Forsidia/quadrath-base-content)**

Maintained by [Forsidia](https://forsidia.in). The current prototype is free to play, works on mobile and desktop, and needs no account.

## What you can do

- **Explore Okla Deli:** choose a traveller, visit locations, roll 2d6 encounters, and decide how to respond.
- **Keep your progress:** your traveller, gold, acquired items, and journal are saved locally in your browser.
- **Search the world:** browse rules, characters, NPCs, spells, weapons, traps, and lore with linked references.
- **Bring it to the table:** download individual records or the session handbook from the Compendium.

## Project status

Quadrath Adventure is an early prototype under active development. Random encounters are playable; campaign mode is planned. It does not yet implement full combat, multiplayer, account sync, or paid content. Browser saves stay on the device and browser where you play.

The app and its included base content are open. Future expansions may use separate licensing and delivery; none are included here.

## Run locally

Requires Node.js 22 or newer. The checked-in base bundle makes the app self-contained; the base-content checkout and Python are not required to run or deploy it.

```sh
npm ci
npm run dev
```

Open **http://localhost:5174**. Production preview uses **4174**. Ports are fixed to avoid other local apps. Servers are started manually.

## Screens

The bottom menu switches between two mobile-responsive screens:

- **Gameplay:** a choice-driven, Twine-style visit to Okla Deli. Select a traveller, move between locations, roll the bundled 2d6 encounter table, and choose how to respond. Ability checks, a gold purse, acquired items, and a journal are saved in this browser. Start a new traveller using the confirmation control.
- **Compendium:** searchable rules, PCs, NPCs, spells, weapons, traps, and lore. Includes compact stats, enchantment bonuses, linked references, syntax-highlighted JSON, record downloads, and a handbook download.

Random Encounters is active. Campaign is visibly disabled. The current gameplay is an early prototype: encounter prompts and character data come from the base bundle; branch outcomes, starting gold, trading profit, and nonlethal check-based duels are app-level rules. It does not implement full combat or paid content. Local saves are not an authoritative game server.

## Refresh the base database

The maintained game data lives in the public [Quadrath Base Content](https://github.com/Forsidia/quadrath-base-content) repository. Do not edit the bundled database manually.

Use current local edits (requires Python 3.10+):

```sh
npm run content:update -- --local ../quadrath-base-content
```

Download the latest published bundle from the public repository's main branch:

```sh
npm run content:update
```

Or select a published tag/commit or a hosted bundle:

```sh
npm run content:update -- --ref v0.1.0
npm run content:update -- --url https://example.com/quadrath-base.bundle.json
```

The remote commands require `generated/quadrath-base.bundle.json` to have been exported and published at the selected reference. Until that is published, use the local update command. The example tag is illustrative.

Updates validate format, pack identity, attribution, manifest completeness, and SHA-256 integrity before atomically replacing `public/bundles/quadrath-base.bundle.json`. A failed update leaves the previous database in place. Review and commit updates explicitly; normal builds never fetch a changing upstream bundle.

The bundle contains the original documents, an up-to-date session handbook, and the content license notice. Runtime loading makes one JSON request and indexes that database in memory. Record and handbook downloads are generated from the loaded bundle.

## Structure

| Path | Responsibility |
| --- | --- |
| `src/game/` | Encounter engine, choice flow, local state, gameplay screen |
| `src/viewer/` | Compendium, record indexing, presentation |
| `src/App.tsx` | Gameplay/Compendium navigation |
| `scripts/update-content.mjs` | Explicit local or remote database refresh |
| `scripts/bundle-format.mjs` | Bundle validation and integrity checks |
| `public/bundles/` | Generated open base database only |
| `tests/` | Engine, bundle, loading, and highlighting checks |

Only open base content belongs in this repository and its publicly served `public/` directory. Any future paid bundles need separate storage and authenticated delivery; there is no entitlement system in this prototype.

## Build and deploy

```sh
npm test
npm run content:check
npm run build
npm run preview
```

The build validates the bundled database, type-checks TypeScript, and creates `dist/`. It does not need the base repository. Import this repository into Vercel with the repository root as the project directory; `vercel.json` configures the Vite build and output. No environment variables are required for the current open-base prototype.

Screen selection uses a query parameter; Compendium entries use URL fragments. No SPA path rewrite is required. The current app is a static site; it does not require a backend or an account service.

## Contributing

Bug reports, play-test feedback, accessibility improvements, and focused pull requests are welcome. Open an issue to discuss a larger change before building it.

For an app bug, include your browser, steps to reproduce, and what you expected to happen. For rules, lore, or data corrections, use [Quadrath Base Content](https://github.com/Forsidia/quadrath-base-content); this app imports its generated database rather than maintaining a second copy.

Before submitting a code change, run `npm test` and `npm run build`. Do not commit personal browser saves, credentials, or non-public content.

## Licensing

- **Application code:** [MIT](LICENSE).
- **Included base content:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), attributed to Forsidia. Attribution and the original content license notice are included in the bundle.

See [NOTICE.md](NOTICE.md) for the distinction between software and content. These licenses do not grant rights to any future separately distributed paid expansions.
