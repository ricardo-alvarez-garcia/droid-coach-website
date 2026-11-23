---
name: release-notes
description: Turn CHANGES.md into customer-facing release notes. Use when the user asks for release notes, a changelog summary, or a summary of what shipped for customers.
---

# Release notes

Input: `CHANGES.md` in the project root.
Output: release notes in chat. Do not write files.

## Rules
1. Read only `CHANGES.md`.
2. Leave out every entry that starts with `internal:`.
3. Rewrite each remaining entry as one short sentence a customer would understand. Drop the author names.

## Format
```markdown
## Features
- ...

## Fixes
- ...
```
