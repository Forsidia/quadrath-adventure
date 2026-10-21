# Quadrath Base Content

The open, machine-readable foundation for **Quadrath**, a tabletop roleplaying game by Forsidia. Learn more on the [Forsidia Quadrath project page](https://forsidia.in/projects/quadrath-ttrpg). This package is intended to be the maintained source for the public game rules and starter content, and forms part of the free content for the upcoming Quadrath VTT.

## What is here

- `content/manifest.json` — package metadata and content index.
- `content/rules/` — core rules and the player-character model.
- `content/characters/` — ready-to-use sample characters.
- `content/magic/` and `content/lore/` — open setting and magic references.
- `schema/` — JSON Schema for content validation.
- `scripts/quadrath.py` — dependency-free CLI for validation and Markdown generation.
- `generated/quadrath.md` — generated reading copy; edit the JSON, then regenerate this file.

## Quick start

From this directory:

```sh
python3 scripts/quadrath.py validate
python3 scripts/quadrath.py render
python3 scripts/quadrath.py add-character content/characters/my-character.json
```

`add-character` validates a character and adds it to the manifest. It does not overwrite an existing id. New content can be added by creating a JSON file in the appropriate content directory and registering it in `content/manifest.json`.

The data model deliberately keeps rules and presentation separate. Software can consume the JSON directly, while the renderer produces a human-readable Markdown reference for publishing or review.

## Character model

Quadrath characters use modifiers rather than full ability-score values. The base player sheet therefore has exactly these fields:

- `hp`
- `ac`
- `modifiers.intelligence`
- `modifiers.constitution`
- `modifiers.dexterity`
- `modifiers.persuasion`
- `modifiers.charisma`

`intelligence` is the canonical spelling used throughout the content model.

## Scope and versioning

This is the public base layer and free content foundation for the upcoming Forsidia VTT. The VTT may add paid or private content, but should be able to identify compatible base releases using `content/manifest.json` and each document's `id` and `version`.

The current rules intentionally mark unresolved details as explicit extension points instead of silently inventing a larger ruleset. Additions should preserve stable ids and increment the relevant document version.

## License

Game content in `content/`, `schema/`, and `generated/` is released under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) as described in `CONTENT_LICENSE.md`.

The CLI is software and is released under the MIT License in `LICENSE`.
