# Workshop plan: Harbor Systems (fictional)
Source: briefs/platform-onboarding.md · Legend: [Brief] = from the customer · [Proposed] = ours, confirm before the workshop

## Audience and goal
- [Brief] The platform engineering lead and three engineers hired this quarter.
- [Brief] Goal: new hires orient themselves in an unfamiliar repository and explain how to validate a first change.

## Factory capability
- [Proposed] **Skills.** The team captures its onboarding steps in a skill under `.factory/skills/` that any new hire can run.
- [Proposed] It answers the lead's request for a workflow future hires can repeat without the lead in the room. [Brief]

## Exercise
- [Brief] The repository holds deployment tooling and shared services, and new hires take weeks to feel comfortable in it.
- [Proposed] 1. The lead and hires write a short onboarding skill that maps the repository and lists how to validate a change. 2. One hire runs it on a small change they choose. 3. That hire explains, in their own words, which checks they would run before opening a pull request. 4. The group edits the skill where the explanation exposed a gap.
- [Proposed] Done when a hire who did not write the skill can run it and explain the validation steps.

## Independent afterwards
- [Proposed] A new hire can run the onboarding skill on a fresh change and name the checks to run before a pull request.
- [Proposed] The lead can edit one line of the skill and see the change in the next hire's session.

## Questions for the SE
1. Which validation commands does the repository have (tests, linters, builds)? The brief leaves this open.
2. Can we use the platform repository in the workshop, or do we need a smaller copy?
3. Do the three hires already have Factory accounts and access to cloud sessions?
4. How long is the workshop?
