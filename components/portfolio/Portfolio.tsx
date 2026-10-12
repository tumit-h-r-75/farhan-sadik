import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  ChevronDown,
  Cloud,
  CodeXml,
  Database,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  Headset,
  HeartHandshake,
  Languages,
  MapPin,
  MessagesSquare,
  Plus,
  RefreshCw,
  SquareTerminal,
  Star,
  Users,
  Workflow,
} from "lucide-react";
import { PROFILE, isKnown } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import Counter from "@/components/react-bits/Counter";
import GlareHover from "@/components/react-bits/GlareHover";
import Aurora from "@/components/react-bits/Aurora";
import Noise from "@/components/react-bits/Noise";
import RotatingText from "@/components/react-bits/RotatingText";
import ScrollReveal from "@/components/react-bits/ScrollReveal";
import ShinyText from "@/components/react-bits/ShinyText";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import StarBorder from "@/components/react-bits/StarBorder";
import TargetCursor from "@/components/react-bits/TargetCursor";
import Stepper, { Step } from "@/components/react-bits/Stepper";
import Threads from "@/components/react-bits/Threads";
import TiltedCard from "@/components/react-bits/TiltedCard";
import Waves from "@/components/react-bits/Waves";
import { ContactSection } from "./ContactSection";
import {
  ExternalLink,
  Header,
  LinkedInIcon,
  Magnetic,
  RailSection,
  Reveal,
  SplitHeading,
  Wordmark,
  scrollToSection,
} from "./Chrome";

// Accent colours, mirrored from the tokens in src/portfolio.css.
const ACCENT = "#42089e"; // primary purple, on paper
const ACCENT_BRIGHT = "#a77bff"; // the same purple, lifted for the navy bands

const serviceIcons = { code: CodeXml, database: Database, globe: Globe, cloud: Cloud, bot: Bot };
const processIcons = { call: MessagesSquare, proposal: FileText, kickoff: Handshake, updates: RefreshCw };
const strengthIcons = {
  languages: Languages,
  relationship: HeartHandshake,
  coordination: Workflow,
  technical: SquareTerminal,
  support: Headset,
  business: BriefcaseBusiness,
};

// Stepper theme variables, matched to the paper palette.
const stepperTheme = {
  "--stepper-frame": "rgba(252, 251, 255, 0.92)",
  "--stepper-frame-edge": "rgba(20, 16, 40, 0.12)",
  "--stepper-frame-highlight": "rgba(255, 255, 255, 0.9)",
  "--stepper-frame-shadow": "0 30px 60px -36px rgba(40, 20, 90, 0.3)",
  "--stepper-tile": "linear-gradient(180deg, #ffffff 0%, #f3f1fa 100%)",
  "--stepper-tile-edge": "rgba(20, 16, 40, 0.1)",
  "--stepper-well": "rgba(20, 16, 40, 0.05)",
  "--stepper-ink": "#14121f",
  "--stepper-muted": "rgba(20, 18, 31, 0.66)",
  "--stepper-faint": "rgba(20, 18, 31, 0.22)",
} as CSSProperties;

/** Scroll-linked depth for the hero, on wide screens with normal motion only. */
function useHeroParallax() {
  const reducedMotion = useReducedMotion();
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 901px)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const { scrollY } = useScroll();
  const copyY = useTransform(scrollY, [0, 900], [0, -140]);
  const copyOpacity = useTransform(scrollY, [0, 650], [1, 0]);
  const portraitY = useTransform(scrollY, [0, 900], [0, 90]);
  const portraitScale = useTransform(scrollY, [0, 900], [1, 0.92]);
  const dim = useTransform(scrollY, [0, 900], [0, 0.7]);
  const enabled = wide && !reducedMotion;
  return {
    wide,
    copy: enabled ? { y: copyY, opacity: copyOpacity } : undefined,
    portrait: enabled ? { y: portraitY, scale: portraitScale } : undefined,
    dim: enabled ? { opacity: dim } : { opacity: 0 },
  };
}

function Hero() {
  const [first, second] = PROFILE.heroName;
  const parallax = useHeroParallax();
  return (
    <section className="hero band-ink" aria-label="Introduction">
      <div className="hero-aurora" aria-hidden="true">
        <Aurora
          colorStops={["#42089e", "#3b5bff", "#8b5cf6"]}
          amplitude={1.15}
          blend={0.6}
          speed={0.7}
          height={0.44}
          glow={0.85}
          brightness={1.15}
          layers={2}
          direction="top"
          mouseInteraction
          intro
          dpr={1}
        />
      </div>
      <div className="shell hero-grid">
        <Reveal className="hero-visual" delay={0.25}>
          <motion.div className="portrait" style={parallax.portrait}>
            <span className="portrait-glow" aria-hidden="true" />
            <TiltedCard
              imageSrc={PROFILE.photo.portrait}
              altText={PROFILE.photo.alt}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={false}
            />
          </motion.div>
        </Reveal>
        <motion.div className="hero-copy" style={parallax.copy}>
          <Reveal delay={0.1}>
            <span className="hero-pill">
              <span className="pulse-dot" aria-hidden="true" />
              <ShinyText
                text={`${PROFILE.role} at ${PROFILE.company}`}
                color="#cfcde3"
                shineColor="#ffffff"
                speed={2.6}
                delay={2}
              />
            </span>
          </Reveal>
          <h1 className="hero-title">
            <BlurText
              text={first}
              animateBy={parallax.wide ? "letters" : "words"}
              delay={parallax.wide ? 45 : 110}
              direction="bottom"
              stepDuration={0.34}
              initialDelay={0.2}
            />{" "}
            <BlurText
              className="hero-title-accent"
              text={second}
              animateBy={parallax.wide ? "letters" : "words"}
              delay={parallax.wide ? 55 : 110}
              direction="bottom"
              stepDuration={0.34}
              initialDelay={parallax.wide ? 0.75 : 0.42}
            />
          </h1>
          <Reveal delay={0.5}>
            <p className="hero-lead">{PROFILE.hero.line}</p>
          </Reveal>
          <Reveal className="hero-actions" delay={0.6}>
            <Magnetic>
              <StarBorder
                as="a"
                href="#contact"
                className="button hero-cta"
                backgroundColor="var(--accent)"
                textColor="#ffffff"
                borderColor="rgba(255, 255, 255, 0.16)"
                color="#efe6ff"
                trailColor={ACCENT_BRIGHT}
                radius={6}
                thickness={2}
                duration={4}
                glow={1}
                sparkle
              >
                {PROFILE.hero.primaryCta} <ArrowUpRight size={18} aria-hidden="true" />
              </StarBorder>
            </Magnetic>
            <a href="#experience" className="button button-outline-light">
              {PROFILE.hero.secondaryCta} <ArrowDownRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </motion.div>
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
      <motion.span className="hero-dim" style={parallax.dim} aria-hidden="true" />
    </section>
  );
}

function About() {
  const { statement, paragraph, skills, education, community } = PROFILE.about;
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
      <div id="education" className="education-block">
        <Reveal>
          <h3 className="column-label">
            <GraduationCap size={16} strokeWidth={1.6} aria-hidden="true" />
            Education
          </h3>
          <ul>
            {education.map((item) => (
              <li className="education-row" key={item.institution}>
                {isKnown(item.years) && <span className="ledger-meta">{item.years}</span>}
                <div>
                  <h4>{item.institution}</h4>
                  {isKnown(item.degree) && <p>{item.degree}</p>}
                </div>
                {item.note && <p className="education-note">{item.note}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
        {community.length > 0 && (
          <Reveal delay={0.1}>
            <h3 className="column-label">
              <Users size={16} strokeWidth={1.6} aria-hidden="true" />
              Community & leadership
            </h3>
            <ul>
              {community.map((item) => (
                <li className="education-row" key={item.name}>
                  <span className="ledger-meta">{item.role}</span>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.association}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </RailSection>
  );
}

function Strengths() {
  const { heading, rotating, intro, items, image } = PROFILE.strengths;
  const rotatingRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rotatingRef, { amount: 0.8 });
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.04, 1.1]);
  return (
    <RailSection id="strengths" number="02" label="Strengths" className="strengths band-ink" bright>
      <div ref={gridRef} className="strengths-grid">
        <div className="strengths-head">
          <h2 className="split-heading">
            <BlurText text={heading} delay={70} direction="bottom" stepDuration={0.3} />{" "}
            <span ref={rotatingRef} className="dim strengths-rotating">
              {reducedMotion ? (
                rotating[0]
              ) : (
                <RotatingText
                  texts={rotating}
                  auto={inView}
                  loop={false}
                  rotationInterval={2400}
                  splitBy="characters"
                  staggerDuration={0.018}
                  staggerFrom="first"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  mainClassName="strengths-rotating-text"
                />
              )}
            </span>
          </h2>
          <Reveal delay={0.1}>
            <p>{intro}</p>
          </Reveal>
        </div>
        <figure className="strengths-figure">
          <motion.img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            decoding="async"
            style={reducedMotion ? undefined : { y: imageY, scale: imageScale }}
          />
        </figure>
        <ol className="strengths-list">
          {items.map((item, index) => {
            const Icon = strengthIcons[item.icon];
            return (
              <li key={item.title} className="strength">
                <Reveal delay={0.04}>
                  <div className="strength-head">
                    <span className="strength-number" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className="strength-label">{item.label}</span>
                    <span className="strength-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.5} />
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </RailSection>
  );
}

function Services({ onDiscuss }: { onDiscuss: (service: string) => void }) {
  const { heading, intro, items } = PROFILE.services;
  return (
    <RailSection id="services" number="03" label="Services" className="services band-paper-deep">
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
                  intensity={1}
                  borderGlow={1}
                  spotlightSize={380}
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
  const { heading, intro, entries, posts } = PROFILE.experience;
  return (
    <RailSection id="experience" number="04" label="Experience" className="experience">
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
                      {role.highlights && (
                        <ul className="role-highlights">
                          {role.highlights.map((highlight) => (
                            <li key={highlight.lead}>
                              <strong>{highlight.lead}.</strong> {highlight.text}
                            </li>
                          ))}
                        </ul>
                      )}
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
      <div className="posts">
        <Reveal className="posts-head">
          <h3 className="column-label">
            <LinkedInIcon size={14} />
            {posts.label}
          </h3>
          <p>{posts.intro}</p>
        </Reveal>
        <ul className="post-grid">
          {posts.items.map((post, index) => (
            <li key={post.date}>
              <Reveal className="post-reveal" delay={index * 0.08}>
                <GlareHover
                  className="post-card"
                  width="100%"
                  height="100%"
                  background="var(--card)"
                  borderColor="var(--line)"
                  borderRadius="12px"
                  glareColor="#42089e"
                  glareOpacity={0.16}
                  glareSize={60}
                  variant="sheen"
                >
                  <figure className="post">
                    <figcaption className="post-meta">
                      <span>{post.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{post.topic}</span>
                    </figcaption>
                    <blockquote className="post-quote">“{post.excerpt}”</blockquote>
                    <ExternalLink href={posts.url} className="post-link">
                      Read on LinkedIn
                    </ExternalLink>
                  </figure>
                </GlareHover>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </RailSection>
  );
}

/** Digit places for Counter, e.g. 350 -> [100, 10, 1], 4.9 -> [1, ".", 0.1]. */
function placesFor(value: number): (number | ".")[] {
  const text = value.toString();
  const dot = text.indexOf(".");
  return [...text].map((ch, i) => {
    if (ch === ".") return ".";
    const exponent = dot === -1 ? text.length - i - 1 : i < dot ? dot - i - 1 : -(i - dot);
    return 10 ** exponent;
  });
}

function useFigureSize() {
  const [size, setSize] = useState(96);
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      setSize(width <= 640 ? 64 : Math.round(Math.min(112, Math.max(64, width * 0.07))));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

function RollingFigure({ value, fontSize }: { value: number; fontSize: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const places = useMemo(() => placesFor(value), [value]);
  return (
    <span ref={ref} className="figure-roll">
      <Counter
        value={inView || reducedMotion ? value : 0}
        places={places}
        fontSize={fontSize}
        padding={6}
        gap={0}
        horizontalPadding={0}
        borderRadius={0}
        gradientHeight={0}
        textColor="inherit"
        fontWeight={400}
      />
    </span>
  );
}

function Company() {
  const { id, eyebrow, heading, summary, teammate, logo, figuresLabel, figures, source } = PROFILE.companyPanel;
  const figureSize = useFigureSize();
  return (
    <section id={id} className="company band-ink" aria-label={PROFILE.company}>
      <div className="company-threads" aria-hidden="true">
        <Threads
          color={ACCENT_BRIGHT}
          accentColor="#6f8cff"
          amplitude={1.7}
          distance={0.36}
          lineCount={80}
          thickness={0.8}
          speed={0.55}
          angle={-10}
          brightness={1.3}
          fade={0.3}
          opacity={0.75}
          enableMouseInteraction
        />
      </div>
      <div className="shell">
        <Reveal className="company-top">
          <div className="company-brand">
            <span className="eyebrow">{eyebrow}</span>
            <img
              className="company-logo"
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              decoding="async"
            />
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
                  <span className="figure-visual" aria-hidden="true">
                    <RollingFigure value={figure.value} fontSize={figureSize} />
                    {figure.suffix}
                    {figure.rating && <Star className="rating-star" size={26} />}
                  </span>
                  <span className="sr-only">
                    {figure.value}
                    {figure.suffix}
                    {figure.rating ? " out of 5" : ""}
                  </span>
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
    <RailSection
      id="process"
      number="05"
      label="Process"
      className="process"
      background={
        <Waves
          lineColor="rgba(66, 8, 158, 0.16)"
          backgroundColor="transparent"
          waveSpeedX={0.016}
          waveSpeedY={0.006}
          waveAmpX={44}
          waveAmpY={22}
          xGap={14}
          yGap={36}
          friction={0.925}
          tension={0.005}
          maxCursorMove={110}
        />
      }
    >
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

function Faq() {
  const { heading, intro, askLabel, items } = PROFILE.faq;
  return (
    <RailSection id="faq" number="06" label="FAQ" className="faq band-paper-deep">
      <div className="faq-grid">
        <div className="faq-intro">
          <SplitHeading heading={heading} />
          <Reveal delay={0.1}>
            <p>{intro}</p>
            <a href="#contact" className="text-link faq-ask">
              {askLabel} <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
        <div className="faq-list">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="faq-item" open={index === 0 ? true : undefined}>
                <summary>
                  <span className="faq-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{item.question}</h3>
                  <span className="faq-icon" aria-hidden="true">
                    <Plus size={18} strokeWidth={1.6} />
                  </span>
                </summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
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
      <Noise fixed opacity={0.02} fps={8} blendMode="overlay" contrast={0.45} zIndex={70} />
      <TargetCursor
        targetSelector="a, button, summary, select, input, textarea"
        cursorColor="#ffffff"
        blendMode="difference"
        spinDuration={3}
        hoverDuration={0.22}
        size={34}
        cornerSize={11}
        thickness={2}
        padding={6}
        dotSize={5}
        showLabel={false}
        parallaxOn
        clickEffect
      />
      <main id="main-content">
        <div id="top" className="curtain">
          <Hero />
          <About />
        </div>
        <Strengths />
        <Services onDiscuss={discuss} />
        <Experience />
        <Company />
        <Process />
        <Faq />
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
