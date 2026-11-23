# 5-minute demo: Automations

Surface: Factory App · Level: Brand new · Docs fetched: 2026-11-22

## What you'll learn
Prepare a recurring stock check by testing its instructions and previewing a scheduled automation, without creating or enabling one.

## Setup (0:00, 30 seconds)
1. Copy the `sandbox/` folder next to this file to a scratch location, for example your Desktop.
2. In the Factory App, start a new session with that folder as the working directory.

Python must already be available as `python`. This rehearsal registers no automation and installs nothing.

## Steps

### Step 1 (0:30): Define the repeated chore (60 seconds)
**Type this:**
```text
Read README.md, inventory.json, check_stock.py,
test_check_stock.py, and run-instructions.md.
Explain the recurring stock-check job and its safety boundaries.
Tell me this session's absolute working directory.
Do not edit files or create an automation.
```
**You should see:** A stock check for items with two units or fewer, restricted to the fictional sandbox.
**What just happened:** Automation instructions describe the work repeated whenever a trigger starts a new Droid session. A trigger is the event that starts a run. [Automations](https://docs.factory.com/automations/overview.md)

### Step 2 (1:30): Rehearse one run (60 seconds)
**Type this:**
```text
Follow run-instructions.md once in this session:
run python -m unittest, then python check_stock.py if tests pass.
Report results here only. Do not create an automation.
```
**You should see:** Three passing tests, then:
```text
Low-stock items: 2
Pens: 1 remaining
Tape: 0 remaining
```
**What just happened:** You manually tested the prompt intended for each run; this was not a scheduled execution. Automation instructions are the prompt Droid follows on every run. [Custom Automations](https://docs.factory.com/automations/custom.md)

### Step 3 (2:30): Preview the schedule (75 seconds)
**Action:** Open [Automations](https://app.factory.ai/automations) in the Factory App sidebar. Select **New automation**, then **Custom scheduled automation**. If a menu appears instead, choose **Create with Template** to browse scheduled options.

Enter **Frequency** as:
```text
0 9 * * 1-5
```
**You should see:** A preview for weekdays at 09:00 UTC. Do not select **Create with session** or **Create**.
**What just happened:** A scheduled trigger starts work at specified times. This five-field cron expression is a compact schedule; cron runs in UTC. [Custom Automations](https://docs.factory.com/automations/custom.md)

### Step 4 (3:45): Review the draft, then leave it unsaved (75 seconds, finish 5:00)
**Action:** In the form, select your own machine under **Where it runs**. Set the working directory under **Additional settings** to the absolute sandbox directory from Step 1. Copy `run-instructions.md` into the instructions. Keep visibility and session privacy **Private**.

**You should see:** A draft linking the schedule, computer, sandbox, and instructions. Leave without creating it; no recurring job should be registered.
**What just happened:** An automation needs a trigger, instructions, identity, and execution location. Local scheduled runs require the computer awake, online, and running Droid. This rehearsal stops before creation. [Custom Automations](https://docs.factory.com/automations/custom.md)

## Recap: you can now
- Describe a recurring job with bounded instructions.
- Rehearse its commands and inspect the results.
- Preview a UTC schedule and review execution settings.

## Next
Try `/droid-coach demo Autonomy Level`: learn how action approvals are controlled.

## Sources
- [Automations](https://docs.factory.com/automations/overview.md), fetched 2026-11-22
- [Custom Automations](https://docs.factory.com/automations/custom.md), fetched 2026-11-22
