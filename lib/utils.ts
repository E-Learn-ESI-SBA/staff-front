import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function capitalize(wd: string, separator: "_" | "-" | " " = "_") {
  // write function that capitalize the first letter of each word
  return wd
    .split(separator)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function tableDisplayHeader<T>(
  headers: {
    title: string;
    accessorKey: keyof T;
  }[],
  key: keyof T,
) {
  let header = headers.find((h) => h.accessorKey === key);
  return header ? header.title : key;
}

export const timeUnitHandler = (time: number, unit: "Min" | "Hour" | "Day") => {
  return time + " " + unit + (time > 1 ? "s" : "");
};
