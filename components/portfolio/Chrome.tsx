import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AnimatedContent from "@/components/react-bits/AnimatedContent";
import BlurText from "@/components/react-bits/BlurText";
import DecryptedText from "@/components/react-bits/DecryptedText";
import Magnet from "@/components/react-bits/Magnet";
import { PROFILE, type Heading } from "@/data/profile";

export const EASE = [0.22, 1, 0.36, 1] as const;

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "experience", label: "Experience" },
  { id: "process", label: "Process" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToSection(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

// The page's standard scroll entrance (React Bits AnimatedContent).
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <AnimatedContent
      className={className}
      distance={36}
      duration={0.9}
      ease="power3.out"
      threshold={0.12}
      delay={delay}
    >
      {children}
    </AnimatedContent>
  );
}

export function SplitHeading({
  heading,
  className = "",
}: {
  heading: Heading;
  className?: string;
}) {
  return (
    <h2 className={`split-heading ${className}`.trim()}>
      <BlurText text={heading.lead} delay={70} direction="bottom" stepDuration={0.3} />{" "}
      <BlurText
        className="dim"
        text={heading.dim}
        delay={70}
        direction="bottom"
        stepDuration={0.3}
        initialDelay={0.18}
      />
    </h2>
  );
}

export function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="section-label">
      <span className="section-label-number" aria-hidden="true">
        {number}
      </span>
      <DecryptedText
        text={children}
        animateOn="view"
        sequential
        speed={45}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        parentClassName="section-label-text"
        encryptedClassName="section-label-scramble"
      />
    </p>
  );
}

/** Editorial section frame: a sticky label rail on the left, content on the right. */
export function RailSection({
  id,
  number,
  label,
  className = "",
  background,
  children,
}: {
  id: string;
  number: string;
  label: string;
  className?: string;
  background?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`section ${background ? "has-bg " : ""}${className}`.trim()}>
      {background && (
        <div className="section-bg" aria-hidden="true">
          {background}
        </div>
      )}
      <div className="shell rail-grid">
        <div className="rail">
          <SectionLabel number={number}>{label}</SectionLabel>
        </div>
        <div className="rail-content">{children}</div>
      </div>
    </section>
  );
}

// Magnet for primary buttons, only for a fine pointer and normal motion.
export function Magnetic({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <Magnet padding={24} magnetStrength={10} disabled={Boolean(reducedMotion) || !finePointer}>
      {children}
    </Magnet>
  );
}

export function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
    </svg>
  );
}

function Avatar({ size }: { size: number }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="avatar avatar-fallback" style={{ width: size, height: size }} aria-hidden="true">
        {PROFILE.brand.charAt(0)}
      </span>
    );
  return (
    <img
      className="avatar"
      src={PROFILE.photo.avatar}
      alt=""
      width={size}
      height={size}
      onError={() => setFailed(true)}
    />
  );
}

export function Wordmark({ withAvatar = false }: { withAvatar?: boolean }) {
  return (
    <>
      {withAvatar && <Avatar size={36} />}
      <span className="wordmark-text">
        {PROFILE.brand}
        <span className="accent">.</span>
      </span>
    </>
  );
}

export function LocalTime() {
  const { label, timeZone, utcLabel } = PROFILE.location;
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [timeZone]);
  return (
    <p className="local-time">
      <span className="pulse-dot" aria-hidden="true" />
      {label}
      <span className="time-value">
        <span className="sr-only">Local time </span>
        {time || utcLabel}
      </span>
    </p>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
  arrow = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      {arrow && <ArrowUpRight className="link-arrow" size={16} aria-hidden="true" />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    const delta = latest - lastY.current;
    lastY.current = latest;
    if (reducedMotion || open || latest < 160) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  useEffect(() => {
    setScrolled(window.scrollY > 24);
    const visible = new Set<string>();
    const sync = () => {
      const about = document.getElementById("about");
      if (about && window.scrollY < about.offsetTop - 200) return setActive("");
      const current = NAV_ITEMS.filter(({ id }) => visible.has(id)).pop();
      if (current) setActive(current.id);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id),
        );
        sync();
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", dismiss);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", dismiss);
      media.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <motion.header
      className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
      initial={reducedMotion ? false : { y: "-100%", opacity: 0 }}
      animate={{ y: hidden ? "-100%" : "0%", opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="shell header-inner">
        <a
          className="wordmark"
          href="#top"
          aria-label={`${PROFILE.brand}, back to top`}
          onClick={() => setOpen(false)}
        >
          <Wordmark withAvatar />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "location" : undefined}
            >
              <span className="nav-text">{label}</span>
              {active === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a className="button button-accent button-small header-cta" href="#contact">
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            className="menu-toggle"
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {NAV_ITEMS.map(({ id, label }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.05 + index * 0.04 }}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
