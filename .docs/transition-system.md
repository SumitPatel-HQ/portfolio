# Cinematic Vertical-Stacked Page Transition System

The portfolio uses a custom, cinematic page transition system orchestrated by the `TransitionProvider` component. It creates the illusion that the viewport is traveling upward through a continuous vertical strip of connected scenes.

## Architecture

The system uses three main layers to achieve the vertical stacking effect during transitions. There are no overlays, no masking, and no dead frames.

```text
   ┌────────────────┐  z-index: 40  — Snapshot of outgoing page
   │ Snapshot       │               (position: fixed, moves upward)
   ├────────────────┤  z-index: 25  — Brand layer
   │ Brand Layer    │               (position: fixed, follows upward)
   ├────────────────┤  z-index: 10  — Incoming page
   │ Next Page      │               (normal flow, revealed from below)
   └────────────────┘
```

| Layer | z-index | Description |
| :--- | :--- | :--- |
| **Snapshot** | `40` | A fixed-position clone of the outgoing page. It moves upward with heavy momentum to reveal the layers underneath. |
| **Brand Layer** | `25` | An atmospheric middle scene that follows the snapshot upward. It displays the target page name (e.g., "PROJECTS", "ABOUT", or "SUMIT"). |
| **Incoming Page** | `10` | The normal flow of the new page, which is naturally revealed from below as the layers above it move away. |

## Technical Implementation

- **Routing:** Uses `next-transition-router` for lifecycle control via `leave` and `enter` hooks.
- **Animation:** Powered by **GSAP**, utilizing transform-only, GPU-composited animations (`y` translation) for maximum performance.
- **Scroll Sync:** Integrates with **Lenis** to reset scroll positions seamlessly when the incoming page arrives.

## Transition Flow

1. **Leave Sequence:**
   - The current visual state of the page is captured into the `Snapshot` layer.
   - The actual DOM is hidden to prevent peeking.
   - The `Snapshot` layer moves upward (`y: "-100vh"`).
   - The `Brand Layer` follows from below, creating a spatial traversal effect.

2. **Enter Sequence:**
   - The incoming page content is positioned slightly below the viewport (`y: "50vh"`).
   - The `Brand Layer` continues moving upward off-screen.
   - The incoming page slides gently into its resting position (`y: 0`), concluding the transition.

3. **Special Cases:**
   - **Home Page (`/`):** Skips the `Brand Layer` and moves directly into the incoming scene, allowing the Hero section's own cinematic intro to play unobstructed.
   - **Popstate (Back/Forward):** Includes a dedicated popstate choreography that visually mirrors the standard transition without breaking Next.js routing history.

## Performance & Safety Guardrails

- **Safety Watchdog:** If a transition gets stuck (e.g., taking longer than 8 seconds), a safety timer automatically forces a reset to a known-good baseline.
- **Deterministic Cleanup:** A cleanup function ensures all timelines are killed and DOM states (like visibility and transforms) are reset before any new navigation begins.
- **Reduced Motion:** Fully supports `prefers-reduced-motion: reduce` by speeding up transition durations and minimizing delays.