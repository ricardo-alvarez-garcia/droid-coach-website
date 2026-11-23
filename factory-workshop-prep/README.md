# factory-workshop-prep

A small demo of a repository-scoped Factory skill. `/prepare-workshop` turns an SE's Markdown discovery brief into a one-page workshop plan, applying the same preparation standards to every customer.

## How it works

1. An SE writes a discovery brief after a customer call.
2. The SE runs `/prepare-workshop` with the brief's path in a Droid session on this repository.
3. Droid follows the standards in the skill and writes a plan to `plans/<brief-name>-plan.md`. The plan names the audience and goal, one Factory capability, one exercise, and what attendees can do independently afterwards. It also lists questions for the SE. Every bullet is tagged **[Brief]** (stated by the customer) or **[Proposed]** (our suggestion).

## What's in this repository

| File | Purpose |
| --- | --- |
| [The skill: `.factory/skills/prepare-workshop/SKILL.md`](.factory/skills/prepare-workshop/SKILL.md) | The team's preparation standards, capability list and plan template |
| [Brief 1: Ridgeline Analytics](briefs/data-eng-usage-report.md) | Data engineering team fixing a weekly usage report |
| [Brief 2: Harbor Systems](briefs/platform-onboarding.md) | Platform team onboarding new hires |
| [Example plan for brief 1](examples/data-eng-usage-report-plan.md) | Reference output |
| [Example plan for brief 2](examples/platform-onboarding-plan.md) | Reference output |

All customers and people in the briefs are fictional.

## Try it

1. In Factory, open **Settings → Environments → New environment**. Choose **Only me**, add this repository, leave the setup scripts empty, and create it. Wait until the build is **Ready**.
2. Start a new session in the Factory App and pick that Environment as the computer.
3. Run one of these:

```
/prepare-workshop briefs/data-eng-usage-report.md
```

```
/prepare-workshop briefs/platform-onboarding.md
```

4. Open the new file in `plans/` and compare it with the matching file in `examples/`.

Your Factory GitHub connection needs access to this repository. If the repository is private, ask the owner to add you as a collaborator.

## Adapt it

All the standards live in one file. To change how every future plan is prepared, edit the **Standards** or **Capabilities** section of the [skill](.factory/skills/prepare-workshop/SKILL.md), then start a new session and run the invocation again.
