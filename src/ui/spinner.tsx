import { cn } from "../lib/cn";

export type SpinnerProps = { size?: "sm" | "md" | "lg"; className?: string };

export default function Spinner({ size = "md", className = "" }: SpinnerProps) {
    const sizes = { sm: "size-3.5", md: "size-5", lg: "size-8" };

    return (
        <span
            data-supa-ui="spinner"
            role="status"
            aria-label="Loading"
            className={`${cn(
                "inline-block animate-spin rounded-full border-2 border-foreground-muted border-r-transparent",
                sizes[size]
            )} ${className}`
        />
    );
}
