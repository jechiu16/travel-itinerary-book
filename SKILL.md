---
name: travel-itinerary-book
description: Build fact-checked, mobile-first travel itineraries and multi-day destination guides as shareable single-file HTML handbooks, with optional all-expanded print/PDF output. Use when the user gives trip notes, asks to combine draft itineraries, wants a route proposed from scratch, needs current hours/prices/closures verified, or asks for 行程, 旅遊手冊, itinerary, trip plan, booking checklist, or "find the latest info and make it nice".
---

# Travel Itinerary Book

Turn rough trip plans, source files, or a blank planning request into a useful travel handbook: clear route first, deeper context one tap away, current facts checked, and unbooked items never disguised as confirmed.

Use Traditional Chinese by default unless the user asks otherwise.

## Core Loop

Work in visible loops. Do not jump straight from notes to final HTML.

1. **Intake** - Read all user-provided files/notes. Separate confirmed facts from assumptions: dates, flights, hotels, event tickets, transport, must-dos, interests, constraints, and unknowns.
2. **Diverge** - When the route is not fixed, create 2-4 plausible route/tempo options. Include tradeoffs, not just recommendations: transit burden, hotel moves, seasonal risk, booking risk, and fit with stated interests.
3. **Summarize** - Compress the current understanding into a short planning brief: confirmed items, proposed skeleton, open choices, and your recommended path.
4. **Confirm** - Ask before locking structural choices: route shape, overnight cities, drive vs train, must-keep events, and any major booking-dependent assumption. For small style/content choices, make a sensible call and keep moving.
5. **Research & correct** - Verify current facts, then write the corrected value directly into the itinerary. If verification changes the plan, update the brief and re-confirm only when the change affects route, cost, or feasibility.
6. **Assemble** - Fill `template.html`; keep the main timeline always visible and move depth into collapsible sections.
7. **Review** - Before delivery, perform a self-check: route feasibility, day-of-week closures, booking labels, link quality, mobile readability, and whether anything unverified is clearly marked.

Repeat steps 2-5 whenever new information changes the plan.

## Modes

- **Confirmed trip:** preserve booked flights, hotels, tickets, and fixed nights. Verify surrounding logistics and present bookings clearly.
- **Planning trip:** propose a route skeleton and include a prioritized 待訂 checklist. Mark every unbooked flight, hotel, ticket, rental car, train, and restaurant as 待訂.
- **Mixed trip:** handle each item independently. Confirmed items are shown as booked; proposed items stay labelled 待訂.

Never invent a specific hotel, flight, ticket, or reservation the user has not chosen.

## Research

Use `research-and-factcheck.md` when current details matter. For each region/day cluster, verify:

- hours, closed days, prices, reservation rules, temporary closures, relocation, and official URLs
- day-of-week conflicts with the actual travel date
- seasonal availability for flowers, fruit, menus, festivals, fireworks, games, and transport
- transport feasibility, including reserved-seat rules, ticket release timing, last trains, last buses, and drive times

For date-bound anchors, verify feasibility before building around them. If an event is not available inside the travel window, say so and propose an alternative.

## Output Shape

Use `template.html` as the base rather than restyling from scratch.

Each day should contain:

1. day heading: number, theme, date, route
2. short mission/transport notes and an honest verdict
3. main timeline with time, map link, concise description, verified facts inline, and official links where useful
4. only actionable callouts, such as timing or reservation notes
5. optional folds for history, food, local products, shopping, and alternatives

**History folds** must contain substance, not captions: 前因後果 (cause → effect), 必看點 (what to actually look at on site), a concrete story, and 人事時地物 (who / when / where / what). Use nested folds up to 3 levels for deep-dives — keep the surface layer light.

**A/B alternatives** go inside a second-layer fold under one timeline event labelled "二選一". Never show two parallel events at the same time slot — that reads as "do both".

## Voice & Judgment

Write plainly and use structure for polish. Avoid decorative faux-local language, over-themed prose, and overly rigid labels when the content does not need them.

Prefer:

- concrete recommendations over exhaustive lists
- cause-and-effect stories for history, not captions
- local food/products tied back to geography, season, or history
- clear "keep / cut / optional" judgments that protect the traveler's time
- concise explanations that leave room for the model to adapt to the destination and traveler

## Booking Checklist

For planning or partially unbooked trips, end with "book in this order":

1. reserved-seat trains or transport that controls the route
2. peak-season hotels and rental cars
3. event tickets and paid viewpoints/boats/tours
4. popular restaurants or limited seasonal meals

Each item should say where to book, when booking opens, sell-out risk, and what changes if it fails.

## PDF / Print

The phone HTML keeps folds collapsed. For PDF, create an all-expanded print copy:

```bash
npm run build:print -- sample/hokkaido-7day-sample.html dist/hokkaido-7day-sample.print.html
```

Then print the generated file with a browser or headless Chrome. Regenerate the print copy after edits.

## Final Self-Check

Before delivering, confirm:

- no unbooked item is presented as confirmed
- major facts have official or high-quality sources
- closed days and seasonal windows match the actual dates
- the main route remains readable on a phone
- folds contain useful depth rather than filler
- PDF/print output uses an expanded copy if requested
