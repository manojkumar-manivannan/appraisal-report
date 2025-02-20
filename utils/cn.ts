import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/**
 * Merge class names together.
 * @param classes The class names to merge.
 * @returns string - The merged class names.
 */
export const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes));
