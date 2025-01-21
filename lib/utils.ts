import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : int;
};

export const toSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "") // Remove non-alphanumeric characters (except spaces)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};
