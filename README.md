# travel-itinerary-book

A [Claude Code](https://claude.com/claude-code) **skill** that turns rough trip plans (or nothing booked yet) into a fact-checked, mobile-first travel handbook delivered as **one self-contained HTML file** — plus an optional all-expanded PDF.

**Core principle:** the main route is always visible; everything else is one tap away. Verified facts live inline in the timeline; depth (history, terroir, food, alternatives) lives in collapsible folds.

## What it does

- **Two modes** — *confirmed* (verify + present your bookings) or *planning / nothing booked yet* (propose a route skeleton + a prioritized 待訂 "to-book" checklist). Partial trips are handled element-by-element; nothing unbooked is ever presented as confirmed.
- **Fact-checks online** — opening hours, prices, seasonal availability, closures, relocations; corrects silently (no noisy "this was wrong" boxes).
- **Verifies time-bound events first** — is there actually a home game / festival on that date? what's the last train back?
- **Mobile-first single HTML** — embedded CSS, Google Fonts, no JS dependencies.
- **Logistics card** — flights + hotels summary, hotel names linked to Google Maps.
- **PDF export** — force all folds open + print CSS, render via headless Chrome.

## Files

| File | Purpose |
|------|---------|
| `SKILL.md` | The skill: workflow, per-day structure, voice rules, common mistakes |
| `research-and-factcheck.md` | What each research agent must verify and return; booking-priority order |
| `template.html` | Full CSS + a worked example day (timeline, 3-level history fold, A/B selector, logistics card, buying section) |

## Install (Claude Code)

Clone into your personal skills directory:

```bash
git clone https://github.com/jechiu16/travel-itinerary-book.git \
  ~/.claude/skills/travel-itinerary-book
```

Then in a Claude Code session, invoke `/travel-itinerary-book` or just ask it to build a trip itinerary.

## Voice rules (the opinionated bits)

- Plain, clear Traditional Chinese — no decorative "national-style" ornamentation.
- History folds need cause→effect, what-to-actually-see, a story, and who/when/where/what.
- A/B alternatives go inside a second-layer fold, never side-by-side on the main timeline.
- Honest pills: 必留 / 條件保留 / 可加 / 可砍 — tell the traveler what to cut.

---

Built with [Claude Code](https://claude.com/claude-code).
