# 5-minute demo: Custom droids

Surface: Factory App · Level: Brand new · Docs fetched: 2026-11-23

## What you'll learn
A **custom droid** (also called a **subagent**) is a specialist helper defined in one Markdown file. Droid hands it a focused job, and it works with a clean memory, a **fresh context window**, then returns one answer. You will use a ready-made test reviewer, confirm it can only read, and act on its findings.

## Setup (0:00, 30 seconds)
1. Copy the `sandbox/` folder next to this file to a scratch location, for example your Desktop. (On an iPad, ask Droid in any session on your PC: "Copy demos/custom-droids/sandbox to my Desktop as custom-droids-sandbox.")
2. In the Factory App, start a new session with that folder as the working directory.

## Steps

### Step 1 (0:30): Meet the droid
**Type this:**
```text
Open .factory/droids/test-reviewer.md and explain in plain words what this custom droid does, which tools it may use, and what it returns. Do not change anything.
```
**You should see:** Droid describes `test-reviewer`: it reviews tests, uses `read-only` tools, and returns a list of missing test cases.
**What just happened:** Settings at the top (name, model, tools), instructions below. Files in `.factory/droids/` belong to this project. ([Custom droids](https://docs.factory.com/harness/subagents.md))

### Step 2 (1:30): Hand it a job
**Type this:**
```text
Use the subagent test-reviewer on discounts.py and test_discounts.py. Then summarize its findings for me in a short list.
```
**You should see:** A step showing the `test-reviewer` task running, then a short list of missing tests, such as a discount over 100%, a negative discount, and rounding.
**What just happened:** Droid used its **Task tool** (how it hands off work) to start the subagent, which worked alone and returned one message. ([Custom droids](https://docs.factory.com/harness/subagents.md))

### Step 3 (2:45): Check its limits
**Type this:**
```text
Ask the subagent test-reviewer to add the missing tests to test_discounts.py itself. Tell me exactly what it was able to do, and whether test_discounts.py changed.
```
**You should see:** The reviewer reports that it cannot edit files, and `test_discounts.py` is unchanged.
**What just happened:** `tools: read-only` is enforced, not a suggestion. ([Custom droids](https://docs.factory.com/harness/subagents.md))

### Step 4 (3:45): Act on the findings
**Type this:**
```text
Add the missing tests the reviewer listed to test_discounts.py. Change apply_discount in discounts.py to raise ValueError when percent is below 0 or above 100. Then run python -m unittest and show the result.
```
**You should see:** New tests appear, `discounts.py` gains a check, and the output ends with `OK`. Finish by 5:00.
**What just happened:** The specialist advised; the main session, which can edit, made the change. ([Custom droids](https://docs.factory.com/harness/subagents.md))

## Recap: you can now
- Read a custom droid file and name its tools and purpose.
- Ask Droid to delegate a job to a named subagent and get back its findings.
- Show that a read-only droid cannot change files.

## Next
Try `/droid-coach demo hooks`: automatic checks at set moments, another kind of guardrail.

## Sources
- [Custom droids (subagents)](https://docs.factory.com/harness/subagents.md), fetched 2026-11-23
