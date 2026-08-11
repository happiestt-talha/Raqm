import { db } from "@/lib/db";

export async function getExperience() {
  return db.experience.findMany({ orderBy: { order: "asc" } });
}

export async function getProjects() {
  return db.project.findMany({ orderBy: { order: "asc" } });
}

export async function getFeaturedProject() {
  return db.project.findFirst({ where: { featured: true }, orderBy: { order: "asc" } });
}

export async function getProjectBySlug(slug: string) {
  return db.project.findUnique({ where: { slug } });
}

export async function getSkillsByCategory() {
  const skills = await db.skill.findMany({ orderBy: { order: "asc" } });
  return skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] ? [...acc[skill.category], skill] : [skill];
    return acc;
  }, {});
}

export async function getCertifications() {
  return db.certification.findMany({ orderBy: { order: "asc" } });
}

export async function getSettings() {
  return db.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" }
  });
}