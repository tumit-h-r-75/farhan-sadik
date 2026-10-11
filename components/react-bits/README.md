# React Bits components

These components come from [React Bits](https://reactbits.dev/) by David Haz, downloaded from the official registry (`https://reactbits.dev/r/<Name>-TS-CSS.json`). The license is in `LICENSE.md`. Every adapted file starts with an `Adapted:` comment.

| Component | Used for | Adapted |
| --- | --- | --- |
| LightRays | Hero background (warm accent rays) | DPR capped at 1.5, z-index removed from the CSS, one still frame for reduced motion |
| TiltedCard | Hero portrait | No tilt or scale for reduced motion |
| BlurText | Hero name and section headings | Renders a span (valid inside headings) with a readable text copy, `initialDelay` prop, plain text for reduced motion |
| ShinyText | Role pill in the hero | None |
| DecryptedText | Section labels | Screen readers get the real text (the sr-only copy is no longer hidden), no scramble for reduced motion |
| ScrollReveal | About statement | Span inside the heading, cleanup scoped with `gsap.context().revert()`, static for reduced motion |
| AnimatedContent | Scroll entrances (the `Reveal` helper in `components/portfolio/Chrome.tsx`) | Shown immediately for reduced motion |
| SpotlightCard | Service cards | None |
| Stepper | Process steps | lucide-react icons (Check, ArrowLeft, ArrowRight) instead of Hugeicons |
| GlareHover | WhatsApp, LinkedIn and email cards | None |
| Particles | Contact background | Pauses off screen (IntersectionObserver), one still frame for reduced motion |
| Magnet | Primary buttons | None (disabled for touch and reduced motion by `Magnetic` in `Chrome.tsx`) |
| StarBorder | Light travelling around the hero call to action | None (it already stops moving for reduced motion) |
| Threads | Flowing lines behind the Exprovia band | None (pauses off screen and freezes for reduced motion on its own) |
| Waves | Cursor-reactive line field behind Process | Fresh bounding box for the pointer (it went stale after scrolling), pauses off screen, one still frame for reduced motion, broken cursor-dot CSS removed |
| Noise | Very light animated film grain over the whole page | None (static for reduced motion on its own) |
| MagicBento | "What I bring" strength cards (spotlight, border glow, particles, magnetism) | Cards from a `cards` prop with icons instead of demo data, h3 titles, no animation for reduced motion, CSS scoped (no global `:root` variables or fixed purple) |
| Counter | Exprovia figures roll like an odometer | None (the page starts it in view, shows the final value for reduced motion, and gives screen readers the plain number) |
| GradientText | Flowing gradient on the section numbers | None |
| TargetCursor | Bracket cursor that locks onto links and buttons (mouse only) | Spring integrator uses small sub-steps, so slow frames no longer throw the corners off screen |
| RotatingText | Rotating end of the "What I bring" heading | None (the page starts it only in view, plays it once, and shows plain text for reduced motion) |

LightRays and Particles need `ogl`. StarBorder, Threads (WebGL2), Waves and Noise have no dependencies. ScrollReveal, AnimatedContent and MagicBento need `gsap`. The others use `motion` or plain CSS.
