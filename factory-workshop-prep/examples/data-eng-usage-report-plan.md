# Workshop plan: Ridgeline Analytics (fictional)
Source: briefs/data-eng-usage-report.md · Legend: [Brief] = from the customer · [Proposed] = ours, confirm before the workshop

## Audience and goal
- [Brief] Four data engineers who maintain a Python weekly account-usage report for finance.
- [Brief] Goal: use Droid to make a small change and verify it before accepting it.

## Factory capability
- [Proposed] **Spec Mode.** Droid reads the code and proposes a plan, and the team approves it before anything changes.
- [Proposed] It answers the lead's concern: "I don't want a fix I can't check." [Brief]

## Exercise
- [Brief] The report drops accounts with zero usage. A blank means the data has not arrived yet and must stay excluded.
- [Proposed] 1. Give Droid the bug in Spec Mode. 2. Check that the plan treats 0 and blank differently. 3. Approve a regression test covering a normal, a zero and a blank account, and see it fail. 4. Apply the fix and review the diff and test output together.
- [Proposed] Done when the test fails before the fix, passes after it, and blank accounts are still excluded.

## Independent afterwards
- [Proposed] Each engineer can take a small ticket into Spec Mode and ask for a regression test that fails first.
- [Proposed] Each engineer can read the diff and test output and say what the test proves before accepting a change.

## Questions for the SE
1. Which repository can we use: theirs, or a synthetic copy of the report? The brief leaves this open.
2. Which test runner do they use (for example pytest or unittest)?
3. Do the four engineers already have Factory accounts and access to cloud sessions?
4. How long is the workshop?
