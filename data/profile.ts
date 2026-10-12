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
  highlights?: { lead: string; text: string }[];
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

export interface Strength {
  label: string;
  title: string;
  text: string;
  icon: "languages" | "relationship" | "coordination" | "technical" | "support" | "business";
}

export interface Post {
  date: string;
  topic: string;
  excerpt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
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
    education: { institution: string; degree: string; years: string; note?: string }[];
    community: { name: string; role: string; association: string }[];
  };
  strengths: {
    heading: string;
    rotating: string[];
    intro: string;
    items: Strength[];
    image: { src: string; alt: string; width: number; height: number };
  };
  services: { heading: Heading; intro: string; items: ServiceItem[] };
  experience: {
    heading: Heading;
    intro: string;
    entries: ExperienceEntry[];
    posts: { label: string; intro: string; url: string; items: Post[] };
  };
  companyPanel: {
    id: string;
    eyebrow: string;
    heading: Heading;
    summary: string;
    teammate: { label: string; url: string };
    logo: { src: string; alt: string; width: number; height: number };
    figuresLabel: string;
    figures: CompanyFigure[];
    source: { label: string; url: string };
  };
  process: { heading: Heading; intro: string; steps: ProcessStep[] };
  faq: { heading: Heading; intro: string; askLabel: string; items: FaqItem[] };
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
      "Day to day I work across marketing, client communication, business strategy and relationship management. In practice that means understanding what a business needs, keeping the requirements clear, and making sure everyone stays updated as the work moves.",
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
        degree: "Master of Business Administration (MBA), Management Studies",
        years: "Sep 2024 – Dec 2026",
        note: "Currently studying.",
      },
      {
        institution: "Bangladesh Army University of Engineering & Technology",
        degree: "Bachelor of Science, Computer Science & Engineering",
        years: "Nov 2017 – Dec 2021",
        note: "Completed. Coursework included C programming and HTML.",
      },
    ],
    // TODO: add organisations (name, role, association) if Farhan has any.
    community: [],
  },
  strengths: {
    heading: "What I bring",
    rotating: ["to your first call.", "to your brief.", "to every update."],
    intro:
      "A technical degree, a year on a customer support desk and daily work with a production team. Here is what that means when we work together.",
    items: [
      {
        label: "Communication",
        title: "English and Bengali",
        text: "Native Bengali and professional working English, for calls, briefs and updates.",
        icon: "languages",
      },
      {
        label: "Relationships",
        title: "Relationship first",
        text: "Clear expectations up front and regular updates after. I look after the relationship, not only the deal.",
        icon: "relationship",
      },
      {
        label: "Project coordination",
        title: "A direct line to the build team",
        text: "Every day I brief Exprovia's production team on project updates and the task requirements set by the Project Manager, so your requirements reach the people building your project.",
        icon: "coordination",
      },
      {
        label: "Technical background",
        title: "I speak developer",
        text: "A BSc in Computer Science & Engineering means I can follow the technical side of your project, ask the right questions and explain the answers in plain terms.",
        icon: "technical",
      },
      {
        label: "Customer care",
        title: "Trained on the support desk",
        text: "A year in customer service at bKash taught me to listen carefully and resolve issues before they escalate.",
        icon: "support",
      },
      {
        label: "Business focus",
        title: "Thinking like the client",
        text: "My MBA studies keep the focus on what the project has to achieve for your business.",
        icon: "business",
      },
    ],
    image: {
      src: "/images/farhan-profile.webp",
      alt: "Black-and-white side profile of Farhan Sadik Susmit, looking towards the light",
      width: 900,
      height: 1120,
    },
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
            highlights: [
              {
                lead: "Customer support",
                text: "Responded promptly to customer enquiries by phone and chat, keeping service quality high.",
              },
              {
                lead: "Issue resolution",
                text: "Identified, troubleshot and resolved customer issues efficiently, keeping escalations to a minimum.",
              },
            ],
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
    // Opening lines of Farhan's LinkedIn posts, quoted as they appear on his profile.
    posts: {
      label: "Recent posts",
      intro: "Short notes from LinkedIn, where I write about the work.",
      url: "https://www.linkedin.com/in/farhan-sadik-susmit-160646349/recent-activity/all/",
      items: [
        {
          date: "October 2026",
          topic: "On business development",
          excerpt: "The hardest part of business development isn't finding potential clients…",
        },
        {
          date: "May 2026",
          topic: "On four months at Exprovia",
          excerpt: "Almost 4 months at Exprovia and honestly time flew faster than our project deadlines!",
        },
      ],
    },
  },
  companyPanel: {
    id: "exprovia",
    // Official Exprovia logo: white wordmark and green mark on a transparent background.
    logo: {
      src: "/images/exprovia-logo.png",
      alt: "Exprovia, IT Solutions & Services",
      width: 500,
      height: 147,
    },
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
  faq: {
    heading: { lead: "Questions,", dim: "answered." },
    intro: "The things people usually ask before a first call.",
    askLabel: "Ask me something else",
    items: [
      {
        question: "Do I need a finished idea before we talk?",
        answer:
          "No. The discovery call is there to shape it. Bring the business goal and we work out the scope, timeline and budget together.",
      },
      {
        question: "Who actually builds the project?",
        answer:
          "Exprovia's production team in Rajshahi. I stay your point of contact and keep the team briefed on your requirements and feedback.",
      },
      {
        question: "Will I see a scope and cost before anything starts?",
        answer:
          "Yes. After the discovery call you receive a written scope and estimate to review before you decide.",
      },
      {
        question: "I'm outside Bangladesh. Can we still work together?",
        answer:
          "Yes. Exprovia builds software for clients worldwide, and you can reach me on WhatsApp, by email or on LinkedIn. My local time is shown next to the contact details.",
      },
      {
        question: "What is the quickest way to start?",
        answer:
          "Fill in the short brief below. It turns your answers into a message you can send me on WhatsApp, by email or on LinkedIn. Nothing is sent until you choose.",
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
