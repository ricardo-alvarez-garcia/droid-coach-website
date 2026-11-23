# 5-minute demo: Spec Mode

Surface: Factory App · Level: Brand new · Docs fetched: 2026-11-22

## What you'll learn
Use Spec Mode, a planning-only interaction mode, to review and refine a small shipping bug fix before allowing Droid to change code.

## Setup (0:00, 30 seconds)
1. Copy the `sandbox/` folder next to this file to a scratch location, for example your Desktop.
2. In the Factory App, start a new session with that folder as the working directory, as described in the [App quickstart](https://docs.factory.com/factory-app/quickstart.md).
3. Select **Spec Mode** from the mode selector.

Prerequisite: Python must be available as `python`. Python 3.13.17 is installed for this Windows user; reopen your terminal or Factory App if needed to refresh PATH. The starter tests were verified: three pass and the threshold test intentionally fails. No installs are part of this demo.

## Steps

### Step 1 (0:30): Request a plan (60 seconds)
**Type this:**
```text
Read README.md, shipping.py, and test_shipping.py. Plan a fix:
shipping must cost 500 cents below 5000 cents and be free at or
above 5000. Keep shipping_cost(subtotal_cents) and use only Python's
standard library. Explain the bug and how python -m unittest will
verify it. Do not edit files or run commands yet.
```
**You should see:** A proposed plan identifying that exactly 5000 cents incorrectly costs 500 cents. No sandbox files change.
**What just happened:** Droid investigated using read-only planning. A spec is a concrete plan you review before implementation. [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md)

### Step 2 (1:30): Refine before approving (60 seconds)
Do not approve the first plan. Keep iterating in Spec Mode.

**Type this:**
```text
Revise the plan: negative integer subtotals must raise ValueError.
Add a test for -1 and preserve all four existing tests for
0, 4999, 5000, and 5001. No other input validation is needed.
Keep the changes inside this sandbox. Do not implement yet.
```
**You should see:** A revised plan covering the threshold fix, a negative-value guard, and five tests. Still no code edits.
**What just happened:** You changed the scope while keeping the implementation approval gate closed. [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md)

### Step 3 (2:30): Approve the scoped work (75 seconds)
**Action:** Review the revised plan, then choose the approval option to proceed with manual approvals.

**Type this:**
```text
Implement only the approved shipping changes. First run
python -m unittest to show the original failure, then make
the fix, add the negative-input test, and rerun the same command.
Do not install anything, commit, or access the network.
```
**You should see:** Implementation begins after approval. Approve only scoped edits and test commands when asked. The original four tests show one failure; the final five pass.
**What just happened:** Approval returns the session to Normal Mode. Manual approvals keep subsequent actions reviewable. [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md)

### Step 4 (3:45): Verify the outcome (75 seconds, finish 5:00)
**Type this:**
```text
Show the final changes and test result. Explain how each approved
requirement is covered. Do not change any more files.
```
**You should see:** An inclusive threshold, a ValueError guard, and five passing tests. If Python is unavailable, expect an honest blocked report, not a claimed pass.
**What just happened:** You compared the implementation against your approved spec. Spec Mode separates planning from implementation. [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md)

## Recap: you can now
- Select Spec Mode and request a bounded plan.
- Revise requirements before approving edits.
- Approve implementation and inspect its test evidence.

## Next
Try `/droid-coach demo AGENTS.md`: practice giving future sessions durable project instructions.

## Sources
- [Interaction Modes](https://docs.factory.com/autonomy-and-safety/specification-mode.md), fetched 2026-11-22
- [Factory App Quickstart](https://docs.factory.com/factory-app/quickstart.md), fetched 2026-11-22
