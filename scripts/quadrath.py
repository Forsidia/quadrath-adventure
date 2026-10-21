#!/usr/bin/env python3
"""Small, dependency-free content CLI for Quadrath base content."""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
MANIFEST_PATH = CONTENT / "manifest.json"
CHARACTER_FIELDS = {"hp", "ac", "intelligence", "constitution", "dexterity", "persuasion", "charisma"}


def read_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"{path.relative_to(ROOT)}: {exc}") from exc


def documents():
    manifest = read_json(MANIFEST_PATH)
    for entry in manifest["documents"]:
        path = CONTENT / entry["path"]
        yield entry, path, read_json(path)


def validate_document(data, path: Path):
    required = ("id", "type", "version", "title")
    missing = [key for key in required if key not in data]
    if missing:
        raise ValueError(f"{path.relative_to(ROOT)}: missing {', '.join(missing)}")
    if not isinstance(data["id"], str) or not data["id"]:
        raise ValueError(f"{path.relative_to(ROOT)}: id must be a non-empty string")
    def validate_action(action, location):
        if isinstance(action, dict) and 'spell_ref' in action:
            return
        if not isinstance(action, dict) or "damage" not in action:
            raise ValueError(f"{path.relative_to(ROOT)}: {location} must declare damage")
        damage = action["damage"]
        if not isinstance(damage, dict) or not {"roll", "type"}.issubset(damage):
            raise ValueError(f"{path.relative_to(ROOT)}: {location} damage must declare roll and type")
        if not re.fullmatch(r'(?:0|[1-9][0-9]*d6)(?: \+ (?:INT|intelligence|[0-9]+))?', damage['roll']):
            raise ValueError(f'{location}: invalid D6 damage roll')
        if damage['type'] in ('varies', 'healing', 'mana'):
            raise ValueError(f'{location}: invalid damage type')
    if data["type"] == "character":
        sheet = data.get("sheet", {})
        if set(sheet) != {"hp", "ac", "modifiers"}:
            raise ValueError(f"{path.relative_to(ROOT)}: character sheet must contain only hp, ac, modifiers")
        if not isinstance(sheet["modifiers"], dict) or set(sheet["modifiers"]) != CHARACTER_FIELDS - {"hp", "ac"}:
            raise ValueError(f"{path.relative_to(ROOT)}: character modifiers do not match the fixed player sheet")
        if any(not isinstance(value, int) for value in [sheet["hp"], sheet["ac"], *sheet["modifiers"].values()]):
            raise ValueError(f"{path.relative_to(ROOT)}: sheet values must be integers")
        for action in data.get("actions", []):
            validate_action(action, f"character {data['id']} action")
    if data["type"] == "spell-catalog":
        for spell in data.get("spells", []):
            validate_action(spell, f"spell {spell.get('id', '?')}")
    if data["type"] == "equipment-catalog":
        for weapon in data.get('weapons', []):
            if type(weapon.get('attack_bonus')) is not int:
                raise ValueError('weapon attack_bonus must be an integer default')
            if type(weapon.get('enchantment', {}).get('attack_bonus', 0)) is not int:
                raise ValueError('enchantment attack_bonus must be an integer')
        for item in data.get("weapons", []) + data.get("items", []):
            validate_action(item, f"equipment {item.get('id', '?')}")
    if data["type"] == "npc-catalog":
        for npc in data.get("npcs", []):
            for action in npc.get("actions", []) + npc.get("abilities", []):
                validate_action(action, f"NPC {npc.get('id', '?')} action")
    if data["type"] == "trap-catalog":
        for trap in data.get("traps", []):
            validate_action(trap, f"trap {trap.get('id', '?')}")


def validate(_args):
    manifest = read_json(MANIFEST_PATH)
    seen = set()
    for entry, path, data in documents():
        validate_document(data, path)
        if data["id"] in seen:
            raise ValueError(f"duplicate document id: {data['id']}")
        seen.add(data["id"])
        if entry.get("type") != data["type"]:
            raise ValueError(f"manifest type mismatch for {path.relative_to(ROOT)}")
    if len(seen) != len(manifest["documents"]):
        raise ValueError("manifest contains duplicate document entries")
    entries=list(documents())
    ids=set()
    refs=[]
    def inspect(value):
        if isinstance(value, dict):
            if isinstance(value.get('id'),str): ids.add(value['id'])
            for key,item in value.items():
                if key.endswith('_ref'): refs.append(item)
                if key=='roll' and isinstance(item,str) and not re.fullmatch(r'(?:0|[1-9][0-9]*d6)(?: \+ (?:INT|intelligence|constitution|dexterity|persuasion|charisma|[0-9]+))?',item):
                    raise ValueError(f'invalid dice expression: {item}')
                inspect(item)
        elif isinstance(value,list):
            for item in value:inspect(item)
    for _,_,data in entries:inspect(data)
    for ref in refs:
        if ref not in ids and not (CONTENT/ref).is_file():raise ValueError(f'broken reference: {ref}')
    weapons={w['id']:w for _,_,data in entries for w in data.get('weapons', [])}
    for _,_,data in entries:
        for character in data.get('npcs', [data]):
            for action in character.get('actions', []):
                if 'weapon_ref' not in action: continue
                weapon=weapons[action['weapon_ref']]
                adjustment=action.get('equipment_attack_adjustment', 0)
                if type(adjustment) is not int:raise ValueError('equipment adjustment must be an integer')
                total=weapon['attack_bonus']+weapon.get('enchantment', {}).get('attack_bonus',0)+adjustment
                if action.get('attack_bonus')!=total:raise ValueError('equipped weapon bonus does not match resolved action bonus')
    print(f"valid: {len(seen)} documents; dice and references checked")


def inline(value):
    if isinstance(value, list):
        return ", ".join(inline(item) for item in value)
    if isinstance(value, dict):
        return "; ".join(f"{key}: {inline(item)}" for key, item in value.items())
    return str(value)


def render_value(lines, key, value, level=2):
    if isinstance(value, dict):
        lines.append(f"{'#' * level} {key.replace('_', ' ').title()}")
        for child_key, child_value in value.items():
            render_value(lines, child_key, child_value, level + 1)
    elif isinstance(value, list) and value and all(isinstance(item, dict) for item in value):
        lines.append(f"{'#' * level} {key.replace('_', ' ').title()}")
        for item in value:
            label = item.get("title") or item.get("name") or item.get("id") or "Entry"
            lines.append(f"{'#' * (level + 1)} {label}")
            for child_key, child_value in item.items():
                if child_key not in {"title", "name", "id"}:
                    lines.append(f"- **{child_key.replace('_', ' ').title()}:** {inline(child_value)}".rstrip())
    else:
        lines.append(f"- **{key.replace('_', ' ').title()}:** {inline(value)}".rstrip())


def render(_args):
    validate(_args)
    from handbook import build_handbook
    output = ROOT / 'generated' / 'quadrath.md'
    output.write_text(build_handbook([data for _,_,data in documents()]),encoding='utf-8')
    print(f'rendered: {output.relative_to(ROOT)}')
    return
    manifest = read_json(MANIFEST_PATH)
    lines = [f"# {manifest['title']}", "", manifest["description"], "", f"Version: `{manifest['version']}`", ""]
    for entry, _path, data in documents():
        lines.extend([f"## {data['title']}", "", f"_Document id: `{data['id']}` · type: `{entry['type']}`_", ""])
        for key, value in data.items():
            if key not in {"id", "type", "version", "title", "summary"}:
                render_value(lines, key, value)
        if data.get("summary"):
            lines.extend([data["summary"], ""])
    output = ROOT / "generated" / "quadrath.md"
    output.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"rendered: {output.relative_to(ROOT)}")


def add_character(args):
    source = Path(args.path).expanduser().resolve()
    data = read_json(source)
    validate_document(data, source)
    if data["type"] != "character":
        raise ValueError("add-character requires a document with type=character")
    manifest = read_json(MANIFEST_PATH)
    if any(entry.get("path") == str(source.relative_to(CONTENT)) for entry in manifest["documents"] if source.is_relative_to(CONTENT)):
        raise ValueError("character is already registered")
    if any(entry_data["id"] == data["id"] for _entry, _path, entry_data in documents()):
        raise ValueError(f"document id already exists: {data['id']}")
    try:
        relative = source.relative_to(CONTENT)
    except ValueError as exc:
        raise ValueError("character file must be inside content/") from exc
    manifest["documents"].append({"path": str(relative), "type": "character"})
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"registered: {relative}")


def main():
    parser = argparse.ArgumentParser(prog="quadrath", description="Validate and render Quadrath base content")
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("validate", help="validate all manifest documents")
    subparsers.add_parser("render", help="validate and generate generated/quadrath.md")
    add = subparsers.add_parser("add-character", help="register a new character JSON file")
    add.add_argument("path")
    args = parser.parse_args()
    try:
        {"validate": validate, "render": render, "add-character": add_character}[args.command](args)
    except ValueError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
