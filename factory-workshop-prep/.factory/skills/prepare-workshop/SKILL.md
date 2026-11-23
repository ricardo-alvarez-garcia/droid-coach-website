---
name: prepare-workshop
description: Turn a Markdown customer discovery brief into a one-page Factory workshop plan. Use when an SE runs /prepare-workshop with the path to a brief.
disable-model-invocation: true
---

# Prepare workshop

Input: the path to a Markdown discovery brief.
Output: `plans/<brief-file-name>-plan.md`, then a three-line summary in chat.

## Standards
1. Read only the brief. Every customer detail in the plan must come from it.
2. Tag every bullet outside "Questions for the SE" as **[Brief]** (stated in the brief) or **[Proposed]** (our suggestion). An inference is [Proposed].
3. Choose exactly one capability from the list below and name the brief detail it answers.
4. Describe one hands-on exercise that the customer's own engineers carry out.
5. Describe what attendees can do independently afterwards as actions someone could observe.
6. List anything missing that would change the plan under "Questions for the SE". Do not guess, and do not ask in chat; the plan carries the questions.
7. Fit on one page: 350 words or fewer.

## Capabilities
- Spec Mode: Droid proposes a plan for review before it edits code.
- Skills: a reusable team workflow in `.factory/skills/`.
- AGENTS.md: always-on repository instructions, commands and conventions.
- Custom droids: a specialised subagent with its own prompt and tool policy.
- Hooks: deterministic checks that run at Droid lifecycle events.

## Plan template

```markdown
# Workshop plan: <customer>
Source: <brief path> · Legend: [Brief] = from the customer · [Proposed] = ours, confirm before the workshop

## Audience and goal
## Factory capability
## Exercise
## Independent afterwards
## Questions for the SE
```
