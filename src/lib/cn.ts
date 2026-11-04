import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
    prefix: "sui",
});

export function cn(...inputs: ClassValue[]) {
    const classes = clsx(inputs)
        .split(/\s+/)
        .filter(Boolean)
        .map((className) => `sui-${className}`);

    return twMerge(classes);
}
