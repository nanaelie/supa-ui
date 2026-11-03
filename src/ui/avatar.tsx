import * as React from "react";
import { cn } from "../lib/cn";

export type AvatarProps = {
    src?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Avatar({ src, name = "", size = "md", className = "", ...props }: AvatarProps) {
    const sizes = { sm: "size-6 text-[10px]", md: "size-8 text-xs", lg: "size-10 text-sm" };
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted font-medium text-foreground-light",
                sizes[size],
                className
            )}
            {...props}
            data-supa-ui="avatar"
        >
            {src ? <img src={src} alt={name} className="size-full object-cover" /> : initials}
        </span>
    );
}
