import { cn } from "../lib/cn";
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "tiny" | "sm" | "md" | "lg";
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
};

export default function Button({
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    className = "",
    children,
    type = "button",
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-primary text-primary-foreground shadow-[var(--sui-button-shadow-raised)] hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-accent",
        outline: "border border-border bg-transparent text-foreground hover:bg-accent",
        ghost: "bg-transparent text-foreground hover:bg-accent",
        danger: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
    };

    const sizes = {
        tiny: "h-[26px] rounded-md px-2.5 text-xs [&_svg]:size-3.5",
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:size-4",
        md: "h-9 rounded-md px-3.5 text-sm [&_svg]:size-4",
        lg: "h-10 rounded-lg px-5 text-sm [&_svg]:size-5"
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            className={cn("relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-medium text-center transition-[background-color,border-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50", variants[variant], sizes[size], className)}
            {...props}
        >
            {loading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
            ) : (
                leftIcon
            )}

            <span className="truncate">{children}</span>

            {!loading && rightIcon}
        </button>
    );
}