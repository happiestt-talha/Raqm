"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  projectType: z.string().optional(),
  message: z.string().min(10, "Tell me a bit more about the project")
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  errors?: Record<string, string>;
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    parsed.error.issues.forEach((issue) => {
      errors[issue.path[0] as string] = issue.message;
    });
    return { status: "error", errors };
  }

  // TODO: wire up to an email service (Resend, Postmark, etc.) or store in DB.
  // Kept as a clear integration point rather than faking a send.
  console.log("New contact submission:", parsed.data);

  return { status: "success", message: "Message sent — I'll get back to you soon." };
}