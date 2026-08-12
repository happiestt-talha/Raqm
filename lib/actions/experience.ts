"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { experienceSchema } from "@/lib/validations";

export type ExperienceFormState = { errors?: Record<string, string> };

function parseForm(formData: FormData) {
  return experienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || null,
    bullets: (formData.get("bullets") as string)
      .split("\n")
      .map((b) => b.trim())
      .filter(Boolean),
    order: formData.get("order") || 0
  });
}

export async function createExperience(_prevState: ExperienceFormState, formData: FormData): Promise<ExperienceFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.experience.create({ data: parsed.data });
  revalidatePath("/admin/experience");
  revalidatePath("/"); // reflect on public homepage immediately
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prevState: ExperienceFormState,
  formData: FormData
): Promise<ExperienceFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.experience.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await db.experience.delete({ where: { id } });
  revalidatePath("/admin/experience");
  revalidatePath("/");
}

function flattenErrors(error: import("zod").ZodError) {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    errors[issue.path[0] as string] = issue.message;
  });
  return errors;
}