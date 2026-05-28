import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Custom Website Design",
  "Web App Development",
  "UI/UX Design",
  "API Integration",
  "Website Maintenance & Support",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
] as const;

/** Zod schema — shared between client validation and API route */
export const contactSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "Max 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Max 50 characters")
    .trim(),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(100, "Max 100 characters")
    .trim(),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please select a service",
  }),
  budget: z.enum(BUDGET_OPTIONS, {
    message: "Please select a budget range",
  }),
  message: z
    .string()
    .min(20, "Please describe your project (min 20 characters)")
    .max(2000, "Max 2000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
