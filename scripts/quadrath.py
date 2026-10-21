#!/usr/bin/env python3
"""Small, dependency-free content CLI for Quadrath base content."""

from __future__ import annotations

import argparse
import json
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
    if data["type"] == "character":
        sheet = data.get("sheet", {})
        if set(sheet) != {"hp", "ac", "modifiers"}:
            raise ValueError(f"{path.relative_to(ROOT)}: character sheet must contain only hp, ac, modifiers")
        if not isinstance(sheet["modifiers"], dict) or set(sheet["modifiers"]) != CHARACTER_FIELDS - {"hp", "ac"}:
            raise ValueError(f"{path.relative_to(ROOT)}: character modifiers do not match the fixed player sheet")
        if any(not isinstance(value, int) for value in [sheet["hp"], sheet["ac"], *sheet["modifiers"].values()]):
            raise ValueError(f"{path.relative_to(ROOT)}: sheet values must be integers")


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
    print(f"valid: {len(seen)} documents")


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
                    lines.append(f"- **{child_key.replace('_', ' ').title()}:** {inline(child_value)}")
    else:
        lines.append(f"- **{key.replace('_', ' ').title()}:** {inline(value)}")


def render(_args):
    validate(_args)
    manifest = read_json(MANIFEST_PATH)
    lines = [f"# {manifest['title']}", "", manifest["description"], "", f"Version: `{manifest['version']}`", ""]
    for entry, _path, data in documents():
        lines.extend([f"## {data['title']}", "", f"_Document id: `{data['id']}` · type: `{entry['type']}`_", ""])
        if data.get("type") == "source-document":
            source_markdown = "\n".join(line.rstrip() for line in data["source_markdown"].splitlines()).rstrip()
            lines.extend([source_markdown, ""])
            continue
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
