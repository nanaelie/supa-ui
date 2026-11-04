import * as React from "react";
import { cn } from "../lib/cn";

export type TextareaProps = {
    label?: string;
    hint?: string;
    error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
    label,
    hint,
    error,
    className = "",
    id,
    rows = 4,
    ...props
}: TextareaProps) {
    const generatedId = React.useId();
    const textareaId = id ?? generatedId;
    const descriptionId = `${textareaId}-description`;
    const errorId = `${textareaId}-error`;

    return (
        <div data-supa-ui="textarea" className={cn("flex w-full flex-col gap-1.5")}>
            {label && (
                <label htmlFor={textareaId} className={cn("text-sm font-medium text-foreground")}>
                    {label}
                </label>
            )}

            <textarea
                id={textareaId}
                rows={rows}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : hint ? descriptionId : undefined}
                className={cn(
                    "flex w-full min-w-0 resize-y rounded-md border border-control bg-field px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted transition-colors duration-200 hover:border-control-hover focus:border-control-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
                    className
                )}
                {...props}
            />

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
