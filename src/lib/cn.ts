import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { twMerge } from "tailwind-merge";

const merge = extendTailwindMerge({});

export function cn(...inputs: ClassValue[]) {
    return twMerge(
        clsx(inputs)
            .split(/\s+/)
            .filter(Boolean)
            .map((cls) => (cls.startsWith("sui:") ? cls : `sui:${cls}`))
            .join(" ")
    );
}