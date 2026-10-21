#!/usr/bin/env python3
"""Import Quadrath Markdown notes as lossless structured JSON documents.

The importer is intentionally generic: headings, paragraphs, lists, tables,
quotes, rules, and other lines become typed blocks while source_markdown keeps
the original text available to publishers and future tooling.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
MANIFEST_PATH = CONTENT / "manifest.json"
EXCLUDED_NAMES = {"Quadrath Compiled.md"}


def slug(value: str) -> str:
    value = re.sub(r"[^a-z0-9]+", "-", value.casefold()).strip("-")
    return value or "document"


def table_cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def is_table_separator(line: str) -> bool:
    cells = table_cells(line)
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells)


def parse_blocks(markdown: str) -> list[dict]:
    lines = markdown.splitlines()
    blocks: list[dict] = []
    index = 0
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue
        heading = re.match(r"^(#{1,6})\s+(.*)$", line)
        if heading:
            blocks.append({"kind": "heading", "level": len(heading.group(1)), "text": heading.group(2).strip()})
            index += 1
            continue
        if line.strip() == "---" or line.strip() == "***":
            blocks.append({"kind": "separator"})
            index += 1
            continue
        if line.lstrip().startswith(">"):
            text = line.lstrip()[1:].strip()
            blocks.append({"kind": "quote", "text": text})
            index += 1
            continue
        if line.lstrip().startswith("|") and index + 1 < len(lines) and is_table_separator(lines[index + 1]):
            headers = table_cells(line)
            rows = []
            index += 2
            while index < len(lines) and lines[index].lstrip().startswith("|") and lines[index].strip():
                rows.append(table_cells(lines[index]))
                index += 1
            blocks.append({"kind": "table", "headers": headers, "rows": rows})
            continue
        list_match = re.match(r"^\s*(?:[-*+] |\d+[.)] )(.*)$", line)
        if list_match:
            ordered = bool(re.match(r"^\s*\d+[.)] ", line))
            items = []
            while index < len(lines):
                match = re.match(r"^\s*(?:[-*+] |\d+[.)] )(.*)$", lines[index])
                if not match:
                    break
                items.append(match.group(1).strip())
                index += 1
            blocks.append({"kind": "list", "ordered": ordered, "items": items})
            continue
        if line.startswith("    ") or line.startswith("\t"):
            code = []
            while index < len(lines) and (lines[index].startswith("    ") or lines[index].startswith("\t") or not lines[index].strip()):
                code.append(lines[index][4:] if lines[index].startswith("    ") else lines[index].lstrip("\t"))
                index += 1
            blocks.append({"kind": "code", "text": "\n".join(code).rstrip()})
            continue
        paragraph = [line.strip()]
        index += 1
        while index < len(lines) and lines[index].strip() and not re.match(r"^(#{1,6})\s+|^\s*(?:[-*+] |\d+[.)] )|^\s*>|^\s*\||^---$|^\*\*\*$", lines[index]):
            paragraph.append(lines[index].strip())
            index += 1
        blocks.append({"kind": "paragraph", "text": "\n".join(paragraph)})
    return blocks


def import_notes(source_dir: Path) -> int:
    manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    manifest["documents"] = [entry for entry in manifest["documents"] if entry.get("type") != "source-document"]
    source_root = source_dir.resolve()
    source_files = sorted(
        (path for path in source_root.rglob("*.md") if path.name not in EXCLUDED_NAMES and not any(part.startswith(".") for part in path.relative_to(source_root).parts)),
        key=lambda path: path.relative_to(source_root).as_posix().casefold(),
    )
    output_dir = CONTENT / "source"
    output_dir.mkdir(parents=True, exist_ok=True)
    for old in output_dir.glob("*.json"):
        old.unlink()
    for source in source_files:
        relative = source.relative_to(source_root).as_posix()
        markdown = source.read_text(encoding="utf-8").strip()
        title_match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
        title = title_match.group(1).strip() if title_match else source.stem
        document_id = f"source.{slug(relative.removesuffix('.md'))}"
        output_name = f"{slug(relative.removesuffix('.md'))}.json"
        output_path = output_dir / output_name
        document = {
            "id": document_id,
            "type": "source-document",
            "version": "0.1.0",
            "title": title,
            "source_path": relative,
            "blocks": parse_blocks(markdown),
            "source_markdown": markdown,
        }
        output_path.write_text(json.dumps(document, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        manifest["documents"].append({"path": f"source/{output_name}", "type": "source-document"})
    manifest["source_documents"] = {"count": len(source_files), "imported_from": "Quadrath Markdown source collection"}
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"imported: {len(source_files)} source documents")
    return len(source_files)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source_dir", type=Path, help="directory containing Markdown source notes")
    args = parser.parse_args()
    import_notes(args.source_dir)


if __name__ == "__main__":
    main()
