import * as React from "react";
import { cn } from "../lib/cn";

export type LinkProps = {
    url: string;
    text?: string;
    icon?: React.ReactNode;
    active?: boolean;
    as?: React.ElementType;
    variant?: "default" | "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export default function Link({
    url,
    text,
    icon,
    active = false,
    as,
    variant = "default",
    size = "md",
    className = "",
    children,
    ...props
}: LinkProps) {
    const Component = as ?? "a";

    const variants = {
        default: "text-foreground-lighter hover:bg-accent hover:text-foreground",
        primary: "text-primary hover:bg-primary/10",
        secondary: "text-secondary-foreground hover:bg-secondary",
        ghost: "text-muted-foreground hover:bg-accent hover:text-foreground"
    };

    const sizes = {
        sm: "h-7 px-[var(--sui-link-padding-x-sm)] py-[var(--sui-link-padding-y-sm)] text-xs [&>svg]:size-4",
        md: "h-8 px-[var(--sui-link-padding-x-md)] py-[var(--sui-link-padding-y-md)] text-sm [&>svg]:size-5",
        lg: "h-10 px-[var(--sui-link-padding-x-lg)] py-[var(--sui-link-padding-y-lg)] text-base [&>svg]:size-5"
    };

    return (
        <Component
            href={url}
            data-active={active}
            aria-current={active ? "page" : undefined}
            className={cn(
                "flex w-full items-center gap-2 overflow-hidden rounded-md text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring active:bg-accent [&>span:last-child]:truncate [&>svg]:shrink-0",
                variants[variant],
                sizes[size],
                active && "bg-accent font-medium text-foreground"
            )} ${className}
            {...props}
            data-supa-ui="link"
        >
            {icon}
            {text ? <span>{text}</span> : children}
        </Component>
    );
}
