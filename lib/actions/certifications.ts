"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { certificationSchema } from "@/lib/validations";

export type CertificationFormState = { errors?: Record<string, string> };

function parseForm(formData: FormData) {
  return certificationSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issueDate: formData.get("issueDate"),
    credentialUrl: formData.get("credentialUrl") || "",
    order: formData.get("order") || 0
  });
}

export async function createCertification(
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.certification.create({ data: parsed.data });
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: CertificationFormState,
  formData: FormData
): Promise<CertificationFormState> {
  const parsed = parseForm(formData);
  if (!parsed.success) return { errors: flattenErrors(parsed.error) };

  await db.certification.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/certifications");
  revalidatePath("/");
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await db.certification.delete({ where: { id } });
  revalidatePath("/admin/certifications");
  revalidatePath("/");
}

function flattenErrors(error: import("zod").ZodError) {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue) => {
    errors[issue.path[0] as string] = issue.message;
  });
  return errors;
}