"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { skillSchema } from "@/lib/validations";

export type SkillFormState = { errors?: Record<string, string> };

function parseForm(formData: FormData) {
  return skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    order: formData.get("order") || 0
  });
}

export async function createSkill(_prevState: SkillFormState, formData: FormData): Promise<SkillFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.skill.create({ data: parsed.data });
  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, _prevState: SkillFormState, formData: FormData): Promise<SkillFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.skill.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await db.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/");
}

function flattenErrors(error: import("zod").ZodError) {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    errors[issue.path[0] as string] = issue.message;
  });
  return errors;
}