"use strict";

const icons = {
  plan: '<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M9 2v4m6-4v4M8 11h8M8 15h5"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8m-8 4h5"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
  shield: '<path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6z"/><path d="m8 12 3 3 5-6"/>',
  repeat: '<path d="M20 7H7a4 4 0 0 0-4 4m17-4-4-4m4 4-4 4M4 17h13a4 4 0 0 0 4-4M4 17l4-4m-4 4 4 4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.spark}</svg>`;
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
}[c]));
const main = document.querySelector("#main");
const state = {
  lessons: [], status: null, tab: "explain", feature: "spec-mode", mode: "explain",
  experience: "beginner", language: "python", history: [], entries: [], pending: false,
  progress: {}, step: 0,
};
try {
  const saved = JSON.parse(localStorage.getItem("droid-coach-progress-v1") || "{}");
  if (saved && typeof saved === "object" && !Array.isArray(saved)) state.progress = saved;
} catch { /* Lessons work without browser storage. */ }

let toastTimer;
function toast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { node.hidden = true; }, 3500);
}
function saveProgress() {
  try { localStorage.setItem("droid-coach-progress-v1", JSON.stringify(state.progress)); }
  catch { toast("Progress could not be saved in this browser."); }
}
function progress(id) {
  const record = Object.hasOwn(state.progress, id) ? state.progress[id] : null;
  return {
    step: Number.isInteger(record?.step) ? Math.min(3, Math.max(0, record.step)) : 0,
    done: record?.done === true,
  };
}
async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const previous = button.textContent;
    button.textContent = "Copied";
    setTimeout(() => { if (button.isConnected) button.textContent = previous; }, 1800);
    toast("Copied. Paste this into your Factory session.");
  } catch { toast("Copy unavailable. Select and copy the prompt text instead."); }
}
function promptBlock(text) {
  return `<div class="prompt-block"><div class="prompt-top"><span>TRY THIS IN FACTORY</span>
    <button class="small-button copy-prompt" type="button">Copy prompt</button></div>
    <pre>${escapeHTML(text)}</pre></div>`;
}
function wireCopies() {
  main.querySelectorAll(".copy-prompt").forEach(button => {
    button.addEventListener("click", () => copyText(button.closest(".prompt-block").querySelector("pre").textContent, button));
  });
}
function sourceNote(lesson) {
  return `<div class="source-note">Source: <a href="${escapeHTML(lesson.source)}" target="_blank" rel="noopener noreferrer">Official Factory docs ↗</a><br>
    Lesson reviewed ${escapeHTML(lesson.reviewedAt || "November 22, 2026")}. Saved lessons may lag the docs; live chat fetches its source when asked.</div>`;
}
const LEVEL_LABELS = { basic: "Basic", intermediate: "Intermediate", advanced: "Advanced" };
const levelLabel = lesson => LEVEL_LABELS[lesson.level] || LEVEL_LABELS.basic;
function card(lesson) {
  const done = progress(lesson.id).done;
  return `<a class="lesson-card" href="#lesson/${lesson.id}">
    <div class="card-top"><span class="icon-box">${icon(lesson.icon)}</span><span class="card-category">${levelLabel(lesson)}</span></div>
    <h3>${escapeHTML(lesson.title)}</h3><p>${escapeHTML(lesson.description)}</p>
    <div class="card-footer"><span>${icon(done ? "check" : "clock")}${done ? "Practice completed" : "5-minute practice"}</span><span class="card-arrow" aria-hidden="true">↗</span></div></a>`;
}
function library() {
  document.querySelector("#breadcrumb").textContent = "Your learning space / Explore";
  main.innerHTML = `<section class="hero" aria-labelledby="welcome-title"><div>
    <div class="eyebrow">A LITTLE GUIDANCE GOES A LONG WAY</div>
    <h1 id="welcome-title">Meet Droid.<br>Find your <em>flow.</em></h1>
    <p>Your friendly guide to working with Factory Droid. Pick up a new skill, try a five-minute demo, and make it your own.</p>
    <div class="hero-actions"><a class="primary" href="#lesson/spec-mode">Find your first lesson <span aria-hidden="true">↗</span></a>
    <a class="text-button" href="#coach">Or, ask your coach <span aria-hidden="true">→</span></a></div></div>
    <div class="hero-art" aria-hidden="true"><div class="orbit"></div><div class="orbit second"></div>
    <div class="art-core">${icon("spark")}<small>LEARN · TRY · GROW</small></div>
    <div class="art-tag one">${icon("check")} A clear next step</div><div class="art-tag two">${icon("plan")} Built around you</div><span class="art-plus">✳</span></div></section>
    <div class="trust-strip"><span>${icon("file")} Official documentation</span><span>${icon("clock")} Five minutes at a time</span><span>${icon("shield")} Safe practice projects</span></div>
    <section aria-labelledby="lessons-title"><div class="section-heading"><div><h2 id="lessons-title">What would you like to learn?</h2><p>No wrong starting point. Follow your curiosity.</p></div>
    <label class="search-wrap">${icon("search")}<input type="search" id="lesson-search" aria-label="Search lessons" placeholder="Find a lesson…" autocomplete="off"></label></div>
    <div class="cards" id="lesson-cards"></div></section>`;
  const renderCards = query => {
    const matches = state.lessons.filter(l => `${l.title} ${l.description} ${l.category} ${l.level}`.toLowerCase().includes(query.toLowerCase()));
    document.querySelector("#lesson-cards").innerHTML = matches.length
      ? matches.map(card).join("") + `<a href="#coach" class="lesson-card coach-card"><div class="card-top"><span class="icon-box">${icon("spark")}</span><span class="card-category">YOUR OWN PATH</span></div><h3>A question of<br>your own?</h3><p>Let’s work through it together, one useful step at a time.</p><div class="card-footer"><span>Meet your AI coach</span><span class="card-arrow" aria-hidden="true">↗</span></div></a>`
      : '<div class="empty-state" role="status">No lessons found. Try “Skills” or “planning”.</div>';
  };
  renderCards("");
  document.querySelector("#lesson-search").addEventListener("input", event => renderCards(event.target.value));
}
function lessonPage(id) {
  const lesson = state.lessons.find(l => l.id === id);
  if (!lesson) { location.hash = "library"; return; }
  document.querySelector("#breadcrumb").textContent = `Your learning space / ${lesson.title}`;
  main.innerHTML = `<a class="back-link" href="#library">← All lessons</a>
    <div class="lesson-header"><div class="eyebrow">${escapeHTML(lesson.category)}</div><h1>${escapeHTML(lesson.title)}</h1>
    <p>${escapeHTML(lesson.tagline)}</p><div class="lesson-meta"><span class="pill">${levelLabel(lesson)}</span><span>Factory App</span><span>5-minute practice</span></div></div>
    <div class="tabs" role="tablist" aria-label="Lesson format"><button role="tab" id="explain-tab" class="tab ${state.tab === "explain" ? "active" : ""}" aria-selected="${state.tab === "explain"}" aria-controls="lesson-content">Understand it</button>
    <button role="tab" id="practice-tab" class="tab ${state.tab === "demo" ? "active" : ""}" aria-selected="${state.tab === "demo"}" aria-controls="lesson-content">Try it yourself</button></div>
    <div class="lesson-layout"><section class="panel" id="lesson-content" role="tabpanel" aria-labelledby="${state.tab === "demo" ? "practice-tab" : "explain-tab"}"></section>
    <aside class="lesson-aside panel"><h2 class="small-heading">YOU’LL WALK AWAY WITH</h2><ul class="takeaways">${lesson.takeaways.map(t => `<li>${escapeHTML(t)}</li>`).join("")}</ul>
    <p>Take your time. Practice happens in a disposable folder in Factory, never on this website.</p>
    <a class="secondary" href="/api/sandbox" download>Download sandbox ↓</a><button class="primary" id="ask-about" type="button">Ask about this ${icon("spark")}</button></aside></div>`;
  document.querySelector("#explain-tab").onclick = () => { state.tab = "explain"; lessonPage(id); document.querySelector("#explain-tab").focus(); };
  document.querySelector("#practice-tab").onclick = () => { state.tab = "demo"; state.step = progress(id).step; lessonPage(id); document.querySelector("#practice-tab").focus(); };
  document.querySelector("#ask-about").onclick = () => { state.feature = id; clearChat(); location.hash = "coach"; };
  const content = document.querySelector("#lesson-content");
  if (state.tab === "explain") {
    content.innerHTML = `<h2 class="small-heading">THE SHORT VERSION</h2><div class="prose">${lesson.explanation.split("\n").map(p => `<p>${escapeHTML(p)}</p>`).join("")}</div>
      ${sourceNote(lesson)}<h2 class="small-heading follow-heading">MAKE IT CONCRETE</h2>${promptBlock(lesson.starter)}
      <button class="primary" id="begin-practice" type="button">Try the five-minute practice →</button>`;
    document.querySelector("#begin-practice").onclick = () => { state.tab = "demo"; state.step = progress(id).step; lessonPage(id); };
  } else {
    renderStep(lesson);
  }
  wireCopies();
}
function renderStep(lesson) {
  const content = document.querySelector("#lesson-content");
  const step = lesson.steps[state.step];
  content.innerHTML = `<div class="demo-setup"><strong>First, a safe place to practice.</strong><br>${escapeHTML(lesson.setup)}
    <br><a href="/api/sandbox" download>Download the practice sandbox ↓</a><br>Setup: 0:00–0:30. The website does not run code on your computer.</div>
    <div class="stepper" aria-label="Practice steps">${lesson.steps.map((s, i) => `<button type="button" class="step-dot ${i === state.step ? "active" : i < state.step ? "done" : ""}" aria-label="Step ${i + 1}: ${escapeHTML(s.title)}" ${i === state.step ? 'aria-current="step"' : ""} data-step="${i}">${i + 1}</button>`).join("")}</div>
    <p class="step-caption">STEP ${state.step + 1} OF 4 · START AT ${step.time}</p><h2 class="step-title">${escapeHTML(step.title)}</h2>
    ${promptBlock(step.prompt)}<div class="expected"><strong>What you should see</strong>${escapeHTML(step.outcome)}</div>
    <div class="source-note">Why this works: <a href="${escapeHTML(lesson.source)}" target="_blank" rel="noopener noreferrer">Read the official ${escapeHTML(lesson.title)} guide ↗</a></div>
    <div class="step-actions"><button type="button" class="secondary" id="previous-step" ${state.step === 0 ? "disabled" : ""}>← Previous</button>
    <button type="button" class="primary" id="next-step">${state.step === 3 ? "Mark practice complete" : "Next step →"}</button></div>`;
  const setStep = index => {
    state.step = index;
    state.progress[lesson.id] = { step: index, done: progress(lesson.id).done };
    saveProgress(); renderStep(lesson); wireCopies();
  };
  content.querySelectorAll("[data-step]").forEach(button => { button.onclick = () => setStep(Number(button.dataset.step)); });
  document.querySelector("#previous-step").onclick = () => setStep(state.step - 1);
  document.querySelector("#next-step").onclick = () => {
    if (state.step < 3) { setStep(state.step + 1); return; }
    state.progress[lesson.id] = { step: 3, done: true }; saveProgress();
    content.innerHTML = `<div class="complete-panel">${icon("check")}<h2>One more tool in your toolkit.</h2><p>You marked this practice complete.<br>Your progress stays in this browser, not on a server.</p>
      <a class="primary" href="#library">Find your next lesson →</a></div>`;
    toast("Practice marked complete.");
  };
}
function clearChat() {
  if (state.pending) return;
  state.history = []; state.entries = [];
}
function coach() {
  document.querySelector("#breadcrumb").textContent = "Your learning space / Your coach";
  main.innerHTML = `<div class="lesson-header"><div class="eyebrow">A LITTLE HELP, RIGHT WHEN YOU NEED IT</div>
    <h1>A question is a <em>good start.</em></h1><p>Ask about a feature, untangle a concept, or plan a tiny practice project.</p></div>
    <div class="chat-layout"><div><section class="chat-window" aria-label="Coach conversation">
    <div class="chat-top"><span class="icon-box">${icon("spark")}</span><div>Droid Coach<small>Grounded in official Factory documentation</small></div><button type="button" id="new-chat" class="small-button" ${state.pending ? "disabled" : ""}>New chat</button></div>
    <div id="chat-messages" class="chat-messages" role="log" aria-label="Conversation" aria-live="polite"></div>
    <form id="chat-form" class="chat-composer"><label class="sr-only" for="question">Your question</label><textarea id="question" placeholder="What would you like to understand?" maxlength="2000" rows="2" required ${state.pending ? "disabled" : ""}></textarea>
    <div class="compose-bottom"><small>Don’t share secrets or personal information.</small><button class="primary" id="send-message" type="submit" ${!state.status.chatConfigured || state.pending ? "disabled" : ""}>${state.pending ? "Thinking…" : "Ask coach ↗"}</button></div></form></section>
    <div class="privacy-note">Live questions and recent conversation context are sent to Factory using the site owner’s account. This site does not store chats; Factory retains its sessions under the owner’s account. The coach cannot edit files, run commands, or activate automations.</div></div>
    <aside class="panel chat-options"><h2 class="small-heading">MAKE IT YOURS</h2>
    <div class="field"><label for="chat-feature">What are we learning?</label><select id="chat-feature" ${state.pending ? "disabled" : ""}>${state.lessons.map(l => `<option value="${l.id}" ${state.feature === l.id ? "selected" : ""}>${escapeHTML(l.title)}</option>`).join("")}</select></div>
    <div class="field"><label for="chat-mode">How would you like to learn?</label><select id="chat-mode" ${state.pending ? "disabled" : ""}><option value="explain" ${state.mode === "explain" ? "selected" : ""}>A short explanation</option><option value="demo" ${state.mode === "demo" ? "selected" : ""}>A five-minute demo</option></select></div>
    <div class="field"><label for="chat-experience">Your experience</label><select id="chat-experience" ${state.pending ? "disabled" : ""}><option value="beginner" ${state.experience === "beginner" ? "selected" : ""}>Brand new to Droid</option><option value="familiar" ${state.experience === "familiar" ? "selected" : ""}>Used it a few times</option><option value="advanced" ${state.experience === "advanced" ? "selected" : ""}>Comfortable, go deeper</option></select></div>
    <div class="field"><label for="chat-language">Practice language</label><select id="chat-language" ${state.pending ? "disabled" : ""}><option value="python" ${state.language === "python" ? "selected" : ""}>Python</option><option value="typescript" ${state.language === "typescript" ? "selected" : ""}>TypeScript</option><option value="markdown" ${state.language === "markdown" ? "selected" : ""}>No code / Markdown</option></select></div>
    <p>Live chat checks the docs index on each turn. Feature pages may be cached for up to five minutes. If docs are unreachable, it won’t guess.</p>
    <p>Public chat is limited to ${state.status.dailyTurnLimit} requests per UTC day across all visitors. Requests can consume Factory credits.</p></aside></div>`;
  if (!state.status.chatConfigured) {
    const banner = document.createElement("div");
    banner.className = "notice"; banner.id = "chat-setup";
    banner.textContent = "Live chat setup required. The site owner needs to configure a Factory API key and dedicated computer on the server. Guided lessons and practice downloads work now.";
    document.querySelector(".chat-layout").before(banner);
  }
  renderMessages();
  for (const [id, key] of [["chat-feature", "feature"], ["chat-mode", "mode"], ["chat-experience", "experience"], ["chat-language", "language"]]) {
    document.getElementById(id).onchange = event => {
      state[key] = event.target.value;
      clearChat(); renderMessages();
    };
  }
  document.querySelector("#new-chat").onclick = () => { clearChat(); renderMessages(); document.querySelector("#question").focus(); };
  document.querySelector("#chat-form").onsubmit = sendMessage;
  document.querySelector("#question").onkeydown = event => {
    if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
      event.preventDefault();
      if (!state.pending && state.status.chatConfigured) document.querySelector("#chat-form").requestSubmit();
    }
  };
}
function appendMarkdown(container, text) {
  // Render a small safe subset. Model output is never passed to innerHTML.
  function inline(target, value) {
    const regex = /(\[([^\]]+)\]\((https:\/\/[^\s)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g;
    let cursor = 0, match;
    while ((match = regex.exec(value))) {
      target.append(document.createTextNode(value.slice(cursor, match.index)));
      if (match[2]) {
        let allowed = false;
        try { const u = new URL(match[3]); allowed = u.origin === "https://docs.factory.com"; } catch {}
        if (allowed) {
          const a = document.createElement("a"); a.textContent = match[2]; a.href = match[3];
          a.target = "_blank"; a.rel = "noopener noreferrer"; target.append(a);
        } else { target.append(document.createTextNode(match[2])); }
      } else {
        const node = document.createElement(match[4] ? "code" : "strong");
        node.textContent = match[4] || match[5]; target.append(node);
      }
      cursor = regex.lastIndex;
    }
    target.append(document.createTextNode(value.slice(cursor)));
  }
  const blocks = text.split(/```[^\n]*\n([\s\S]*?)```/g);
  blocks.forEach((block, i) => {
    if (i % 2) {
      const pre = document.createElement("pre"); const code = document.createElement("code");
      code.textContent = block; pre.append(code); container.append(pre);
    } else { inline(container, block); }
  });
}
function downloadText(text, filename) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = filename;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function renderMessages() {
  const log = document.querySelector("#chat-messages");
  if (!log) return;
  log.replaceChildren();
  if (!state.entries.length) {
    log.innerHTML = `<div class="chat-welcome"><span class="icon-box">${icon("spark")}</span><h2>Let’s make it click.</h2><p>There are no obvious questions. Choose a topic on the side and ask away.</p>
      <div class="suggestions"><button type="button" class="suggestion">Explain this feature with a simple example.</button>
      <button type="button" class="suggestion">When would I use this in my day-to-day work?</button>
      <button type="button" class="suggestion">Walk me through a safe five-minute practice.</button></div></div>`;
    log.querySelectorAll(".suggestion").forEach(button => {
      button.onclick = () => { const input = document.querySelector("#question"); input.value = button.textContent; input.focus(); };
    });
  }
  state.entries.forEach(entry => {
    const node = document.createElement("div");
    node.className = "chat-entry " + entry.role;
    const label = document.createElement("div"); label.className = "message-label";
    label.textContent = entry.role === "user" ? "You" : "Droid Coach"; node.append(label);
    const content = document.createElement("div"); content.className = entry.error ? "chat-error" : "message-text";
    if (entry.role === "assistant" && !entry.error) appendMarkdown(content, entry.text);
    else content.textContent = entry.text;
    node.append(content);
    if (entry.source) {
      const footer = document.createElement("div"); footer.className = "message-source";
      const link = document.createElement("a"); link.textContent = "Official source ↗"; link.href = entry.source;
      link.target = "_blank"; link.rel = "noopener noreferrer"; footer.append(link);
      if (entry.demo) {
        const button = document.createElement("button"); button.type = "button"; button.className = "small-button";
        button.textContent = "Download demo .md";
        button.onclick = () => downloadText(entry.text, `${entry.feature}-demo.md`); footer.append(button);
      }
      node.append(footer);
    }
    log.append(node);
  });
  if (state.pending) {
    const pending = document.createElement("div"); pending.className = "chat-entry";
    pending.textContent = "Checking the docs and thinking it through…"; pending.setAttribute("role", "status"); log.append(pending);
  }
  log.scrollTop = log.scrollHeight;
}
async function sendMessage(event) {
  event.preventDefault();
  if (state.pending || !state.status.chatConfigured) return;
  const input = document.querySelector("#question");
  const text = input.value.trim();
  if (!text) return;
  const payload = { feature: state.feature, mode: state.mode, experience: state.experience, language: state.language, history: state.history.slice(-8), message: text };
  state.entries.push({ role: "user", text }); state.pending = true; coach();
  try {
    const response = await fetch("/api/chat", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : "The coach could not answer. Please try again.");
    state.entries.push({ role: "assistant", text: data.answer, source: data.source, feature: payload.feature, demo: payload.mode === "demo" });
    state.history.push({ role: "user", content: text }, { role: "assistant", content: data.answer.slice(0, 4000) });
    state.history = state.history.slice(-8);
    while (state.history.reduce((sum, m) => sum + m.content.length, 0) > 9000) state.history.splice(0, 2);
  } catch (error) {
    state.entries.push({ role: "assistant", text: error.message || "Connection lost. Please try again.", error: true });
  } finally {
    state.pending = false;
    if (location.hash.replace(/^#/, "") === "coach") { coach(); document.querySelector("#question").focus(); }
  }
}
function progressPage() {
  document.querySelector("#breadcrumb").textContent = "Your learning space / Progress";
  const completed = state.lessons.filter(l => progress(l.id).done).length;
  main.innerHTML = `<div class="lesson-header"><div class="eyebrow">YOUR OWN PACE IS THE RIGHT PACE</div><h1>Look how far<br>you’ve <em>come.</em></h1><p>Practice completion is self-reported and saved only in this browser.</p></div>
    <div class="progress-summary"><div class="progress-stat"><strong>${completed}</strong><span>practices completed</span></div><div class="progress-stat"><strong>${state.lessons.length - completed}</strong><span>still to explore</span></div></div>
    <div class="progress-list">${state.lessons.map(l => `<div class="progress-row"><span class="icon-box">${icon(progress(l.id).done ? "check" : l.icon)}</span><div><h2>${escapeHTML(l.title)}</h2><p>${progress(l.id).done ? "Marked complete" : "A five-minute practice awaits"}</p></div><a class="${progress(l.id).done ? "secondary" : "primary"}" href="#lesson/${l.id}">${progress(l.id).done ? "Revisit" : "Explore"} →</a></div>`).join("")}</div>`;
}
function route() {
  if (!state.lessons.length) return;
  const hash = location.hash.slice(1) || "library";
  document.querySelectorAll(".nav-item").forEach(a => {
    const active = a.hash === "#" + (hash.startsWith("lesson/") ? "library" : hash);
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  if (hash.startsWith("lesson/")) {
    state.tab = "explain"; state.step = progress(hash.split("/")[1]).step;
    lessonPage(hash.split("/")[1]);
  } else if (hash === "coach") coach();
  else if (hash === "progress") progressPage();
  else library();
  window.scrollTo(0, 0);
}
async function boot() {
  try {
    const responses = await Promise.all([fetch("/api/lessons"), fetch("/api/status")]);
    if (responses.some(r => !r.ok)) throw new Error("Could not load the learning space.");
    [state.lessons, state.status] = await Promise.all(responses.map(r => r.json()));
    route();
  } catch {
    main.innerHTML = '<div class="empty-state" role="alert">We couldn’t load your learning space. Refresh the page to try again.</div>';
  }
}
window.addEventListener("hashchange", route);
boot();
