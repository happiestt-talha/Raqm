"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { projectSchema } from "@/lib/validations";

export type ProjectFormState = { errors?: Record<string, string> };

function parseForm(formData: FormData) {
  return projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    tagline: formData.get("tagline"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") || "",
    tags: (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    liveUrl: formData.get("liveUrl") || "",
    repoUrl: formData.get("repoUrl") || "",
    featured: formData.get("featured") === "on",
    order: formData.get("order") || 0
  });
}

export async function createProject(_prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  const existing = await db.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing) return { errors: { slug: "This slug is already in use." } };

  if (parsed.data.featured) {
    // Only one project can be featured at a time — unset any existing one
    await db.project.updateMany({ where: { featured: true }, data: { featured: false } });
  }

  await db.project.create({ data: parsed.data });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  const existing = await db.project.findUnique({ where: { slug: parsed.data.slug } });
  if (existing && existing.id !== id) return { errors: { slug: "This slug is already in use." } };

  if (parsed.data.featured) {
    await db.project.updateMany({ where: { featured: true, NOT: { id } }, data: { featured: false } });
  }

  await db.project.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath(`/work/${parsed.data.slug}`);
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await db.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/");
}

function flattenErrors(error: import("zod").ZodError) {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    errors[issue.path[0] as string] = issue.message;
  });
  return errors;
}