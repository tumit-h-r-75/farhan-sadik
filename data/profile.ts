// Every piece of copy on the page lives here. Components only read from this file.
// Facts come from Farhan's LinkedIn profile and contact details. Anything still
// unknown is written as TODO and is hidden on the page until it is filled in.

export const TODO = "TODO";

/** True when a field has real content (not empty and not TODO). */
export const isKnown = (value: string | null | undefined): value is string =>
  Boolean(value && value.trim() && value.trim() !== TODO);

export interface Heading {
  lead: string;
  dim: string;
}

export interface ExperienceRole {
  title: string;
  start: string;
  end: string;
  description?: string;
}

export interface ExperienceEntry {
  company: string;
  type: string;
  workplace?: string;
  location?: string;
  roles: ExperienceRole[];
}

export interface ServiceItem {
  title: string;
  text: string;
  tags: string[];
  icon: "code" | "database" | "globe" | "cloud" | "bot";
}

export interface ProcessStep {
  title: string;
  text: string;
  icon: "call" | "proposal" | "kickoff" | "updates";
}

export interface CompanyFigure {
  value: number;
  suffix?: string;
  rating?: boolean;
  label: string;
}

export interface Profile {
  name: string;
  heroName: [string, string];
  brand: string;
  role: string;
  company: string;
  location: {
    label: string;
    city: string;
    countryCode: string;
    timeZone: string;
    utcLabel: string;
  };
  photo: { portrait: string; avatar: string; alt: string };
  contact: {
    whatsapp: string;
    email: string;
    linkedin: string;
    linkedinHandle: string;
  };
  social: { facebook: string; instagram: string };
  hero: { line: string; primaryCta: string; secondaryCta: string };
  about: {
    statement: string;
    paragraph: string;
    skills: string[];
    education: { institution: string; degree: string; years: string }[];
    community: { name: string; role: string; association: string }[];
    languages: { name: string; level: string }[];
  };
  services: { heading: Heading; intro: string; items: ServiceItem[] };
  experience: { heading: Heading; intro: string; entries: ExperienceEntry[] };
  companyPanel: {
    id: string;
    eyebrow: string;
    heading: Heading;
    summary: string;
    teammate: { label: string; url: string };
    figuresLabel: string;
    figures: CompanyFigure[];
    source: { label: string; url: string };
  };
  process: { heading: Heading; intro: string; steps: ProcessStep[] };
  contactSection: {
    heading: [string, string, string];
    intro: string;
    formTitle: string;
    formIntro: string;
    timelines: string[];
  };
}

export const PROFILE: Profile = {
  name: "Farhan Sadik Susmit",
  heroName: ["Farhan Sadik", "Susmit."],
  brand: "Farhan",
  role: "Business Development Executive",
  company: "Exprovia",
  location: {
    label: "Rajshahi, Bangladesh",
    city: "Rajshahi",
    countryCode: "BD",
    timeZone: "Asia/Dhaka",
    utcLabel: "UTC+6",
  },
  photo: {
    portrait: "/images/farhan-portrait.webp",
    avatar: "/images/farhan-avatar.webp",
    alt: "Farhan Sadik Susmit, Business Development Executive at Exprovia",
  },
  contact: {
    // Listed on LinkedIn as a work phone. Used here as the WhatsApp number.
    whatsapp: "+880 1714-475386",
    email: "farhansusmit@gmail.com",
    linkedin: "https://www.linkedin.com/in/farhan-sadik-susmit-160646349/",
    linkedinHandle: "in/farhan-sadik-susmit",
  },
  social: {
    facebook: "https://www.facebook.com/farhan.sadik.98031",
    instagram: "https://www.instagram.com/farhansusmit/",
  },
  hero: {
    line: "You know what your business needs. I make sure the team building it understands it too, from the first call to delivery.",
    primaryCta: "Let's discuss your project",
    secondaryCta: "My journey",
  },
  about: {
    statement:
      "Good projects start with being understood. I listen first, then make sure the right people hear it.",
    paragraph:
      "My work sits between clients and the people who build for them: understanding what a business needs, keeping requirements clear, and keeping everyone updated as the work moves. Studying computer science, supporting customers and now studying business have taught me the same lesson from three sides: projects go well when people understand each other.",
    skills: [
      "Business Development",
      "Business Strategy",
      "Customer Relationship Management (CRM)",
      "Marketing",
      "Communication",
      "Customer Service",
      "Customer Support",
      "Data Analysis",
      "Data Entry",
    ],
    education: [
      {
        institution: "Rajshahi University",
        degree: "MBA, Management Studies (in progress)",
        years: "2024 – 2026",
      },
      {
        institution: "Bangladesh Army University of Engineering & Technology",
        degree: "BSc, Computer Science & Engineering",
        years: "2017 – 2021",
      },
    ],
    // TODO: add organisations (name, role, association) if Farhan has any.
    community: [],
    languages: [
      { name: "Bengali", level: "Native or bilingual" },
      { name: "English", level: "Professional working proficiency" },
    ],
  },
  services: {
    heading: { lead: "Your next project.", dim: "Scoped clearly." },
    intro:
      "You bring the business goal. I help shape a clear brief and connect it with the Exprovia team that can build it.",
    items: [
      {
        title: "Web Applications",
        text: "From a first idea to a custom web application, matched with the right development team.",
        tags: ["Next.js", "React", "Custom platforms"],
        icon: "code",
      },
      {
        title: "Backend and APIs",
        text: "Reliable backends, APIs and integrations that connect the systems behind your business.",
        tags: ["Node.js", "PostgreSQL", "Integrations"],
        icon: "database",
      },
      {
        title: "WordPress Websites",
        text: "A website that works for your business, from a company presence to an online store.",
        tags: ["WordPress", "E-commerce", "Custom builds"],
        icon: "globe",
      },
      {
        title: "Cloud and DevOps",
        text: "A clear plan for hosting, deployment and stable releases.",
        tags: ["AWS", "Deployment", "Infrastructure"],
        icon: "cloud",
      },
      {
        title: "AI and Automation",
        text: "AI agents and workflow automation that cut repetitive, manual work.",
        tags: ["AI agents", "Workflows", "Integrations"],
        icon: "bot",
      },
    ],
  },
  experience: {
    heading: { lead: "Every role.", dim: "Closer to the client." },
    intro:
      "Each step has brought me closer to the people a project is for, and taught me to listen properly before I answer.",
    entries: [
      {
        company: "Exprovia",
        type: "Full-time",
        workplace: "On-site",
        location: "Rajshahi, Bangladesh",
        roles: [
          {
            title: "Business Development Executive",
            start: "May 2026",
            end: "Present",
            description:
              "Coordinating with the production team: explaining daily project updates and the task requirements set by the Project Manager.",
          },
          {
            title: "Business Development Intern",
            start: "Jan 2026",
            end: "Apr 2026",
          },
        ],
      },
      {
        company: "bKash Limited",
        type: "Full-time",
        workplace: "On-site",
        location: "Dhaka, Bangladesh",
        roles: [
          {
            title: "Customer Service Specialist",
            start: "Aug 2021",
            end: "Jul 2022",
            description:
              "Answered customer enquiries by phone and chat, and identified, troubleshot and resolved issues to keep escalations low.",
          },
        ],
      },
      {
        company: "Bangladesh Telecommunications Company Limited (BTCL)",
        type: "Internship",
        workplace: "On-site",
        location: "Dhaka, Bangladesh",
        roles: [
          {
            title: "Intern",
            start: "Feb 2019",
            end: "Mar 2019",
          },
        ],
      },
    ],
  },
  companyPanel: {
    id: "exprovia",
    eyebrow: "The team behind the conversation",
    heading: { lead: "You talk to me.", dim: "A full team delivers." },
    summary:
      "Exprovia is a web development agency from Rajshahi, building and running software for clients worldwide. I work with clients on the business side and keep the production team up to date on what each project needs.",
    // TODO: optional link to a teammate's page, e.g. "Meet our Technical Project Manager".
    teammate: { label: TODO, url: TODO },
    figuresLabel: "Exprovia, as a company",
    figures: [
      { value: 350, suffix: "+", label: "Projects delivered" },
      { value: 20, suffix: "+", label: "Countries served" },
      { value: 4.9, rating: true, label: "Rating on Fiverr and Upwork" },
    ],
    source: {
      label: "Source: Abdur Rakib, Strategic Advisor at Exprovia",
      url: "https://www.rakib.xyz/#experience",
    },
  },
  process: {
    heading: { lead: "Less guesswork.", dim: "More clarity." },
    intro:
      "A simple way to explore a project together, even if your idea is still taking shape.",
    steps: [
      {
        title: "Discovery call",
        text: "We talk through your goals, timeline and budget, so the project starts with a clear direction.",
        icon: "call",
      },
      {
        title: "Clear proposal",
        text: "You receive a written scope and estimate to review before you decide anything.",
        icon: "proposal",
      },
      {
        title: "Kickoff",
        text: "I introduce you to the Exprovia team building your project and hand over your requirements.",
        icon: "kickoff",
      },
      {
        title: "Regular updates",
        text: "I keep you posted on progress and take your feedback back to the team until delivery.",
        icon: "updates",
      },
    ],
  },
  contactSection: {
    heading: ["Big things start", "with a simple", "hello."],
    intro:
      "Have an idea, a business problem or a project in mind? Tell me about it and we'll work out the next step together.",
    formTitle: "Tell me what you're planning.",
    formIntro:
      "Write a short brief, then send it to me on WhatsApp, by email or on LinkedIn.",
    timelines: [
      "Flexible",
      "As soon as possible",
      "Within a month",
      "In the next 3 months",
      "Just exploring",
    ],
  },
};
