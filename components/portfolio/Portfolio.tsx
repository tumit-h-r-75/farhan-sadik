import { useEffect, useState, type CSSProperties } from "react";
import { MotionConfig } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  ChevronDown,
  Cloud,
  CodeXml,
  Database,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  Languages,
  MapPin,
  MessagesSquare,
  RefreshCw,
  Star,
  Users,
} from "lucide-react";
import { PROFILE, isKnown } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import CountUp from "@/components/react-bits/CountUp";
import LightRays from "@/components/react-bits/LightRays";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import TiltedCard from "@/components/react-bits/TiltedCard";
import { ContactSection } from "./ContactSection";
import {
  ExternalLink,
  Header,
  Magnetic,
  RailSection,
  Reveal,
  SplitHeading,
  Wordmark,
  scrollToSection,
} from "./Chrome";

// Accent colours, mirrored from the tokens in src/portfolio.css.
const ACCENT = "#c8471f"; // terracotta, on paper
const ACCENT_BRIGHT = "#ff8a5c"; // the same hue, lifted for the charcoal bands

const serviceIcons = { code: CodeXml, database: Database, globe: Globe, cloud: Cloud, bot: Bot };
const processIcons = { call: MessagesSquare, proposal: FileText, kickoff: Handshake, updates: RefreshCw };

// Stepper theme variables, matched to the paper palette.
const stepperTheme = {
  "--stepper-frame": "rgba(251, 249, 245, 0.9)",
  "--stepper-frame-edge": "rgba(23, 22, 20, 0.12)",
  "--stepper-frame-highlight": "rgba(255, 255, 255, 0.9)",
  "--stepper-frame-shadow": "0 30px 60px -36px rgba(40, 30, 20, 0.35)",
  "--stepper-tile": "linear-gradient(180deg, #ffffff 0%, #f6f2ea 100%)",
  "--stepper-tile-edge": "rgba(23, 22, 20, 0.1)",
  "--stepper-well": "rgba(23, 22, 20, 0.05)",
  "--stepper-ink": "#17161a",
  "--stepper-muted": "rgba(23, 22, 26, 0.66)",
  "--stepper-faint": "rgba(23, 22, 26, 0.22)",
} as CSSProperties;

function Hero() {
  const [first, second] = PROFILE.heroName;
  return (
    <section id="top" className="hero band-ink">
      <div className="hero-rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor={ACCENT_BRIGHT}
          raysSpeed={0.7}
          lightSpread={0.9}
          rayLength={1.5}
          fadeDistance={1.1}
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.06}
          distortion={0.04}
        />
      </div>
      <div className="shell hero-grid">
        <Reveal className="hero-visual" delay={0.25}>
          <div className="portrait">
            <span className="portrait-glow" aria-hidden="true" />
            <TiltedCard
              imageSrc={PROFILE.photo.portrait}
              altText={PROFILE.photo.alt}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.04}
              rotateAmplitude={9}
              showMobileWarning={false}
              showTooltip={false}
            />
          </div>
        </Reveal>
        <div className="hero-copy">
          <Reveal delay={0.1}>
            <span className="hero-pill">
              <span className="pulse-dot" aria-hidden="true" />
              <ShinyText
                text={`${PROFILE.role} at ${PROFILE.company}`}
                color="#cfcac2"
                shineColor="#ffffff"
                speed={2.6}
                delay={2}
              />
            </span>
          </Reveal>
          <h1 className="hero-title">
            <BlurText text={first} delay={110} direction="bottom" stepDuration={0.32} initialDelay={0.2} />{" "}
            <BlurText
              className="hero-title-accent"
              text={second}
              delay={110}
              direction="bottom"
              stepDuration={0.32}
              initialDelay={0.42}
            />
          </h1>
          <Reveal delay={0.5}>
            <p className="hero-lead">{PROFILE.hero.line}</p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.6}>
            <Magnetic>
              <a href="#contact" className="button button-accent">
                {PROFILE.hero.primaryCta} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Magnetic>
            <a href="#experience" className="button button-outline-light">
              {PROFILE.hero.secondaryCta} <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
      <div className="shell hero-foot">
        <a className="scroll-cue" href="#about">
          Scroll to explore
          <span className="scroll-cue-line" aria-hidden="true">
            <span />
          </span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function About() {
  const { statement, paragraph, skills, education, community, languages } = PROFILE.about;
  return (
    <RailSection id="about" number="01" label="About" className="about">
      <ScrollReveal
        containerClassName="about-statement"
        baseOpacity={0.14}
        baseRotation={1.5}
        blurStrength={6}
        rotationEnd="bottom 60%"
        wordAnimationEnd="bottom 60%"
      >
        {statement}
      </ScrollReveal>
      <div className="about-body">
        <Reveal>
          <p className="about-intro">{paragraph}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h3 className="column-label">Skills</h3>
          <ul className="skill-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div id="education" className="background-grid">
        <Reveal>
          <h3 className="column-label">
            <GraduationCap size={16} strokeWidth={1.6} aria-hidden="true" />
            Education
          </h3>
          <ul>
            {education.map((item) => (
              <li className="ledger-row" key={item.institution}>
                {isKnown(item.years) && <span className="ledger-meta">{item.years}</span>}
                <div>
                  <h4>{item.institution}</h4>
                  {isKnown(item.degree) && <p>{item.degree}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="background-stack">
          {community.length > 0 && (
            <div>
              <h3 className="column-label">
                <Users size={16} strokeWidth={1.6} aria-hidden="true" />
                Community & leadership
              </h3>
              <ul>
                {community.map((item) => (
                  <li className="ledger-row" key={item.name}>
                    <span className="ledger-meta">{item.role}</span>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.association}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="column-label">
              <Languages size={16} strokeWidth={1.6} aria-hidden="true" />
              Languages
            </h3>
            <ul>
              {languages.map((item, index) => (
                <li className="ledger-row" key={item.name}>
                  <span className="ledger-meta">0{index + 1}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.level}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </RailSection>
  );
}

function Services({ onDiscuss }: { onDiscuss: (service: string) => void }) {
  const { heading, intro, items } = PROFILE.services;
  return (
    <RailSection id="services" number="02" label="Services" className="services band-paper-deep">
      <div className="section-head">
        <SplitHeading heading={heading} />
        <Reveal delay={0.1}>
          <p>{intro}</p>
        </Reveal>
      </div>
      <ul className="service-grid">
        {items.map((service, index) => {
          const Icon = serviceIcons[service.icon];
          return (
            <li key={service.title} className="service-item">
              <Reveal className="service-reveal" delay={(index % 3) * 0.08}>
                <SpotlightCard
                  className="service-card"
                  theme="light"
                  spotlightColor={ACCENT}
                  intensity={0.45}
                  borderGlow={0.8}
                  spotlightSize={360}
                  style={
                    {
                      "--spotlight-card-surface": "var(--card)",
                      "--spotlight-card-border": "var(--line)",
                      "--spotlight-card-shadow": "none",
                    } as CSSProperties
                  }
                >
                  <div className="service-top">
                    <span className="service-number">0{index + 1}</span>
                    <span className="service-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <div className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button
                    className="service-cta"
                    type="button"
                    onClick={() => onDiscuss(service.title)}
                    aria-label={`Discuss ${service.title}`}
                  >
                    Let's talk
                    <ArrowUpRight className="service-cta-icon" size={17} strokeWidth={1.7} aria-hidden="true" />
                  </button>
                </SpotlightCard>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </RailSection>
  );
}

function Experience() {
  const { heading, intro, entries } = PROFILE.experience;
  return (
    <RailSection id="experience" number="03" label="Experience" className="experience">
      <div className="section-head">
        <SplitHeading heading={heading} />
        <Reveal delay={0.1}>
          <p>{intro}</p>
        </Reveal>
      </div>
      <div className="timeline">
        {entries.map((entry, index) => {
          const current = entry.roles[0].end === "Present";
          return (
            <Reveal key={entry.company} delay={index * 0.06}>
              <details className="experience-entry" open={index === 0 ? true : undefined}>
                <summary>
                  <span className="experience-dates">
                    <span className={`timeline-dot${current ? " current" : ""}`} aria-hidden="true" />
                    {entry.roles[entry.roles.length - 1].start} – {entry.roles[0].end}
                  </span>
                  <div className="experience-main">
                    <div className="experience-company-row">
                      <h3>{entry.company}</h3>
                      {current && <span className="current-badge">Current</span>}
                    </div>
                    <span className="experience-role-title">
                      {entry.roles[0].title} <span aria-hidden="true">·</span> {entry.type}
                    </span>
                  </div>
                  <span className="experience-chevron" aria-hidden="true">
                    <ChevronDown size={18} strokeWidth={1.6} />
                  </span>
                </summary>
                <div className="experience-details">
                  {entry.roles.map((role) => (
                    <div className="role-detail" key={role.title}>
                      <div className="role-heading">
                        <strong>{role.title}</strong>
                        <span>
                          {role.start} – {role.end}
                        </span>
                      </div>
                      {role.description && <p>{role.description}</p>}
                    </div>
                  ))}
                  {entry.location && (
                    <span className="role-location">
                      <MapPin size={13} aria-hidden="true" />
                      {entry.location}
                      {entry.workplace ? ` · ${entry.workplace}` : ""}
                    </span>
                  )}
                </div>
              </details>
            </Reveal>
          );
        })}
      </div>
    </RailSection>
  );
}

function Company() {
  const { id, eyebrow, heading, summary, teammate, figuresLabel, figures, source } = PROFILE.companyPanel;
  return (
    <section id={id} className="company band-ink" aria-label={PROFILE.company}>
      <div className="shell">
        <Reveal className="company-top">
          <div className="company-brand">
            <span className="eyebrow">{eyebrow}</span>
            <div className="company-wordmark">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3 2h11v11l-3.6-3.6L4.6 15.2 0.8 11.4l5.8-5.8z" />
              </svg>
              <span>{PROFILE.company.toLowerCase()}</span>
            </div>
          </div>
          <div className="company-copy">
            <SplitHeading className="company-heading" heading={heading} />
            <p>{summary}</p>
            {isKnown(teammate.url) && isKnown(teammate.label) && (
              <ExternalLink href={teammate.url} className="text-link">
                {teammate.label}
              </ExternalLink>
            )}
          </div>
        </Reveal>
        <Reveal className="company-proof" delay={0.1}>
          <span className="eyebrow">{figuresLabel}</span>
          <dl className="company-figures">
            {figures.map((figure) => (
              <div key={figure.label}>
                <dt>{figure.label}</dt>
                <dd>
                  <CountUp to={figure.value} duration={1.6} />
                  {figure.suffix}
                  {figure.rating && (
                    <>
                      <Star className="rating-star" size={26} aria-hidden="true" />
                      <span className="sr-only"> out of 5</span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <ExternalLink className="company-source" href={source.url}>
            {source.label}
          </ExternalLink>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const [step, setStep] = useState(1);
  const { heading, intro, steps } = PROFILE.process;
  return (
    <RailSection id="process" number="04" label="Process" className="process">
      <div className="section-head">
        <SplitHeading heading={heading} />
        <Reveal delay={0.1}>
          <p>{intro}</p>
        </Reveal>
      </div>
      <Reveal>
        <Stepper
          className="process-stepper"
          theme="light"
          step={step}
          onStepChange={setStep}
          onFinalStepCompleted={() => scrollToSection("contact")}
          width="100%"
          radius={14}
          accentColor={ACCENT}
          nextButtonText="Next step"
          completeButtonText="Start a conversation"
          style={stepperTheme}
        >
          {steps.map((item, index) => {
            const Icon = processIcons[item.icon];
            return (
              <Step key={item.title} title={item.title}>
                <div className="process-step">
                  <span className="process-step-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div className="process-step-body">
                    <span className="process-step-count">
                      <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                      Step {index + 1} of {steps.length}
                    </span>
                    <p>{item.text}</p>
                  </div>
                </div>
              </Step>
            );
          })}
        </Stepper>
      </Reveal>
    </RailSection>
  );
}

function Footer() {
  const { facebook, instagram } = PROFILE.social;
  const socials = [
    { label: "Facebook", href: facebook },
    { label: "Instagram", href: instagram },
  ].filter((item) => isKnown(item.href));
  return (
    <footer className="site-footer band-ink">
      <div className="shell footer-row">
        <a className="wordmark" href="#top" aria-label={`${PROFILE.brand}, back to top`}>
          <Wordmark />
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} {PROFILE.brand}
        </span>
        {socials.length > 0 && (
          <div className="footer-links">
            {socials.map((item) => (
              <ExternalLink key={item.label} href={item.href}>
                {item.label}
              </ExternalLink>
            ))}
          </div>
        )}
        <a href="#top" className="back-top">
          Back to top <ArrowUp size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [selectedService, setSelectedService] = useState("");

  // The page renders on the client, so a shared #section link needs a nudge.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" }));
  }, []);

  const discuss = (service: string) => {
    setSelectedService(service);
    scrollToSection("contact");
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    alternateName: PROFILE.brand,
    jobTitle: PROFILE.role,
    image: PROFILE.photo.portrait,
    email: `mailto:${PROFILE.contact.email}`,
    worksFor: { "@type": "Organization", name: PROFILE.company },
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location.city,
      addressCountry: PROFILE.location.countryCode,
    },
    sameAs: [PROFILE.contact.linkedin, PROFILE.social.facebook, PROFILE.social.instagram].filter(isKnown),
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services onDiscuss={discuss} />
        <Experience />
        <Company />
        <Process />
        <ContactSection service={selectedService} onServiceChange={setSelectedService} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }}
      />
    </MotionConfig>
  );
}
