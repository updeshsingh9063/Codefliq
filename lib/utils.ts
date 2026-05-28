import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely, resolving conflicts */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Simple in-memory rate limiter (per-process, resets on cold start) */
const ipStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(ip: string, maxPerHour = 5): boolean {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return true; // allowed
  }

  if (entry.count >= maxPerHour) return false; // blocked

  entry.count += 1;
  return true; // allowed
}

/** Format a number with optional suffix (e.g. 1200 → "1.2K") */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}
