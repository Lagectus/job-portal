import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"z

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
