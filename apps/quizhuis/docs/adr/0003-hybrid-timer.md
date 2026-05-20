# Hybrid timer: Zustand ticks + Framer Motion visuals

The game timer uses a hybrid approach: logical time is tracked via 1-second ticks in the Zustand store (with `performance.now()` drift compensation), while the visual progress bar uses Framer Motion's `animate` with `duration: 1, ease: "linear"` to interpolate smoothly between ticks.

**Why:** A pure `setInterval` timer would produce a jerky progress bar (jumping once per second). A pure animation-driven timer would make the "source of truth" live in the animation library, making it hard to read remaining time for scoring and phase transitions. The hybrid gives smooth visuals while keeping game logic deterministic — the store always knows the integer seconds remaining, and scoring reads from that.

**Trade-off:** There can be a slight visual discrepancy (the bar animates to the next position over 1s, but the store may tick slightly earlier or later due to drift compensation). In practice this is imperceptible.
