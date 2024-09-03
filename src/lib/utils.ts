import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  // Split the date string by '-'
  const parts = date.split("-");

  // Extract year, month, and day
  const year = parts[0];
  const month = parts[1];
  const dayWithTime = parts[2];

  // Split the day and time
  const [day, time] = dayWithTime.split("T");

  // Format the date as yyyy/mm/dd
  return `${year}/${month}/${day}`;
};
