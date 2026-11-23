# 5-minute demo: Skills

Surface: Factory App · Level: Brand new to Droid · Docs fetched: 2026-11-22

## What you'll learn
A skill is a reusable workflow saved in `SKILL.md`. You will run one, watch Droid choose it on its own, and change how it works for everyone who uses it.

## Setup (0:00, 30 seconds)
1. Copy the `sandbox/` folder next to this file to a scratch location, for example your Desktop.
2. In the Factory App, start a new session with that folder as the working directory. Stay in **Normal Mode**.

## Steps

### Step 1 (0:30): Run the skill by name
**Type this:**
```text
/release-notes
```
**You should see:** Release notes in chat with **Features** and **Fixes** headings, built from `CHANGES.md`. The two `internal:` entries are left out.
**What just happened:** Every valid skill can be run as `/skill-name`. Droid attached the instructions from `.factory/skills/release-notes/SKILL.md` to your message. ([Skills](https://docs.factory.com/harness/skills.md))

### Step 2 (1:30): Let Droid pick the skill itself
**Type this:**
```text
Our customer newsletter goes out tomorrow. Summarize what shipped this sprint for it.
```
**You should see:** The same headings and the same filtering, without naming the skill.
**What just happened:** Droid compares your request with each skill's `description` and loads the matching one. The description is the routing surface. ([Skills](https://docs.factory.com/harness/skills.md))

### Step 3 (2:30): Change the team standard
**Type this:**
```text
Edit .factory/skills/release-notes/SKILL.md so the notes end with a "Thanks" line that credits each author once, in alphabetical order.
```
**You should see:** A small edit to the **Format** section of `SKILL.md`. Approve the edit if Droid asks.
**What just happened:** The skill is a plain file in the project, so one edit changes the workflow for everyone who opens this folder. ([Skills](https://docs.factory.com/harness/skills.md))

### Step 4 (3:45): Run it again in a fresh session
**Do this:** Start a new session in the same folder, then type:
```text
/release-notes
```
**You should see:** The same notes, now ending with `Thanks: Ana, Dev, Mei.`
**What just happened:** A new session loads skills from `.factory/skills/` again, so it uses your updated version. ([Skills](https://docs.factory.com/harness/skills.md))

## Recap: you can now
- Run a project skill with `/skill-name`.
- Write a request that Droid routes to a skill without naming it.
- Edit a `SKILL.md` and see the change in the next session.

## Next
Try `/droid-coach demo custom droids`: they package a workflow with its own model and tool policy, and run it in a fresh context window.

## Sources
- [Skills](https://docs.factory.com/harness/skills.md), fetched 2026-11-22
- [Custom droids (subagents)](https://docs.factory.com/harness/subagents.md), fetched 2026-11-22
