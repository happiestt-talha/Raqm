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
        company: "Penova Tech",
        role: "Full-Stack Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-09-30"),
        bullets: [
          "Built and shipped PenTutor, a solo-built tutoring marketplace with Django, React, PostgreSQL, Docker, and CI/CD.",
          "Implemented real-time tutoring sessions and payment integration end to end."
        ],
        order: 1
      },
      {
        company: "Connect Solutions",
        role: "Full Stack Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2023-11-01"),
        endDate: new Date("2025-02-28"),
        bullets: [
          "Developed and maintained client-facing web applications.",
          "Worked across the stack on feature delivery and API integration."
        ],
        order: 2
      },
      {
        company: "Dextrologix",
        role: "Web Developer",
        location: "Lahore, Pakistan",
        startDate: new Date("2022-12-01"),
        endDate: new Date("2023-10-31"),
        bullets: [
          "Developed and maintained client-facing web apps with modern JavaScript.",
          "Shipped features for internationalized clients with attention to detail and consistent delivery patterns."
        ],
        order: 3
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
          "PenTutor is a tutoring marketplace built solo at Penova Tech.\n\nDjango, React, PostgreSQL, Docker, and Nginx, with real-time sessions, CI/CD, and payment integration — the flagship production project on my resume.",
        tags: ["Django", "React", "PostgreSQL", "Docker", "CI/CD"],
        featured: true,
        order: 0
      },
      {
        title: "Aptly",
        slug: "aptly",
        tagline: "AI-powered resume evaluator with a full auth system.",
        description:
          "Aptly is an AI-powered SaaS resume evaluator built with NestJS, Next.js, PostgreSQL, and Groq.\n\nIncludes a complete session-based auth module — 53/53 unit tests and 28/28 E2E tests passing.",
        tags: ["NestJS", "Next.js", "PostgreSQL", "Groq"],
        featured: false,
        order: 1
      },
      {
        title: "CRIC-V Coach",
        slug: "cric-v-coach",
        tagline: "GPU-free computer vision cricket coaching tool.",
        description:
          "Final year project — a computer vision pipeline for cricket action analysis and feedback, built with FastAPI, YOLOv8, and MediaPipe.\n\nScored 100% at academic defence, co-built with teammate Sameer Akram.",
        tags: ["FastAPI", "YOLOv8", "MediaPipe"],
        featured: false,
        order: 2
      }
    ]
  });

  await db.skill.createMany({
    data: [
      { name: "TypeScript", category: "Languages", order: 0 },
      { name: "JavaScript", category: "Languages", order: 1 },
      { name: "Python", category: "Languages", order: 2 },
      { name: "SQL", category: "Languages", order: 3 },
      { name: "React", category: "Frontend", order: 0 },
      { name: "Next.js", category: "Frontend", order: 1 },
      { name: "Tailwind CSS", category: "Frontend", order: 2 },
      { name: "Framer Motion", category: "Frontend", order: 3 },
      { name: "Node.js", category: "Backend", order: 0 },
      { name: "NestJS", category: "Backend", order: 1 },
      { name: "Django", category: "Backend", order: 2 },
      { name: "FastAPI", category: "Backend", order: 3 },
      { name: "PostgreSQL", category: "Database", order: 0 },
      { name: "Redis", category: "Database", order: 1 },
      { name: "Prisma", category: "Database", order: 2 },
      { name: "Docker", category: "Tools", order: 0 },
      { name: "Git & GitHub", category: "Tools", order: 1 },
      { name: "CI/CD", category: "Tools", order: 2 }
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