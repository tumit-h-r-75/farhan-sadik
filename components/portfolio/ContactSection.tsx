import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Send, X } from "lucide-react";
import { PROFILE, isKnown } from "@/data/profile";
import BlurText from "@/components/react-bits/BlurText";
import GlareHover from "@/components/react-bits/GlareHover";
import Particles from "@/components/react-bits/Particles";
import { ExternalLink, LinkedInIcon, LocalTime, Reveal, SectionLabel } from "./Chrome";

const { whatsapp, email, linkedin, linkedinHandle } = PROFILE.contact;
const hasWhatsApp = isKnown(whatsapp);
const hasEmail = isKnown(email);
const hasLinkedIn = isKnown(linkedin);

const whatsappUrl = (text?: string) =>
  `https://wa.me/${whatsapp.replace(/\D/g, "")}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const emailUrl = (body?: string) =>
  `mailto:${email}${
    body ? `?subject=${encodeURIComponent("Project brief")}&body=${encodeURIComponent(body)}` : ""
  }`;

const channels = [
  hasWhatsApp && { name: "WhatsApp", detail: whatsapp, href: whatsappUrl(), icon: <MessageCircle size={20} strokeWidth={1.6} />, external: true },
  hasLinkedIn && { name: "LinkedIn", detail: linkedinHandle, href: linkedin, icon: <LinkedInIcon size={19} />, external: true },
  hasEmail && { name: "Email", detail: email, href: emailUrl(), icon: <Mail size={20} strokeWidth={1.6} />, external: false },
].filter((channel) => channel !== false);

const sendOptions = [hasWhatsApp && "WhatsApp", hasEmail && "email", hasLinkedIn && "LinkedIn"].filter(Boolean);

export function ContactSection({
  service,
  onServiceChange,
}: {
  service: string;
  onServiceChange: (value: string) => void;
}) {
  const { heading, intro, formTitle, formIntro, timelines } = PROFILE.contactSection;
  const [brief, setBrief] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (brief && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [brief]);

  const createBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const business = String(form.get("business") || "").trim();
    const replyEmail = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();
    const messageInput = formElement.elements.namedItem("message") as HTMLTextAreaElement;
    messageInput.setCustomValidity(
      message.length < 10 ? "Please add at least 10 characters about your project." : "",
    );
    if (!name || message.length < 10 || !formElement.checkValidity()) {
      formElement.reportValidity();
      return;
    }
    setCopyStatus("idle");
    setBrief(
      [
        `Hi ${PROFILE.brand}, I'd like to discuss a project.`,
        "",
        `Name: ${name}`,
        ...(business ? [`Business / website: ${business}`] : []),
        ...(replyEmail ? [`Reply email: ${replyEmail}`] : []),
        `Interested in: ${service || "Let's explore the right solution"}`,
        `Timeline: ${String(form.get("timeline") || timelines[0])}`,
        "",
        "Project overview:",
        message,
        "",
        "Could we discuss the next steps?",
      ].join("\n"),
    );
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setBrief("");
    submitRef.current?.focus();
  };

  return (
    <section id="contact" className="section contact band-ink">
      <div className="contact-particles" aria-hidden="true">
        <Particles
          particleColors={["#ff8a5c", "#f6f2ea", "#a39f98"]}
          particleCount={260}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={110}
          sizeRandomness={1}
          alphaParticles
        />
      </div>
      <div className="shell">
        <SectionLabel number="05">Contact</SectionLabel>
        <div className="contact-grid">
          <div className="contact-intro">
            <h2 className="contact-title">
              <BlurText text={heading[0]} delay={80} direction="bottom" />{" "}
              <BlurText text={heading[1]} delay={80} direction="bottom" initialDelay={0.15} />{" "}
              <BlurText className="accent" text={heading[2]} delay={80} direction="bottom" initialDelay={0.3} />
            </h2>
            <Reveal delay={0.15}>
              <p>{intro}</p>
            </Reveal>
            <Reveal className="channels" delay={0.2}>
              {channels.map(({ name, detail, href, icon, external }) => (
                <GlareHover
                  key={name}
                  className="channel-card"
                  width="100%"
                  background="var(--ink-2)"
                  borderColor="var(--ink-line)"
                  borderRadius="12px"
                  glareColor="#ff8a5c"
                  glareOpacity={0.3}
                  glareSize={45}
                  variant="sheen"
                >
                  <a
                    className="channel"
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <span className="channel-icon" aria-hidden="true">
                      {icon}
                    </span>
                    <span className="channel-text">
                      <strong>{name}</strong>
                      <span>{detail}</span>
                    </span>
                    <ArrowUpRight className="channel-arrow" size={18} aria-hidden="true" />
                    {external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </GlareHover>
              ))}
            </Reveal>
            <Reveal delay={0.25}>
              <LocalTime />
            </Reveal>
          </div>
          <Reveal className="brief-panel" delay={0.1}>
            <div className="brief-panel-heading">
              <span className="eyebrow">A little context goes a long way</span>
              <Send size={16} strokeWidth={1.6} aria-hidden="true" />
            </div>
            <h3>{formTitle}</h3>
            <p className="form-intro">{formIntro}</p>
            <form onSubmit={createBrief} noValidate>
              <div className="form-row">
                <label>
                  Your name <span className="required">*</span>
                  <input
                    name="name"
                    placeholder="What should I call you?"
                    autoComplete="name"
                    required
                    maxLength={100}
                    pattern=".*\S.*"
                  />
                </label>
                <label>
                  Work email <span className="optional">optional</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Where can I reach you?"
                    autoComplete="email"
                    maxLength={200}
                  />
                </label>
              </div>
              <label>
                Business or website <span className="optional">optional</span>
                <input
                  name="business"
                  placeholder="A little about your business"
                  autoComplete="organization"
                  maxLength={200}
                />
              </label>
              <div className="form-row">
                <label>
                  What do you need?
                  <select name="service" value={service} onChange={(event) => onServiceChange(event.target.value)}>
                    <option value="">Let's explore</option>
                    {PROFILE.services.items.map(({ title }) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Your timeline
                  <select name="timeline" defaultValue={timelines[0]}>
                    {timelines.map((timeline) => (
                      <option key={timeline}>{timeline}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Your project <span className="required">*</span>
                <textarea
                  name="message"
                  placeholder="What's the goal? What would a good outcome look like?"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                />
              </label>
              <button ref={submitRef} type="submit" className="button button-accent form-submit">
                Prepare my project brief <ArrowUpRight size={18} aria-hidden="true" />
              </button>
              <span className="form-note">Your brief stays on your device until you send it.</span>
            </form>
          </Reveal>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="brief-dialog"
        aria-labelledby="brief-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => setBrief("")}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="dialog-content">
          <button type="button" className="dialog-close" onClick={closeDialog} aria-label="Close project brief">
            <X size={19} />
          </button>
          <span className="eyebrow">The first conversation, made easier</span>
          <h2 id="brief-dialog-title">Your brief is ready.</h2>
          <p>Send it to me on {sendOptions.join(", ").replace(/, ([^,]*)$/, " or $1")}. Nothing is sent until you choose.</p>
          <label className="sr-only" htmlFor="prepared-brief">
            Prepared project brief
          </label>
          <textarea
            id="prepared-brief"
            className="prepared-brief"
            value={brief}
            readOnly
            rows={11}
            onFocus={(event) => event.currentTarget.select()}
          />
          <div className="dialog-actions">
            {hasWhatsApp && (
              <a className="button button-accent" href={whatsappUrl(brief)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} aria-hidden="true" />
                Send on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {hasEmail && (
              <a className="button button-outline" href={emailUrl(brief)}>
                <Mail size={17} aria-hidden="true" />
                Send by email
              </a>
            )}
            <button type="button" className="button button-outline" onClick={copyBrief}>
              {copyStatus === "copied" ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
              {copyStatus === "copied" ? "Brief copied" : "Copy project brief"}
            </button>
            {hasLinkedIn && (
              <ExternalLink className="button button-outline" href={linkedin} arrow={false}>
                <LinkedInIcon size={16} />
                Open {PROFILE.brand}'s LinkedIn
              </ExternalLink>
            )}
          </div>
          <p className="copy-status" role="status">
            {copyStatus === "copied"
              ? "Copied. You can paste your brief into a LinkedIn message."
              : copyStatus === "error"
                ? "Select the brief above and copy it with Ctrl+C or your device's copy menu."
                : "Your brief is prepared on this device. Share it when you're ready."}
          </p>
        </div>
      </dialog>
    </section>
  );
}
