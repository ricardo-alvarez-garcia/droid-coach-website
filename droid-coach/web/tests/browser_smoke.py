"""Visible-browser smoke checks. Uses Factory's CDP pane when available."""

import os
from pathlib import Path

from playwright.sync_api import expect, sync_playwright

BASE = "http://127.0.0.1:8000"
SCREENSHOTS = Path(__file__).resolve().parents[1] / "screenshots"


def main():
    SCREENSHOTS.mkdir(exist_ok=True)
    with sync_playwright() as playwright:
        cdp = os.getenv("AGENT_BROWSER_CDP")
        if os.getenv("FACTORY_DESKTOP_CDP_PORT") and not cdp:
            raise RuntimeError("Desktop CDP endpoint missing; refusing a separate browser.")
        owned = not cdp
        browser = (
            playwright.chromium.connect_over_cdp(cdp) if cdp
            else playwright.chromium.launch()
        )
        context = browser.contexts[0] if cdp else browser.new_context()
        pages = [p for p in context.pages if p.url.startswith(BASE)]
        page = pages[-1] if pages else context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(BASE, wait_until="networkidle")
        original_progress = page.evaluate("localStorage.getItem('droid-coach-progress-v1')")
        try:
            page.evaluate("localStorage.removeItem('droid-coach-progress-v1')")
            page.goto("about:blank")
            page.goto(BASE, wait_until="networkidle")
            if owned:
                page.set_viewport_size({"width": 1440, "height": 1000})
            expect(page.locator(".lesson-card")).to_have_count(6)
            page.get_by_role("searchbox").fill("nonexistent")
            expect(page.get_by_role("status").filter(has_text="No lessons found")).to_be_visible()
            page.get_by_role("searchbox").fill("Skills")
            expect(page.locator(".lesson-card").filter(has_text="Skills")).to_have_count(1)
            page.get_by_role("searchbox").fill("")
            page.locator('.lesson-card[href="#lesson/spec-mode"]').click()
            expect(page.get_by_role("heading", name="Spec Mode", exact=True)).to_be_visible()
            page.get_by_role("button", name="Try the five-minute practice").click()
            expect(page.get_by_role("heading", name="Ask for a bounded plan")).to_be_visible()
            page.get_by_role("button", name="Next step").click()
            expect(page.get_by_role("heading", name="Refine before approving")).to_be_visible()
            page.get_by_role("button", name="Previous").click()
            expect(page.get_by_role("heading", name="Ask for a bounded plan")).to_be_visible()
            page.get_by_role("button", name="Step 4: Check the evidence").click()
            page.get_by_role("button", name="Mark practice complete").click()
            expect(page.get_by_role("heading", name="One more tool in your toolkit.")).to_be_visible()
            page.locator("#nav-progress").click()
            expect(page.locator(".progress-row").filter(has_text="Spec Mode")).to_contain_text("Marked complete")

            # Each lesson must have working explanation and practice views.
            for slug in ("spec-mode", "agents-md", "skills", "autonomy", "automations"):
                page.goto(BASE + "/#lesson/" + slug, wait_until="networkidle")
                expect(page.locator(".prose")).to_be_visible()
                page.get_by_role("tab", name="Try it yourself").click()
                expect(page.locator(".step-dot")).to_have_count(4)
                expect(page.locator(".demo-setup")).to_contain_text("sandbox")

            page.goto(BASE + "/#coach", wait_until="networkidle")
            expect(page.locator("#chat-setup")).to_be_visible()
            expect(page.get_by_role("button", name="Ask coach")).to_be_disabled()
            page.locator("#chat-feature").select_option("skills")
            page.get_by_role("button", name="Explain this feature with a simple example.").click()
            expect(page.locator("#question")).to_have_value("Explain this feature with a simple example.")
            page.screenshot(path=str(SCREENSHOTS / "coach-setup.png"))

            # UI fixtures only, never an actual model call or fake production fallback.
            page.route("**/api/status", lambda route: route.fulfill(json={
                "chatConfigured": True, "dailyTurnLimit": 20,
            }))
            calls = []
            def chat_success(route):
                calls.append(route.request.post_data_json)
                route.fulfill(json={
                    "answer": "A **safe** answer. [Source](https://docs.factory.com/harness/skills.md)\n"
                    "<img src=x onerror=alert(1)>\n```python\nprint('hello')\n```",
                    "source": "https://docs.factory.com/harness/skills.md",
                    "fetchedAt": "2026-11-22",
                })
            page.route("**/api/chat", chat_success)
            page.goto("about:blank")
            page.goto(BASE + "/#coach", wait_until="networkidle")
            page.locator("#chat-mode").select_option("demo")
            page.locator("#question").fill("Show me a safe demo.")
            page.get_by_role("button", name="Ask coach").click()
            expect(page.locator(".chat-entry.assistant")).to_contain_text("A safe answer.")
            expect(page.locator(".chat-entry.assistant img")).to_have_count(0)
            expect(page.get_by_role("button", name="Download demo .md")).to_be_visible()
            self_contained = calls[-1]
            assert self_contained["mode"] == "demo"
            assert self_contained["experience"] == "beginner"
            page.locator("#question").fill("Can you explain that again?")
            page.get_by_role("button", name="Ask coach").click()
            expect(page.locator(".chat-entry.assistant")).to_have_count(2)
            assert len(calls[-1]["history"]) == 2
            page.locator("#chat-feature").select_option("agents-md")
            expect(page.locator(".chat-entry")).to_have_count(0)
            page.unroute("**/api/chat", chat_success)
            page.route("**/api/chat", lambda route: route.fulfill(status=429, json={
                "detail": "Chat limit reached. Please try again later.",
            }))
            page.locator("#question").fill("Explain the limits.")
            page.get_by_role("button", name="Ask coach").click()
            expect(page.locator(".chat-error")).to_contain_text("Chat limit reached")
            expect(page.get_by_role("button", name="Ask coach")).to_be_enabled()
            page.unroute("**/api/chat")
            page.unroute("**/api/status")

            # Responsive layout, including cards and the chat composer.
            page.goto(BASE, wait_until="networkidle")
            if owned:
                page.set_viewport_size({"width": 390, "height": 844})
                mobile = page
            else:
                # The desktop pane owns its viewport and rejects device emulation.
                # Render the real entry-point HTML in a 390px same-origin srcdoc preview.
                html = page.request.get(BASE).text()
                page.evaluate(
                    """html => {
                        const preview = document.createElement('iframe');
                        preview.id = 'responsive-preview';
                        preview.width = '390';
                        preview.height = '844';
                        preview.srcdoc = html;
                        document.body.prepend(preview);
                    }""", html,
                )
                mobile = page.frame_locator("#responsive-preview")
            expect(mobile.locator("#nav-library")).to_be_visible()
            expect(mobile.locator(".lesson-card")).to_have_count(6)
            assert mobile.locator("html").evaluate(
                "el => el.scrollWidth <= el.ownerDocument.defaultView.innerWidth"
            ), "Mobile library overflow"
            if owned:
                page.screenshot(path=str(SCREENSHOTS / "mobile.png"), full_page=True)
            else:
                page.locator("#responsive-preview").screenshot(path=str(SCREENSHOTS / "mobile.png"))
            mobile.locator("html").evaluate("el => { el.ownerDocument.defaultView.location.hash = 'coach'; }")
            expect(mobile.locator("#question")).to_be_attached()
            assert mobile.locator("html").evaluate(
                "el => el.scrollWidth <= el.ownerDocument.defaultView.innerWidth"
            ), "Mobile chat overflow"
            assert not errors, errors
            print("PASS: library search, five lessons, step navigation, completion, progress, setup state,")
            print("chat fixtures, conversation isolation, safe rendering, API errors, and mobile layouts.")
        finally:
            if page.is_closed():
                if owned:
                    browser.close()
                return
            page.unroute("**/api/status")
            page.unroute("**/api/chat")
            page.evaluate(
                """value => {
                    if (value === null) localStorage.removeItem('droid-coach-progress-v1');
                    else localStorage.setItem('droid-coach-progress-v1', value);
                }""",
                original_progress,
            )
            page.locator("#responsive-preview").evaluate_all("nodes => nodes.forEach(node => node.remove())")
            if owned:
                page.set_viewport_size({"width": 1440, "height": 1000})
            page.goto(BASE, wait_until="networkidle")
            page.screenshot(path=str(SCREENSHOTS / "desktop.png"))
            if owned:
                browser.close()


if __name__ == "__main__":
    main()
