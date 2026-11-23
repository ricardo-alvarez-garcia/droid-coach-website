# 5-minute demo: Spec Mode

Surface: Factory App · Level: Brand new to Droid · Docs fetched: 2026-11-22

## What you'll learn
Spec Mode has Droid investigate and propose a plan for review before it changes any files, so you approve the approach before any edits happen.

## Setup (0:00, 30 seconds)
1. Copy the `sandbox/` folder next to this file to a scratch location, for example your Desktop.
2. In the Factory App, start a new session with that folder as the working directory.
3. In the mode selector, choose **Spec Mode**. (A *mode* sets the overall shape of a session. **Normal Mode** works directly; **Spec Mode** plans first.)

## Steps

### Step 1 (0:30): Ask for a fix, not an edit
**Type this:**
```text
The test in test_pricing.py fails. Find out why and propose a fix to pricing.py. Do not change the tests. The fix is done when python -m unittest passes.
```
**You should see:** Droid reads `pricing.py` and `test_pricing.py`, explains that `apply_discount` subtracts the percentage as a flat amount, and proposes a plan. `pricing.py` is unchanged.
**What just happened:** In Spec Mode, Droid researches and plans but does not edit files, change configuration, or make commits until you approve. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md))

### Step 2 (1:45): Steer the plan before any code exists
**Type this:**
```text
Also reject percent values below 0 or above 100 with a ValueError. Update the plan.
```
**You should see:** A revised plan that includes the input check. Still no file changes.
**What just happened:** You changed the design while it was still cheap to change. The docs recommend stating the outcome, constraints, and how to verify the work. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md))

### Step 3 (2:45): Approve and pick an Autonomy Level
**Do this:** In the approval options, choose to proceed with **Auto Low**. (*Autonomy Level* controls what Droid can do without asking you first. Low allows file edits and low-risk commands.)
**You should see:** Droid leaves Spec Mode, edits `pricing.py`, and runs `python -m unittest`. If it asks for permission to run the command, approve it.
**What just happened:** Approving the plan returns the session to Normal Mode for implementation, at the Autonomy Level you chose. ([Autonomy Level](https://docs.factory.com/autonomy-and-safety/auto-run.md))

### Step 4 (4:00): Check the result yourself
**Type this:**
```text
Show me the diff of pricing.py and the test output.
```
**You should see:** A small diff in `apply_discount` and the line `OK` from the test run.
**What just happened:** You confirmed that the change matches the plan you approved, which is the review loop Spec Mode is built for. ([Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md))

## Recap: you can now
- Switch a Factory App session into Spec Mode before asking for a change.
- Revise a proposed plan with a follow-up message before any file is edited.
- Approve a plan with a chosen Autonomy Level and check the resulting diff.

## Next
Try `/droid-coach demo agents.md`: it records your project's commands and conventions so every plan starts from them.

## Sources
- [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), fetched 2026-11-22
- [Autonomy Level](https://docs.factory.com/autonomy-and-safety/auto-run.md), fetched 2026-11-22
- [Factory App Quickstart](https://docs.factory.com/factory-app/quickstart.md), fetched 2026-11-22
