---
name: travel-itinerary-book
description: Use when building a travel itinerary, trip plan, or multi-day destination guide as a shareable single-file HTML document — whether the user has confirmed bookings, only rough notes, or nothing booked yet and wants help planning. Covers verifying current info (hours, prices, seasonal availability, closures), proposing a route skeleton, a prioritized booking/待訂 checklist, mobile-first collapsible presentation, and PDF export. Triggers include 行程/旅遊手冊/itinerary, combining draft itineraries, "plan a trip to X", or "find the latest info and make it nice".
---

# Travel Itinerary Book

## Overview

Turn rough trip plans + source itineraries into a fact-checked, mobile-first travel handbook delivered as **one self-contained HTML file** (embedded CSS, Google Fonts, no JS dependencies).

**Core principle:** the main route is always visible; everything else is one tap away. Verified facts live inline in the timeline; depth (history, food, alternatives) lives in folds.

## When to Use

- User gives you existing itinerary file(s) or notes and wants them combined / upgraded
- Wants the latest info verified online (hours, prices, closures, relocations, seasonal flowers/menus)
- Output must read well on a phone
- Trip spans multiple days / cities

**Not for:** live booking or money movement, single-day quick lists, non-travel documents.

## Two Modes (set this first)

The same output adapts to how much is locked in:

- **Mode A — confirmed:** flights, hotels, overnight cities, tickets already booked. The job is to verify + present them well. Logistics card shows the actual bookings.
- **Mode B — planning / nothing booked yet:** you also **propose the route skeleton** and produce a **待訂 (to-book) checklist**. Nothing is presented as confirmed — every unbooked item is labelled 待訂 with how/where/when to book.

Most trips are partial (e.g. flights booked, hotels not). Treat each element independently: confirmed → present it; unbooked → propose candidates + booking link + 待訂. **Never fabricate a specific hotel/flight/ticket the user hasn't chosen.**

## Workflow

### Phase 0 — Understand & confirm
1. Read **every** source file fully (if any). Extract two things:
   - **Skeleton — given or to-propose:** in/out cities, self-drive days, overnights, hotel nights, flight numbers & times, festival/peak constraints (e.g. Obon). In **Mode B**, much of this is missing → *propose* a skeleton from the dates + interests + any hard constraints, with brief reasoning. Don't silently invent it; surface it as a proposal.
   - **Traveler's stated interests** — these drive every "should I add this?" call (e.g. history / sake / art / agricultural products / local food).
2. Confirm with **AskUserQuestion** before building:
   - **Mode B first:** confirm the proposed skeleton (route shape, which nights where, drive vs train) — this is the one decision you must not guess.
   - Visual style (recommend clean + modern info cards, no heavy theme).
   - Mobile density — recommend **main timeline always visible, the rest collapsible**.
   - Research depth — recommend **actively supplement + add official site / booking info**.

### Phase 1 — Research & fact-check
**REQUIRED SUB-SKILL:** use superpowers:dispatching-parallel-agents. Dispatch one subagent per geographic area / cluster of days, in a single message so they run concurrently. See `research-and-factcheck.md` for exactly what each agent must verify and return.

**Time-bound events first:** for anything date-dependent the trip is built around (a ball game, festival, fireworks, seasonal bloom), verify *feasibility* before scheduling it — does a home game / the event actually fall inside the travel window? If not, say so and adjust; don't assume it's on. Also verify the **last train / last shuttle** back for any out-of-town evening activity.

Then **correct silently**: once a fact is verified, write the *correct* value straight into the itinerary. Do **not** leave "this used to say X, it's wrong" correction boxes — they add noise. Keep only forward-looking `c-tip` (timing) and `c-book` (reservation) notes the traveler still needs to act on.

### Phase 2 — Assemble
Copy `template.html` and fill it. One `<section class="day">` per day, following the per-day structure below. Then preview on a mobile viewport and read it back before delivering.

## Per-day structure (in order)

1. `day-head` — number (一二三…) + theme + date/route line
2. `任務 / 交通` lines + `景點判斷` verdict box — the honest "what matters today"
3. **`主動線` timeline** — the spine, ALWAYS visible. Each event: time · place linked to a Google Maps search URL · short desc with **verified hours/price inline** · optional `gov` official-site link
4. callout boxes — only `c-tip` (timing) / `c-book` (reservations). **No correction boxes.**
5. Folds (collapsed by default), in this order:
   - `📖` history — see Voice rules
   - `🌾` 風土 (terroir) — local produce / sake / cuisine tied to place
   - `🍴` 餐點候選
   - `🛍️` 今天適合買
   - `♺` 備選方案

## Voice rules (hard-won — follow exactly)

- **No fake decorative "national-style" text.** Skip 令和/手帖/觀/壹貳參-style ornamentation; it reads noisy and try-hard. Use plain, clear Traditional Chinese and plain numerals 一二三.
- **History must have substance, not a caption.** Each `📖` fold needs: 前因後果 (cause → effect), 必看點 (what to actually look at on site), a concrete **story**, and 人事時地物 (who / when / where / what). Use **nested folds — up to 3 levels** — for `深入` deep-dives so the surface layer stays light.
- **風土:** supplement local produce, sake/alcohol, and cuisine; connect food and drink back to the place's geography and history.
- **A/B alternatives go INSIDE a second-layer fold**, never side-by-side on the main timeline. Two parallel events at the same time slot reads as "doing both" and is misleading. Use one timeline event labelled "二選一", and a fold reveals option A and option B.
- **Honest pills:** 必留 / 條件保留 / 可加 / 可砍. Tell the traveler what to cut, not just what to add.

## Template

Use `template.html` — full CSS + a worked skeleton (cover, nav, one complete example day with all conventions including a nested 3-level history fold and an A/B selector, the buying section, pre-trip checklist). Don't restyle from scratch; fill the slots.

## Logistics, booking & PDF

**航班與住宿 card** — add a summary card right after the intro (and a nav entry). Two small tables: flights (number · date · time · note) and nights (date · hotel · note). **Hotel names are Google Maps links**, exactly like every venue — never plain text.
- Mode A: show the actual flights/hotels.
- Mode B: show candidates + booking link, every row tagged 待訂. Don't invent a specific property.

**待訂 / booking checklist** — in Mode B (or any partial trip), end with a prioritized "book in this order" list. Order by what sells out / locks first:
1. Reserved-seat express trains — on ticket-release date (often 1 month prior, 10:00)
2. Peak-season hotels (Obon/holidays) and self-drive rental cars
3. Event tickets (games, fireworks seats) when release opens
4. Popular restaurants needing reservation

Each item: where to book, when it opens, whether it sells out. This *is* the deliverable in Mode B.

**PDF export** — the HTML is collapsible for phones, so a PDF printed as-is hides most content. To export:
1. Build a print copy: force every `<details>` open (add the `open` attribute) and inject a `@media print` block (force `print-color-adjust:exact` for backgrounds, `break-inside:avoid` on small blocks, hide nav/back-to-top).
2. Render with headless Chrome: `chrome --headless=new --no-pdf-header-footer --print-to-pdf=out.pdf <url>` (serve the file so web fonts load; give it a virtual-time budget).
3. Keep the collapsible HTML as the phone deliverable; the PDF is the all-expanded artifact. The PDF is a snapshot — regenerate after edits.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Decorative wa-style/era wording for "atmosphere" | Plain clear language; let structure carry the polish |
| Leaving "校正：原本寫錯…" boxes after verifying | Just write the correct fact inline; delete the correction box |
| History fold = one-line caption | Add 前因後果 + 必看 + story + 人事時地物; nest 深入 folds |
| A/B options shown as two timeline events | Collapse into one "二選一" event with a second-layer fold |
| Listing every option as "must-see" | Use 可砍/條件保留 pills; protect the traveler's time |
| Multi-file output or external JS | One self-contained HTML; embedded CSS only |
| Dumping research raw | Verify, then integrate; cite official sites via `gov` links |
| Inventing a hotel/flight/ticket the user hasn't booked | Propose candidates + booking link, tag 待訂; never present as confirmed |
| Hotel names as plain text | Link to Google Maps like every other venue |
| Building around an event without checking it's on | Verify the date falls in the window first; check last train back |
| PDF printed from the collapsible HTML (folds hidden) | Force all `<details open>` + print CSS, then headless-Chrome print-to-pdf |
| Skipping the phone check | Preview at ~375px and read it back before delivering |
