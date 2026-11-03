import * as React from "react";
import { cn } from "../lib/cn";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = {
    label?: string;
    hint?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
    options?: SelectOption[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">;

export default function Select({
    label,
    hint,
    error,
    size = "md",
    options,
    className = "",
    id,
    disabled,
    children,
    ...props
}: SelectProps) {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;
    const descriptionId = `${selectId}-description`;
    const errorId = `${selectId}-error`;

    const sizes = {
        sm: "h-8 pl-2.5 pr-8 text-xs",
        md: "h-[34px] pl-3 pr-9 text-sm",
        lg: "h-10 pl-3.5 pr-10 text-base"
    };

    return (
        <div data-supa-ui="select" className="flex w-full flex-col gap-1.5">
            {label && (
                <label htmlFor={selectId} className="text-sm font-medium text-foreground">
                    {label}
                </label>
            )}

            <div className="relative flex w-full items-center">
                <select
                    id={selectId}
                    disabled={disabled}
                    aria-invalid={!!error}
                    aria-describedby={error ? errorId : hint ? descriptionId : undefined}
                    className={cn(
                        "w-full min-w-0 cursor-pointer appearance-none rounded-md border border-control bg-field text-foreground transition-colors duration-200 hover:border-control-hover focus:border-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
                        sizes[size],
                        className
                    )}
                    {...props}
                >
                    {options
                        ? options.map((option) => (
                              <option key={option.value} value={option.value} disabled={option.disabled}>
                                  {option.label}
                              </option>
                          ))
                        : children}
                </select>

                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute right-3 size-4 text-foreground-muted"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>

            {error && (
                <span id={errorId} role="alert" className="text-xs text-destructive">
                    {error}
                </span>
            )}

            {!error && hint && (
                <span id={descriptionId} className="text-xs text-foreground-muted">
                    {hint}
                </span>
            )}
        </div>
    );
}
