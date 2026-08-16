import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      heroHeadline: "I build digital products.",
      heroSubtext:
        "I engineer scalable web products with clean interfaces and solid full-stack architecture.",
      bio:
        "I'm Talha, a full-stack developer who loves building things for the web.\n\nI enjoy turning complex problems into simple, well-architected solutions — from backend systems to the interfaces people actually use.\n\nWhen I'm not coding, you'll probably find me deep in classical Urdu poetry or a good historical drama.",
      email: "hello@mtalha.me",
      location: "Lahore, Pakistan",
      availability: "Open for new projects",
      githubUrl: "https://github.com/happiestt-talha"
    }
  });

  await db.experience.createMany({
    data: [
      {
        company: "DigiTeam Solutions",
        role: "Full Stack Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2026-08-17"),
        endDate: null,
        bullets: [
          "Building and maintaining full-stack web applications across the product suite.",
          "Working with React/Next.js, Node.js/NestJS, and PostgreSQL in a production environment."
        ],
        order: 0
      },
      {
        company: "Self-Employed",
        role: "Freelance Full-Stack Developer",
        location: "Remote",
        startDate: new Date("2025-10-01"),
        endDate: new Date("2026-08-16"),
        bullets: [
          "Migrated stillroomproductions.com from a React/Vite SPA to Next.js 15 App Router, implementing SSR, full technical SEO (sitemap, JSON-LD, Open Graph), and resolving canonical/redirect conflicts on Vercel — now ranking #1 for target keywords.",
          "Delivered an SEO-focused Next.js site for geraldgyimah.com with JSON-LD structured data, canonical URLs, sitemap configuration, and Google Search Console setup, including a hash-anchor navigation architecture decision made to preserve SEO equity.",
          "Delivered client web applications end to end as sole developer — requirements scoping, React/Next.js frontends, Django or Node.js/Express backends, database design, deployment, and handoff — across multiple independent engagements."
        ],
        order: 1
      },
      {
        company: "Penova Tech",
        role: "Full-Stack Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-09-30"),
        bullets: [
          "Built and shipped PenTutor, a solo-built tutoring marketplace with Django REST Framework, Next.js, PostgreSQL, Docker, and CI/CD.",
          "Implemented JWT/OAuth2 authentication, integrated a payment gateway, and built access-gated PDF resource delivery.",
          "Containerized the application with Docker and deployed to a Linux VPS behind Nginx with SSL; configured CI/CD with GitHub Actions."
        ],
        order: 2
      },
      {
        company: "Connect Solutions",
        role: "Full Stack Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2023-11-01"),
        endDate: new Date("2025-02-28"),
        bullets: [
          "Built a custom CMS in Next.js with SSR/SSG, independently owning both frontend and backend.",
          "Delivered responsive, cross-browser frontends for international clients across 6+ projects over 15 months.",
          "Managed deployments via Git/GitHub, Vercel, and GitHub Actions, and triaged production issues."
        ],
        order: 3
      },
      {
        company: "Dextrologix",
        role: "Web Developer (MERN Stack)",
        location: "Lahore, Pakistan",
        startDate: new Date("2022-12-01"),
        endDate: new Date("2023-10-31"),
        bullets: [
          "Built and deployed Express.js REST APIs with MongoDB schema design and OAuth-based authentication.",
          "Converted UI/UX designs into production-grade, component-based React frontends as part of an 8-person Agile team.",
          "Debugged and resolved issues across the full stack in a fast-moving client-services environment."
        ],
        order: 4
      }
    ]
  });

  await db.project.createMany({
    data: [
      {
        title: "PenTutor",
        slug: "pentutor",
        tagline: "A tutoring marketplace built solo, end to end.",
        description:
          "PenTutor is a tutoring marketplace built solo at Penova Tech.\n\nDjango REST Framework, Next.js, PostgreSQL, Redis, Docker, and Nginx, with role-based student/tutor portals, session booking, attendance tracking, in-app messaging, a job board, and payment integration — the flagship production project on my resume.",
        tags: ["Django", "DRF", "Next.js", "PostgreSQL", "Redis", "Docker", "JWT"],
        featured: true,
        order: 0
      },
      {
        title: "Hey Quiz",
        slug: "hey-quiz",
        tagline: "Real-time multiplayer quiz app.",
        description:
          "A real-time multiplayer quiz application built end to end with NestJS for the backend, Socket.IO for live room-based gameplay, and PostgreSQL/Redis for state and session management.\n\nMy first production-scale NestJS project — WebSocket gateways, real-time score sync, and multiplayer room lifecycle management.",
        tags: ["NestJS", "Next.js", "Socket.IO", "PostgreSQL", "Redis"],
        featured: true,
        order: 1
      },
      {
        title: "CRIC-V Coach",
        slug: "cric-v-coach",
        tagline: "GPU-free computer vision cricket coaching tool.",
        description:
          "Final year project — a computer vision pipeline using MediaPipe Pose and a custom-trained YOLOv8 model to analyze batting and bowling technique from standard video, running 3–4x real-time with no GPU required.\n\nIncludes a Next.js coaching dashboard with video playback, keypoint overlays, and metric charts, backed by an async Celery/Redis pipeline. Scored 100% at academic defence, co-built with teammate Sameer Akram.",
        tags: ["FastAPI", "YOLOv8", "MediaPipe", "Celery", "Next.js"],
        featured: false,
        order: 2
      },
      {
        title: "Jobee",
        slug: "jobee",
        tagline: "Job search automation dashboard.",
        description:
          "A job search automation dashboard with multi-source scraping (LinkedIn, Indeed, Glassdoor) via n8n and Apify, deduplication against Supabase, LLM-based scoring, and Discord/WhatsApp notifications.\n\nNext.js frontend with shadcn/ui for job filtering, detail pages, and application status tracking.",
        tags: ["Next.js", "Supabase", "n8n", "shadcn/ui"],
        featured: false,
        order: 3
      },
      {
        title: "Aptly",
        slug: "aptly",
        tagline: "AI-powered resume evaluator with a full auth system.",
        description:
          "Aptly is an AI-powered SaaS resume evaluator built with NestJS, Next.js, PostgreSQL, and Groq.\n\nIncludes a complete session-based auth module — 53/53 unit tests and 28/28 E2E tests passing.",
        tags: ["NestJS", "Next.js", "PostgreSQL", "Groq"],
        featured: false,
        order: 4
      },
      {
        title: "StoryForge",
        slug: "storyforge",
        tagline: "Real-time collaborative storytelling platform.",
        description:
          "A real-time collaborative storytelling platform with WebSocket-based turn management via Django Channels.\n\nCelery workers integrated with LLM APIs (Groq, Gemini) power real-time story generation and voting.",
        tags: ["Django Channels", "Celery", "Redis", "PostgreSQL", "Next.js"],
        featured: false,
        order: 5
      },
      {
        title: "Devido",
        slug: "devido",
        tagline: "Peer-to-peer video sharing app.",
        description:
          "A peer-to-peer video sharing application using WebRTC for real-time media streaming, with a React frontend, Node.js signaling backend, and a MySQL database for user and session data.",
        tags: ["WebRTC", "React", "Node.js", "MySQL"],
        featured: false,
        order: 6
      },
      {
        title: "Chick Kart",
        slug: "chick-kart",
        tagline: "Full-stack e-commerce platform.",
        description:
          "A full-stack e-commerce platform with product catalog, cart, and checkout, using a relational MySQL schema to model products, orders, and transactions. Stripe integrated for payment processing end to end.",
        tags: ["React", "Node.js", "Express.js", "MySQL", "Stripe"],
        featured: false,
        order: 7
      },
      {
        title: "BookShare",
        slug: "bookshare",
        tagline: "Role-based book sharing platform with analytics.",
        description:
          "A book sharing platform built with Flask and SQLAlchemy, featuring role-based access control and Chart.js analytics, validated with 18 passing test cases.",
        tags: ["Flask", "SQLAlchemy", "Chart.js"],
        featured: false,
        order: 8
      },
      {
        title: "LocalLens",
        slug: "locallens",
        tagline: "Hyperlocal news aggregator for Pakistan.",
        description:
          "A Pakistani hyperlocal news aggregator built with FastAPI, Next.js, Flutter, MongoDB, Redis, and Celery, with Groq-powered summarization.",
        tags: ["FastAPI", "Next.js", "Flutter", "MongoDB", "Redis", "Celery"],
        featured: false,
        order: 9
      }
    ]
  });

  await db.skill.createMany({
    data: [
      // Languages
      { name: "TypeScript", category: "Languages", order: 0 },
      { name: "JavaScript (ES6+)", category: "Languages", order: 1 },
      { name: "Python", category: "Languages", order: 2 },
      { name: "SQL", category: "Languages", order: 3 },

      // Frontend
      { name: "React.js", category: "Frontend", order: 0 },
      { name: "Next.js (SSR/SSG/ISR)", category: "Frontend", order: 1 },
      { name: "Redux", category: "Frontend", order: 2 },
      { name: "Tailwind CSS", category: "Frontend", order: 3 },
      { name: "Framer Motion", category: "Frontend", order: 4 },
      { name: "HTML5 / CSS3", category: "Frontend", order: 5 },

      // Backend
      { name: "Node.js", category: "Backend", order: 0 },
      { name: "Express.js", category: "Backend", order: 1 },
      { name: "NestJS", category: "Backend", order: 2 },
      { name: "Django / DRF", category: "Backend", order: 3 },
      { name: "FastAPI", category: "Backend", order: 4 },
      { name: "Flask", category: "Backend", order: 5 },
      { name: "GraphQL", category: "Backend", order: 6 },
      { name: "RESTful API Design", category: "Backend", order: 7 },

      // Database
      { name: "PostgreSQL", category: "Database", order: 0 },
      { name: "MySQL", category: "Database", order: 1 },
      { name: "MongoDB", category: "Database", order: 2 },
      { name: "SQLite", category: "Database", order: 3 },
      { name: "Redis", category: "Database", order: 4 },
      { name: "Prisma", category: "Database", order: 5 },

      // Cloud & DevOps
      { name: "Docker", category: "Cloud & DevOps", order: 0 },
      { name: "AWS", category: "Cloud & DevOps", order: 1 },
      { name: "Git & GitHub", category: "Cloud & DevOps", order: 2 },
      { name: "GitHub Actions (CI/CD)", category: "Cloud & DevOps", order: 3 },
      { name: "Nginx", category: "Cloud & DevOps", order: 4 },
      { name: "Vercel", category: "Cloud & DevOps", order: 5 },
      { name: "Firebase", category: "Cloud & DevOps", order: 6 },

      // Auth & Security
      { name: "JWT", category: "Auth & Security", order: 0 },
      { name: "OAuth2", category: "Auth & Security", order: 1 },
      { name: "Role-Based Access Control", category: "Auth & Security", order: 2 },
      { name: "WebSockets (Django Channels, Socket.IO)", category: "Auth & Security", order: 3 },

      // Automation & AI
      { name: "n8n Workflow Automation", category: "Automation & AI", order: 0 },
      { name: "LLM API Integration (Groq, Gemini)", category: "Automation & AI", order: 1 },
      { name: "Supabase", category: "Automation & AI", order: 2 },
      { name: "Upstash Redis", category: "Automation & AI", order: 3 },

      // ML & Computer Vision
      { name: "MediaPipe", category: "ML & Computer Vision", order: 0 },
      { name: "YOLOv8", category: "ML & Computer Vision", order: 1 },
      { name: "OpenCV", category: "ML & Computer Vision", order: 2 },
      { name: "NumPy / Pandas", category: "ML & Computer Vision", order: 3 },
      { name: "Celery + Redis Pipelines", category: "ML & Computer Vision", order: 4 }
    ]
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });