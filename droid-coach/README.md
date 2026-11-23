# droid-coach

A repository-scoped Factory skill that coaches new users on Droid. `/droid-coach` answers questions about Droid features using the **live** Factory documentation, and generates 5-minute hands-on demos for one feature at a time, written for the Factory App.

## How it works

1. Every run starts by fetching the Factory docs index (`https://docs.factory.com/llms.txt`), then the specific pages it needs. It never answers from memory, so new features and renamed settings are picked up as soon as the docs change.
2. **Explain mode** (`/droid-coach how do hooks work?`): a short answer, one example, and a link for every claim.
3. **Demo mode** (`/droid-coach demo spec mode`): Droid asks your experience level and sandbox language, then writes:
   - `demos/<feature>/demo.md`: a timed script (setup, three to five steps with the exact text to type, what you should see, recap, next feature, sources).
   - `demos/<feature>/sandbox/`: a tiny practice project (five files or fewer, nothing to install) that makes the feature visible.
4. Run `/droid-coach` with nothing after it to pick from a menu of beginner features.

## What's in this repository

| File | Purpose |
| --- | --- |
| [`.factory/skills/droid-coach/SKILL.md`](.factory/skills/droid-coach/SKILL.md) | The coach workflow and standards |
| [`.factory/skills/droid-coach/demo-template.md`](.factory/skills/droid-coach/demo-template.md) | The fixed structure every demo follows |
| [`.factory/skills/droid-coach/sandbox-guidelines.md`](.factory/skills/droid-coach/sandbox-guidelines.md) | Rules for the practice projects |
| [`examples/spec-mode/`](examples/spec-mode/demo.md) | Reference demo: plan a bug fix before Droid edits code |
| [`examples/skills/`](examples/skills/demo.md) | Reference demo: run, trigger, and edit a team skill |

## Try it

1. Open this folder in a Factory App session (or push it to GitHub and use it from an Environment, like `factory-workshop-prep`).
2. Run one of these:

```
/droid-coach demo spec mode
```

```
/droid-coach what is the difference between a skill and a custom droid?
```

3. Open the new folder in `demos/` and compare it with the matching one in `examples/`.
4. To take a demo, copy its `sandbox/` folder somewhere disposable, start a new session there, and follow `demo.md`.

The coach needs network access to the Factory docs. If the docs cannot be reached, it says so instead of guessing.

## Website

`web/` is a public learning site with five guided lessons (Spec Mode, AGENTS.md, Skills, Autonomy Level, Automations), a downloadable practice sandbox, saved progress in the visitor's browser, and an optional live AI coach backed by Factory Droid.

### Run it locally (Windows PowerShell)

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn web.server:app --host 127.0.0.1 --port 8000
```

Open http://127.0.0.1:8000. Lessons work without any credentials. The **Ask your coach** page shows a setup notice until live chat is configured.

### Enable live chat

Live chat uses the [Droid Sessions API](https://docs.factory.com/api-reference/sessions.md) and the [Execute API](https://docs.factory.com/api-reference/droid.md). The Sessions API is enabled for selected organizations only, so check access first. Set these **on the server only** (see `.env.example`; the app does not load `.env` files):

| Variable | Purpose |
| --- | --- |
| `FACTORY_API_KEY` | Factory API key. Never put it in frontend code or commit it. |
| `FACTORY_COMPUTER_ID` | A dedicated, empty [Droid Computer](https://docs.factory.com/droid-computers/overview.md) used only by this site. |
| `COACH_PUBLIC_ORIGIN` | Public origin, for example `https://coach.example.com`. Chat requests from other origins are rejected. |
| `COACH_DAILY_TURNS`, `COACH_HOURLY_TURNS_PER_IP` | Spending limits (defaults 20 per day, 6 per visitor per hour). |
| `COACH_TURN_TIMEOUT` | Seconds before a turn is stopped (default 120). |
| `COACH_ALLOW_UNVERIFIED_POLICY` | Set to `1` to allow chat when Factory does not report the session's tool and autonomy settings back. Settings that contradict the request still block chat. Off by default. |
| `COACH_DATABASE` | SQLite file for the usage limits. Put it on persistent storage. |

Each question creates a session with no tools and autonomy off, sends the live docs page for the lesson, and interrupts the session on errors or timeouts. Every question uses Factory credits on the key owner's account.

### Deploy

1. Build the image: `docker build -t droid-coach .`
2. Run it on a container host with HTTPS in front (for example Fly.io, Render, Railway, or Azure Container Apps), mapping port 8000 and a persistent volume to `/app/web/data`.
3. Set the variables above in the host's secret manager, then open the site and ask one question to confirm API access.
4. The server ignores `X-Forwarded-For`, so per-visitor limits use the proxy's address if your host does not pass the client address through. Keep the daily limit low, because anyone can use a public site.

### Tests

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.\.venv\Scripts\python.exe -m unittest discover -s web/tests -v
.\.venv\Scripts\python.exe web\tests\browser_smoke.py   # needs the local server running
```

## Adapt it

- To change what every demo looks like, edit [`demo-template.md`](.factory/skills/droid-coach/demo-template.md).
- To change tone, length, or the "Factory App first" rule, edit the **Standards** section of [`SKILL.md`](.factory/skills/droid-coach/SKILL.md).
- Start a new session after editing so Droid picks up the changes.
