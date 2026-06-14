#!/usr/bin/env python3
import os
import re
import sys

# Paths relative to the repository root
CONTENT_EN = "content/en"
CONTENT_ES = "content/es"

def parse_markdown_file(filepath):
    """
    Parses a markdown file and extracts:
    1. Set of front-matter keys (top-level YAML keys).
    2. List of heading levels (e.g. [1, 2, 2, 3]).
    3. List of Zensical tab names (e.g. ["ADOPT", "TRIAL"]).
    """
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()

    # 1. Parse Front-matter
    front_matter_keys = set()
    in_front_matter = False
    front_matter_lines = []

    if lines and lines[0] == "---":
        in_front_matter = True
        for line in lines[1:]:
            if line == "---":
                in_front_matter = False
                break
            front_matter_lines.append(line)

    # Simple regex for top-level keys in YAML: e.g. "key:" or "  key:" (but let's focus on top-level keys)
    # Usually top-level keys are in the format: ^[a-zA-Z0-9_-]+:
    for line in front_matter_lines:
        match = re.match(r"^([a-zA-Z0-9_-]+):", line)
        if match:
            front_matter_keys.add(match.group(1))

    # 2 & 3. Parse Headings and Zensical Tabs
    heading_levels = []
    tabs = []

    for line in lines:
        # Ignore comments or code block content (a simple check, though maybe not strictly necessary
        # for site content template unless we have headings inside code blocks)
        # Check for headings
        heading_match = re.match(r"^(#{1,6})\s", line)
        if heading_match:
            heading_levels.append(len(heading_match.group(1)))

        # Check for tabs: === "TAB_NAME" or === 'TAB_NAME'
        tab_match = re.match(r"^===\s*[\"']([^\"']+)[\"']", line)
        if tab_match:
            tabs.append(tab_match.group(1))

    return front_matter_keys, heading_levels, tabs

def check_i18n():
    en_files = []
    es_files = []

    # Gather all markdown files in content/en
    for root, _, files in os.walk(CONTENT_EN):
        for file in files:
            if file.endswith(".md"):
                rel_path = os.path.relpath(os.path.join(root, file), CONTENT_EN)
                en_files.append(rel_path)

    # Gather all markdown files in content/es
    for root, _, files in os.walk(CONTENT_ES):
        for file in files:
            if file.endswith(".md"):
                rel_path = os.path.relpath(os.path.join(root, file), CONTENT_ES)
                es_files.append(rel_path)

    errors = []

    # Check for missing ES counterparts
    for rel_path in en_files:
        es_path = os.path.join(CONTENT_ES, rel_path)
        if not os.path.exists(es_path):
            errors.append(f"Missing Spanish counterpart for: {os.path.join(CONTENT_EN, rel_path)}")
            continue

        en_path = os.path.join(CONTENT_EN, rel_path)

        # Parse files
        try:
            en_fm, en_headings, en_tabs = parse_markdown_file(en_path)
            es_fm, es_headings, es_tabs = parse_markdown_file(es_path)
        except Exception as e:
            errors.append(f"Error parsing files for {rel_path}: {e}")
            continue

        # Check front-matter symmetry
        if en_fm != es_fm:
            missing_in_es = en_fm - es_fm
            missing_in_en = es_fm - en_fm
            err_msg = f"Front-matter asymmetry in {rel_path}:"
            if missing_in_es:
                err_msg += f" keys missing in ES: {missing_in_es}"
            if missing_in_en:
                err_msg += f" keys missing in EN: {missing_in_en}"
            errors.append(err_msg)

        # Check headings sequence symmetry
        if en_headings != es_headings:
            errors.append(
                f"Heading level sequence mismatch in {rel_path}:\n"
                f"  EN headings: {en_headings}\n"
                f"  ES headings: {es_headings}"
            )

        # Check tab sequence symmetry
        if en_tabs != es_tabs:
            errors.append(
                f"Zensical tab sequence mismatch in {rel_path}:\n"
                f"  EN tabs: {en_tabs}\n"
                f"  ES tabs: {es_tabs}"
            )

    # Check for orphaned ES files
    for rel_path in es_files:
        en_path = os.path.join(CONTENT_EN, rel_path)
        if not os.path.exists(en_path):
            errors.append(f"Orphaned Spanish page: {os.path.join(CONTENT_ES, rel_path)}")

    if errors:
        print("=== i18n Symmetry Verification Failed ===", file=sys.stderr)
        for err in errors:
            print(f"- {err}", file=sys.stderr)
        return False

    print("=== i18n Symmetry Verification Succeeded ===")
    return True

if __name__ == "__main__":
    success = check_i18n()
    sys.exit(0 if success else 1)
