# Sandbox guidelines

The sandbox is a tiny practice project that exists only to make the feature visible. It lives in `demos/<feature-slug>/sandbox/`.

1. **Five files or fewer**, including its `README.md`. Every file must be used by at least one step.
2. **`README.md` first.** Two to four lines: what the project pretends to be and that it is a practice sandbox for the demo.
3. **Seed the moment.** Give the feature something real to act on: a small bug for planning or review features, a missing convention for AGENTS.md, a repeated chore for skills or custom droids, a risky command for hooks or autonomy.
4. **Runs with nothing installed.** For Python, use only the standard library and `unittest` (run with `python -m unittest`). For TypeScript, avoid dependencies; prefer plain Node scripts. For "no code", use Markdown, JSON, or YAML only.
5. **No secrets, real customer data, network calls, or package installs.** Use fictional names.
6. **Factory files are part of the lesson.** If the feature uses files such as `.factory/skills/<name>/SKILL.md`, `.factory/droids/<name>.md`, or `AGENTS.md`, either include a starter version the steps use, or leave it out on purpose because a step has Droid create it. Follow the format on the docs page you fetched.
7. **Check it before you finish.** Re-read each step and confirm every file, function, and command it mentions exists in the sandbox with that exact name.
