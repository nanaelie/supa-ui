import * as React from "react";
import { cn } from "../lib/cn";

export type InputProps = {
    label?: string;
    hint?: string;
    error?: string;
    icon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "filled";
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

export default function Input({
    label,
    hint,
    error,
    icon,
    size = "md",
    variant = "default",
    className = "",
    id,
    disabled,
    ...props
}: InputProps) {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;

    const sizes = {
        sm: "h-8 px-2.5 text-xs",
        md: "h-[34px] px-3 text-base",
        lg: "h-10 px-3.5 text-base"
    };

    const variants = {
        default: "bg-field border-control",
        filled: "bg-muted border-transparent"
    };

    return (
        <div data-supa-ui="input" className={`${cn("flex w-full flex-col gap-1.5")}>
            {label && (
                <label htmlFor={inputId} className={cn("text-sm font-medium text-foreground")}>
                    {label}
                </label>
            )}

            <div className={cn("relative flex w-full items-center")}>
                {icon && (
                    <span className={cn("pointer-events-none absolute left-3 flex items-center text-foreground-muted [&_svg]:size-4")}>
                        {icon}
                    </span>
                )}

                <input
                    id={inputId}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : hint ? descriptionId : undefined}
                    className={cn(
                        "flex w-full min-w-0 rounded-md border text-foreground placeholder:text-foreground-muted file:border-0 file:bg-transparent file:text-sm file:font-medium read-only:border-button read-only:text-foreground-light transition-colors duration-200 hover:border-control-hover focus:border-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 disabled:text-foreground-muted aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
                        variants[variant],
                        sizes[size],
                        icon ? "pl-9": ""
                    )} ${className}`
                    {...props}
                />
            </div>

            {error && (
                <span id={errorId} role="alert" className={cn("text-xs text-destructive")}>
                    {error}
                </span>
            )}

            {!error && hint && (
                <span id={descriptionId} className={cn("text-xs text-foreground-muted")}>
                    {hint}
                </span>
            )}
        </div>
    );
}
