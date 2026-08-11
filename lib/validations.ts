import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  bullets: z.array(z.string().min(1)).min(1, "Add at least one bullet point"),
  order: z.coerce.number().int().default(0)
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase, numbers, and hyphens only"),
  tagline: z.string().min(1, "Tagline is required"),
  description: z.string().min(1, "Description is required"),
  coverImage: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  featured: z.coerce.boolean().default(false),
  order: z.coerce.number().int().default(0)
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["Languages", "Frontend", "Backend", "Database", "Tools", "Auth & Cloud"]),
  order: z.coerce.number().int().default(0)
});

export const certificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.coerce.date(),
  credentialUrl: z.string().url().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0)
});

export const settingsSchema = z.object({
  heroHeadline: z.string().min(1),
  heroSubtext: z.string().optional(),
  bio: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().min(1),
  availability: z.string().min(1),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal(""))
});