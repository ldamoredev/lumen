---
name: lumen-design
description: Use this skill to generate well-branded interfaces and assets for Lumen, a premium private journaling app, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files — `colors_and_type.css` for tokens, `ui_kits/mobile/` for production-fidelity React primitives and screens, and `preview/` for visual references of each token group.

The system is mobile-first, available in parity light + dark modes. Core ingredients:
- **Type:** Fraunces (serif display) + Inter (UI). Fraunces italic is the signature voice.
- **Palette:** warm off-white / deep indigo-black, with dusty periwinkle accent and six named mood gradients.
- **Surface:** glass cards (backdrop-blur 24–28, 48–68% surface fill).
- **Motion:** `cubic-bezier(0.32, 0.72, 0, 1)`, no bounces, one breathing mood-picker.
- **Voice:** quiet, warm, second-person. No emoji in UI. Sentence case everywhere.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out and create static HTML files for the user to view. Reuse `ui_kits/mobile/Primitives.jsx` components directly when possible — they handle dark/light automatically via a `dark` prop.

If working on production code, read the tokens from `colors_and_type.css` and follow the motion / copy / glass rules in `README.md` verbatim.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask a few sharp questions (surface, screen, mood, theme parity), and act as an expert designer who outputs HTML artifacts or production code, depending on the need.
