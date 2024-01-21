import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(time: number = 2000): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
