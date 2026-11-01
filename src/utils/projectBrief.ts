/**
 * Shared definition of the project brief collected by the /contact chat.
 * The client uses the options to render answer chips; the API uses them to
 * validate the payload and to rank the lead before emailing it.
 */

export const PROJECT_TYPES = [
  { value: "commercial", label: "Commercial or brand film" },
  { value: "music-video", label: "Music video" },
  { value: "documentary", label: "Documentary" },
  { value: "social", label: "Social media content" },
  { value: "post", label: "Editing, color or animation" },
  { value: "other", label: "Something else" },
] as const;

export const BUDGETS = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-5k", label: "$2k – 5k" },
  { value: "5k-15k", label: "$5k – 15k" },
  { value: "15k-40k", label: "$15k – 40k" },
  { value: "40k-plus", label: "$40k+" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const TIMELINES = [
  { value: "under-1m", label: "In less than a month" },
  { value: "1-3m", label: "1 – 3 months" },
  { value: "3m-plus", label: "3+ months" },
  { value: "flexible", label: "No fixed date" },
] as const;

export const SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "google", label: "Google" },
  { value: "referral", label: "A friend or client" },
  { value: "other", label: "Somewhere else" },
] as const;

type Option = { readonly value: string; readonly label: string };

export const labelFor = (options: readonly Option[], value: string | undefined) =>
  options.find((option) => option.value === value)?.label;

export interface ProjectBrief {
  projectType: string;
  projectOther?: string;
  budget: string;
  timeline: string;
  idea: string;
  name: string;
  email: string;
  company?: string;
  source?: string;
}

export type LeadTier = "A" | "B" | "C";

/**
 * A = worth a call right away, B = reply personally, C = below the studio's range.
 * Adjust these buckets once the studio's minimum project budget is defined.
 */
const TIER_A_BUDGETS = new Set(["5k-15k", "15k-40k", "40k-plus"]);
const TIER_C_BUDGETS = new Set(["under-2k"]);

export function leadTier({ budget, timeline }: Pick<ProjectBrief, "budget" | "timeline">): LeadTier {
  if (TIER_C_BUDGETS.has(budget)) return "C";
  if (TIER_A_BUDGETS.has(budget) && timeline !== "flexible") return "A";
  return "B";
}
