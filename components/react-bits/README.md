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
| CountUp | Exprovia figures | Final value straight away for reduced motion |
| Stepper | Process steps | lucide-react icons (Check, ArrowLeft, ArrowRight) instead of Hugeicons |
| GlareHover | WhatsApp, LinkedIn and email cards | None |
| Particles | Contact background | Pauses off screen (IntersectionObserver), one still frame for reduced motion |
| Magnet | Primary buttons | None (disabled for touch and reduced motion by `Magnetic` in `Chrome.tsx`) |

LightRays and Particles need `ogl`. ScrollReveal and AnimatedContent need `gsap`. The others use `motion` or plain CSS.
