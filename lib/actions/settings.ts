"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { settingsSchema } from "@/lib/validations";

export type SettingsFormState = { errors?: Record<string, string>; success?: boolean };

export async function updateSettings(
  _prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  const parsed = settingsSchema.safeParse({
    heroHeadline: formData.get("heroHeadline"),
    heroSubtext: formData.get("heroSubtext") || "",
    bio: formData.get("bio") || "",
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    location: formData.get("location"),
    availability: formData.get("availability"),
    githubUrl: formData.get("githubUrl") || "",
    linkedinUrl: formData.get("linkedinUrl") || "",
    twitterUrl: formData.get("twitterUrl") || "",
    instagramUrl: formData.get("instagramUrl") || ""
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { errors };
  }

  await db.settings.upsert({
    where: { id: "singleton" },
    update: parsed.data,
    create: { id: "singleton", ...parsed.data }
  });

  revalidatePath("/admin/settings");
  revalidatePath("/"); // homepage reads settings directly, so refresh it
  return { success: true };
}