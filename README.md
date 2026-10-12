# Farhan Sadik Susmit — Portfolio

A single-page portfolio for Farhan Sadik Susmit, Business Development Executive at Exprovia (Rajshahi, Bangladesh). Built with React 19, TypeScript and Vite, with animated components from [React Bits](https://reactbits.dev/).

Sections: hero, About (with skills and education), What I bring (strengths), Services, Experience (with role highlights and recent LinkedIn posts), the Exprovia band, Process, FAQ and Contact.

The design is editorial: cool paper sections, dark navy bands, Instrument Serif headings, Manrope body text, DM Mono labels and #42089E purple as the primary colour (taken with the navy from Farhan's LinkedIn banner). The hero has a slow purple-and-blue aurora, and the "What I bring" section pairs a numbered list with a pinned, black-and-white side profile that drifts as you scroll.

Motion: on tall desktop screens the hero stays pinned while the About section slides over it as a rounded sheet (with light parallax and dimming), the portrait wipes in, a light travels around the main button, the Exprovia band has flowing threads, Process has a cursor-reactive line field, and a faint film grain sits over the page. The header hides while scrolling down and returns when scrolling up. On desktop a bracket cursor locks onto links and buttons, the hero name reveals letter by letter, the section numbers carry a flowing gradient, and Exprovia's figures roll like an odometer. Everything falls back to still frames for visitors who prefer reduced motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # production build in dist/
```

With the dev server running, check the site in a real browser:

```bash
node scripts/verify-portfolio.mjs
```

The check uses the installed Microsoft Edge through Playwright. It covers the page structure, navigation and anchors, the strengths list and profile photo, education notes, LinkedIn posts and FAQ, reduced motion, the portrait, the service → contact flow, form validation, the project-brief dialog (clipboard, WhatsApp, email and LinkedIn links, Escape and backdrop closing, focus return), the experience disclosures, the process stepper, the mobile menu, back to top, horizontal overflow from 1440px down to 320px, broken images, console errors, and with normal motion the pinned hero, header hide/show, the rotating heading, the pinned drifting photo and every animated canvas. Screenshots go to `.qa/` (ignored by git). Set `PORTFOLIO_URL` to test another address.

## Where things live

- `data/profile.ts` — every piece of copy on the page. Components only read from it.
- `components/portfolio/` — the page (`Portfolio.tsx`), header and shared pieces (`Chrome.tsx`), and the contact section with the brief dialog (`ContactSection.tsx`).
- `components/react-bits/` — the React Bits components, their license, and what was adapted (`README.md`).
- `src/portfolio.css` — the visual system. Colour, type and spacing tokens are at the top in `:root`.
- `public/images/` — photos as WebP: `farhan-portrait.webp` (hero, 800px), `farhan-avatar.webp` (header, 160px) and `farhan-profile.webp` (side profile in "What I bring", 900px), plus `exprovia-logo.png`.
- `assets/originals/` — full-size originals that are not served with the site (the side profile PNG). The first portrait's original is in git history (commit `5a2830b`).
- `index.html` — title, description, Open Graph/Twitter tags, fonts and favicon.

## Content rules

- Only real facts. No invented clients, numbers, testimonials, degrees or claims. Anything unknown is written as `TODO` in `data/profile.ts` and is hidden on the page until it is filled in.
- Exprovia's figures are shown as the company's figures, separate from personal achievements, with their source link.
- Each fact appears once: the name in the hero heading, role and company in the hero pill, skills/education/languages in About, services in Services, career dates in Experience, company figures in the company band, the process in Process, WhatsApp/LinkedIn/email/location/local time in Contact, and Facebook/Instagram in the footer.
- The contact form never sends or stores anything. It prepares a brief on the visitor's device, which they can send on WhatsApp, by email, or copy for LinkedIn.
- All motion respects the visitor's reduced-motion setting.
