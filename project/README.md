# Lumen — Design System

> A private journal you'll actually return to.

**Lumen** is a premium, mobile-first journaling and reflection app. It helps people write daily entries, track mood over time, respond to gentle prompts, and build a calm habit of self-awareness. The product feels like a mix of a personal diary, a mood tracker, and a quiet reflection companion — intimate, unhurried, and beautifully made.

This repository is the Lumen design system: tokens, type, visual foundations, iconography, and a UI kit of high-fidelity screens that designers and AI agents can draw on to produce new surfaces in-brand.

## Product pillars

1. **Intimacy** — it's a diary, not a social feed. Every interaction should feel private.
2. **Calm** — soft gradients, generous whitespace, nothing shouts.
3. **Emotional clarity** — moods and feelings are first-class citizens of the UI.
4. **Premium craft** — glass surfaces, refined type, careful motion.
5. **Two-mode parity** — dark and light are peers, not a main mode and an afterthought.

## Sources

This design system was generated from a written product brief (no codebase, Figma, or prior brand assets were provided). All visual decisions — palette, type pairing, glass system, component library — are original to this system. If you have existing brand materials (logo, Figma, fonts), drop them in and the agent will iterate.

## Index

| File / folder | What it is |
|---|---|
| `README.md` | This file — product concept, content rules, visual rules, iconography |
| `colors_and_type.css` | Design tokens: colors (light + dark), type scale, spacing, radii, shadows, glass recipes |
| `fonts/` | Font loading (via Google Fonts CDN — Fraunces for display, Inter for UI) |
| `assets/` | Logo lockups, mood glyphs, illustrative assets |
| `preview/` | Small HTML cards that populate the Design System review tab |
| `ui_kits/mobile/` | Interactive mobile UI kit — 10+ screens, click-through prototype |
| `SKILL.md` | Agent Skill front-matter so this system can be used in Claude Code |

## Content fundamentals

*(See the CONTENT FUNDAMENTALS section below for full detail.)*

## Visual foundations

*(See the VISUAL FOUNDATIONS section below for full detail.)*

---

## CONTENT FUNDAMENTALS

Lumen's voice is **warm, quiet, and first-person-friendly**. Copy reads like a thoughtful friend, not a productivity app and not a therapist.

### Pronouns & address
- **"You"** is the default address. ("How are you feeling today?")
- **"I" / "my"** appears in user-facing choices and entry prompts. ("My mood today", "What I'm grateful for")
- Never "users", "people", "one". Keep it personal.

### Tone
- **Unhurried.** Never urgent, never hype. No "🚀", no "Let's go!", no "Pro tip:".
- **Soft imperatives** over commands. "Take a moment" not "Start now". "When you're ready" not "Click to begin".
- **Curious, not clinical.** "What's on your mind?" not "Input your thoughts".
- **Affirming, not performative.** "Nice streak." over "🔥 You're crushing it!"

### Casing
- **Sentence case everywhere** — buttons, titles, nav labels. ("New entry", not "New Entry" or "NEW ENTRY")
- ALL CAPS is reserved for tiny eyebrow labels at `10–11px` with wide tracking (`0.12em`).

### Punctuation
- Prompts end without a period when they sit alone ("How are you feeling")
- Full sentences in body copy get proper punctuation
- Em dashes — used freely — give copy a reflective pacing
- No exclamation marks except inside user-generated entries (the user can be excited; the app cannot)

### Emoji & icons
- **Emoji: no.** Not in UI copy, not in buttons, not in empty states. Users can use emoji in their own entries.
- Moods are represented by **named soft glyphs** (calm, tender, heavy, bright, restless, grateful), rendered as custom gradient dots — not emoji.
- Icons use the **Lucide** set, 1.5px stroke, always monochromatic.

### Example copy
| Context | ❌ Off-brand | ✅ On-brand |
|---|---|---|
| Empty home | "No entries yet! Start journaling 🚀" | "Nothing written yet. Today is a good day to start." |
| Save confirm | "Entry saved successfully!" | "Saved." |
| Streak | "🔥 12 day streak!" | "12 quiet days in a row." |
| Mood prompt | "Select your mood:" | "How are you, really?" |
| Privacy lock | "Enter passcode" | "Only for you." |
| Insights header | "Your Analytics Dashboard" | "How this month felt" |

---

## VISUAL FOUNDATIONS

### Palette

**Light mode** is built on a warm off-white base (`#F7F4EF`, a soft "paper" tone) with lavender, rose, and sage accents. Avoids clinical pure-white.

**Dark mode** is a deep blue-black (`#0E1016`) with muted periwinkle, rose-quartz, and aurora accents. Avoids flat gray.

Accents are **desaturated and slightly dusty** — calming, never neon. The core accent is **periwinkle** (`#8A8CFF` light, `#9FA2FF` dark), a soft blue-violet that reads as introspective.

Mood colors are six named pastels (calm, tender, heavy, bright, restless, grateful), each a gradient from a slightly darker to lighter variant — never flat.

### Type

- **Display / serif:** Fraunces (variable, optical-size 72+). Used for greeting lines, section titles, the date on the home screen, pull quotes. Tracking tightens at large sizes (`-0.02em` at 48px+).
- **UI / sans:** Inter (variable). All body, buttons, labels, timestamps.
- **Pairing rule:** Fraunces for voice and feeling, Inter for function. Never mix the two within the same line.
- Body copy lives at `15–17px` with `1.55` line-height; entry body uses `17px/1.65` for comfortable long-reading.

### Spacing & layout

- **4px base grid.** Spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 56, 72`.
- Screen edge padding is **`20px`** on mobile (never less than 16, never more than 24).
- Cards stack with **`12px`** gap in dense lists, **`20px`** in editorial layouts.
- Fixed elements: a floating bottom nav (5 items) sits 16px above the home indicator. The top is usually a soft protection gradient, not a hard bar.

### Backgrounds

- Never flat fills. Every screen has a subtle **two-stop gradient** tied to time-of-day or mood context. Light mode: warm off-white to dusty lavender. Dark mode: deep indigo-black to muted aurora.
- Occasionally, a blurred "orb" (80% opacity, 120px blur) sits behind the hero area — adds depth without imagery.
- No photo backgrounds. No illustrations behind content.
- No repeating patterns or textures.

### Glass system

Lumen's defining surface is the **glass card**. Recipe:

| Property | Light | Dark |
|---|---|---|
| Background | `rgba(255, 255, 255, 0.58)` | `rgba(30, 34, 48, 0.48)` |
| Backdrop-filter | `blur(24px) saturate(140%)` | `blur(28px) saturate(130%)` |
| Border | `1px solid rgba(255,255,255,0.65)` inset-top | `1px solid rgba(255,255,255,0.08)` |
| Shadow | `0 8px 32px rgba(40, 30, 80, 0.08)` | `0 8px 32px rgba(0, 0, 0, 0.35)` |
| Inner highlight | `inset 0 1px 0 rgba(255,255,255,0.8)` | `inset 0 1px 0 rgba(255,255,255,0.06)` |

Glass is used for: the bottom nav, mood chips, modal sheets, entry preview cards, the editor toolbar. Never for long-form reading surfaces (too hard on eyes).

### Shadows

Three levels, all soft and cool-tinted (not black):

- **`shadow-sm`** `0 2px 8px rgba(40, 30, 80, 0.06)` — chips, buttons
- **`shadow-md`** `0 8px 24px rgba(40, 30, 80, 0.10)` — cards, popovers
- **`shadow-lg`** `0 20px 60px rgba(40, 30, 80, 0.16)` — sheets, modals

Dark mode uses the same offsets with `rgba(0,0,0, 0.35–0.55)` and an accent-tinted inner highlight.

### Radii

- **`6px`** — tiny pills, tag chips
- **`12px`** — buttons, inputs
- **`20px`** — cards
- **`28px`** — sheets and hero surfaces
- **`full`** — mood dots, avatars, icon buttons

The system leans **soft but not pillowy**. 20px is the hero radius.

### Borders

- Hairline borders: `1px solid rgba(0,0,0,0.06)` light, `rgba(255,255,255,0.08)` dark. Never heavier.
- Borders are mostly structural on inputs; cards use shadow + inner highlight instead of border.

### Motion

- **Easing: `cubic-bezier(0.32, 0.72, 0, 1)`** — the "iOS spring" feel. Used for everything interactive.
- Durations: `160ms` for hover/press, `280ms` for sheets and screen transitions, `480ms` for the "breathing" mood-picker bloom.
- **No bounces, no overshoot on UI elements.** The mood-check-in breathing circle is the one exception — it pulses in a slow `2.8s` sine loop.
- Fades are paired with a tiny `4px` upward translate on enter.

### Hover & press

- **Hover (touch devices rarely see it):** brightness +4%, or background alpha +8%.
- **Press:** scale `0.97` + brightness `-6%` for buttons; background alpha +12% for list rows.
- Buttons never shift color on press — just scale and darken.

### Transparency & blur

- Blur is used **only** on glass surfaces that sit over content — nav, sheets, mood picker. Never on static backgrounds for "decoration".
- Transparency on text is never below `0.6` alpha. Hierarchy is built with tokens (`fg-1`, `fg-2`, `fg-3`), not arbitrary opacity.

### Imagery

- This app has **almost no imagery** by design. Where imagery appears (optional entry attachments), it's user-provided and rendered in a soft `12px`-radius card with a `shadow-md`.
- Decorative imagery, if ever added, would be abstract gradient orbs — not photos, not illustrations of people.

### Cards

Default card: `20px` radius, surface-1 background, `shadow-md`, no border. Entry cards add a `4px` colored bar on the left *inside* the card (inset 16px from edges) tied to the entry's mood — never a full colored border.

### Layout rules

- One primary action per screen, anchored bottom-center or bottom-right.
- The bottom nav is always a floating glass pill (not edge-to-edge).
- Headers are sentence-case titles at `22px` Fraunces, left-aligned, with generous `32px` top padding.
- Dates use Fraunces with italic style (`"Thursday, April 23"`).

---

## ICONOGRAPHY

Lumen uses **Lucide** (`https://unpkg.com/lucide@latest`) as its icon set, loaded via CDN.

- **Style:** 1.5px stroke, rounded line-caps, no fills.
- **Size tokens:** `16px` inline, `20px` default, `24px` nav, `28px` hero.
- **Color:** always single-token (`fg-1` or `fg-2` or an accent). Never multi-color, never gradient.
- **Usage:** navigation, actions, metadata (location, weather, time). Never decorative.

Specific Lucide glyphs mapped to Lumen concepts:

| Concept | Lucide icon |
|---|---|
| Home | `home` |
| Timeline | `calendar-days` |
| New entry | `pen-line` |
| Insights | `sparkles` |
| Profile | `user-round` |
| Mood | `heart` |
| Lock | `lock` |
| Search | `search` |
| Prompt | `quote` |
| Weather | `cloud-sun` |
| Attach | `paperclip` |
| Voice | `mic` |

**Moods** are NOT icons — they are named gradient dots rendered in CSS:
`calm, tender, heavy, bright, restless, grateful`. See `preview/moods.html` and the mood-chip component.

**Emoji:** not used in the UI. Users may type emoji in their own entries; those render at the system font.

**Unicode:** a handful of characters appear as typographic flourishes — `·` (separator), `—` (em dash in metadata), `↗` (open externally). No other unicode icons.

### Font substitution note
Fraunces and Inter are both loaded from **Google Fonts**. If you have licensed brand fonts, drop `.woff2` files in `fonts/` and update `colors_and_type.css`.
