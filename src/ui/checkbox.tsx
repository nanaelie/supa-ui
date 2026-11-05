import * as React from "react";
import { cn } from "../lib/cn";

export type CheckboxProps = {
    label?: React.ReactNode;
    description?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export default function Checkbox({
    label,
    description,
    className = "",
    id,
    disabled,
    ...props
}: CheckboxProps) {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
        <div data-supa-ui="checkbox" className={cn("flex items-start gap-2.5", disabled && "opacity-50")}>
            <input
                id={checkboxId}
                type="checkbox"
                disabled={disabled}
                className={`${cn("mt-0.5 size-4 shrink-0 cursor-pointer rounded border-control accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed")} ${className}`}
                {...props}
            />

            {(label || description) && (
                <label htmlFor={checkboxId} className={cn("flex cursor-pointer flex-col gap-0.5")}>
                    {label && <span className={cn("text-sm text-foreground")}>{label}</span>}
                    {description && <span className={cn("text-xs text-foreground-muted")}>{description}</span>}
                </label>
            )}
        </div>
    );
}
