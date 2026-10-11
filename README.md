# Farhan Sadik Susmit — Portfolio

A single-page portfolio for Farhan Sadik Susmit, Business Development Executive at Exprovia (Rajshahi, Bangladesh). Built with React 19, TypeScript and Vite, with animated components from [React Bits](https://reactbits.dev/).

The design is editorial: warm paper sections, charcoal bands sampled from the portrait's studio backdrop, Instrument Serif headings, Manrope body text, DM Mono labels and a single terracotta accent.

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

The check uses the installed Microsoft Edge through Playwright. It covers the page structure and anchors, reduced motion, the portrait, the service → contact flow, form validation, the project-brief dialog (clipboard, WhatsApp, email and LinkedIn links, Escape and backdrop closing, focus return), the experience disclosures, the process stepper, the mobile menu, horizontal overflow from 1440px down to 320px, broken images, console errors and the animated canvases. Screenshots go to `.qa/` (ignored by git). Set `PORTFOLIO_URL` to test another address.

## Where things live

- `data/profile.ts` — every piece of copy on the page. Components only read from it.
- `components/portfolio/` — the page (`Portfolio.tsx`), header and shared pieces (`Chrome.tsx`), and the contact section with the brief dialog (`ContactSection.tsx`).
- `components/react-bits/` — the React Bits components, their license, and what was adapted (`README.md`).
- `src/portfolio.css` — the visual system. Colour, type and spacing tokens are at the top in `:root`.
- `public/images/` — the portrait as WebP (`farhan-portrait.webp`, 800px; `farhan-avatar.webp`, 160px). The original photo is `1779020536870.jfif` in the project root.
- `index.html` — title, description, Open Graph/Twitter tags, fonts and favicon.

## Content rules

- Only real facts. No invented clients, numbers, testimonials, degrees or claims. Anything unknown is written as `TODO` in `data/profile.ts` and is hidden on the page until it is filled in.
- Exprovia's figures are shown as the company's figures, separate from personal achievements, with their source link.
- Each fact appears once: the name in the hero heading, role and company in the hero pill, skills/education/languages in About, services in Services, career dates in Experience, company figures in the company band, the process in Process, WhatsApp/LinkedIn/email/location/local time in Contact, and Facebook/Instagram in the footer.
- The contact form never sends or stores anything. It prepares a brief on the visitor's device, which they can send on WhatsApp, by email, or copy for LinkedIn.
- All motion respects the visitor's reduced-motion setting.
