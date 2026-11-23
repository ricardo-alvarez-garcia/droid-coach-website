# Discovery brief: Ridgeline Analytics (fictional)

SE: Alex Morgan · Call date: 2026-11-18

## Who we spoke to
The data engineering lead. Four data engineers would attend the workshop.

## What they maintain
A Python program that reads a CSV export and produces a weekly account-usage report for the finance team.

## Current problem
The weekly report drops accounts with zero usage. Finance needs those accounts listed. A blank usage value means the data has not arrived yet, and those accounts should stay out of the report.

## What they want from the workshop
Use Droid to make a small change like this one, and verify it properly before accepting it. The lead said: "I don't want a fix I can't check."

## Open items
- They have not decided which repository we can use in the workshop. The production repository may not be allowed.
