import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const merge = extendTailwindMerge({ prefix: "sui" });

export function cn(...inputs: ClassValue[]) {
    const classes = clsx(inputs).split(/\s+/).filter(Boolean).map((name) => name.startsWith("sui:") ? name : `sui:${name}`);
    return merge(classes.join(" "));
}
