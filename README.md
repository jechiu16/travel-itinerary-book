<h1 align="center">🗺️ travel-itinerary-book</h1>

<p align="center">
  <b>A Claude Code skill that turns a pile of trip notes — or nothing booked at all — into a fact-checked, mobile-first travel handbook in one self-contained HTML file.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/Claude%20Code-skill-7C3AED" alt="Claude Code skill">
  <img src="https://img.shields.io/badge/output-single--file%20HTML%20%2B%20PDF-2D4F39" alt="Single-file HTML + PDF">
  <img src="https://img.shields.io/badge/mobile-first-1C305C" alt="Mobile first">
</p>

<p align="center">
  <a href="sample/hokkaido-7day-sample.html"><img src="sample/preview.png" width="420" alt="Sample itinerary preview"></a><br>
  <sub>↑ Sample output (personal flights & hotel sanitized) — <a href="sample/hokkaido-7day-sample.html">open the full sample HTML</a></sub>
</p>

---

## Why

Most travel docs are either a wall of links you can't read on a phone, or a pretty layout that's already out of date. This skill does both jobs at once: it **verifies the facts online**, then lays them out so the **main route is always visible and the depth is one tap away**.

## ✨ What you get

- 📱 **Mobile-first, single file** — embedded CSS, Google Fonts, zero JS dependencies. AirDrop it, open it offline.
- 🧭 **Always-visible main timeline** — restaurants, history, shopping, alternatives tuck into collapsible folds.
- 🔍 **Fact-checked online** — opening hours, prices, seasonal availability, closures, relocations. Corrected *silently* (no noisy "this was wrong" boxes).
- 📅 **Verifies time-bound events first** — is there *actually* a home game / festival on that date? what's the last train back?
- 🏨 **Logistics card** — flights + hotels at a glance, every hotel linked to Google Maps.
- 🖨️ **PDF export** — one all-expanded printable artifact alongside the phone version.

## 🔀 Two modes

| You have… | The skill…|
|-----------|-----------|
| **Confirmed bookings** | verifies and presents them beautifully |
| **Nothing booked yet** | proposes a route skeleton **and** a prioritized **待訂 (to-book) checklist** — what to lock first, where, and when it sells out |

Partial trips (flights booked, hotels not) are handled element-by-element. **Nothing unbooked is ever shown as confirmed.**

## 🚀 Install

Clone into your Claude Code personal skills directory:

```bash
git clone https://github.com/jechiu16/travel-itinerary-book.git \
  ~/.claude/skills/travel-itinerary-book
```

Then in any Claude Code session:

```
/travel-itinerary-book
```

…or just say *“plan me a 5-day Kyoto trip, I like history and sake”* / *“combine these itinerary files and check the latest info.”*

## 🧱 What's inside

| File | Purpose |
|------|---------|
| [`SKILL.md`](SKILL.md) | The skill — workflow, per-day structure, voice rules, common mistakes |
| [`research-and-factcheck.md`](research-and-factcheck.md) | What each research agent must verify & return; booking-priority order |
| [`template.html`](template.html) | Full CSS + a worked example day (timeline, 3-level history fold, A/B selector, logistics card, buying section) |
| [`sample/`](sample/) | A rendered, sanitized example output + preview image |

## 🎯 The opinionated bits

- **Plain, clear Traditional Chinese** — no decorative "national-style" ornamentation.
- **History earns its fold** — cause→effect, what-to-actually-see, a real story, and who/when/where/what (nested up to 3 levels for deep-dives).
- **A/B alternatives live in a second-layer fold** — never side-by-side on the main timeline (that reads as "do both").
- **Honest priority pills** — 必留 / 條件保留 / 可加 / 可砍. It tells you what to *cut*, not just what to add.

---

<p align="center"><sub>Built with <a href="https://claude.com/claude-code">Claude Code</a> · MIT licensed</sub></p>
