# Lumen — Mobile UI kit

Interactive, click-through React recreation of the Lumen journaling app. Ships dark and light in parity.

## Files
- `index.html` — the viewer. First phone is fully interactive (tap nav, enter editor, open entries, lock the app). The rest are static previews of each screen type.
- `Primitives.jsx` — tokens-aware primitives: `GlassCard`, `MoodDot`, `MoodChip`, `BottomNav`, `PrimaryBtn`, `GhostBtn`, `Serif`, `Eyebrow`, `PageBg`, `LumenIcon`, and the canonical `MOODS` array with `moodGradient()`.
- `Screens.jsx` — `HomeScreen`, `TimelineScreen` (list + calendar), `InsightsScreen`, `ProfileScreen`.
- `Flows.jsx` — `OnboardingScreen`, `LockScreen`, `MoodCheckinScreen`, `EditorScreen`, `EntryDetailScreen`, `PromptsScreen`.

## Design notes
- All screens share `PageBg` which renders the warm / deep radial-gradient page.
- The **bottom nav** is a floating glass pill (28px from bottom) with a raised primary write action.
- Entry cards use a 4px inset mood-colored bar, never a full colored border.
- Editor uses Fraunces at 17/28 for the body (reads like a novel, not a Slack thread).
- The mood picker "breathes" in a 2.8s sine loop — the one intentional motion affordance.
