import * as React from "react";
import { cn } from "../lib/cn";

export type BadgeProps = {
    variant?: "default" | "primary" | "outline" | "danger";
    size?: "sm" | "md";
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({
    variant = "default",
    size = "md",
    className = "",
    children,
    ...props
}: BadgeProps) {
    const variants = {
        default: "border-border bg-muted text-foreground-light",
        primary: "border-primary/30 bg-primary/10 text-primary",
        outline: "border-border-strong bg-transparent text-foreground-light",
        danger: "border-destructive/30 bg-destructive/10 text-destructive"
    };

    const sizes = {
        sm: "px-1.5 py-0.5 text-[10px]",
        md: "px-2 py-0.5 text-xs"
    };

    return (
        <span
            className={`${cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border font-medium whitespace-nowrap [&_svg]:size-3",
                variants[variant],
                sizes[size]
            )} ${className}`}
            {...props}
            data-supa-ui="badge"
        >
            {children}
        </span>
    );
}
