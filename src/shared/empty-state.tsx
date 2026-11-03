import * as React from "react";

type EmptyStateProps = {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
    variant?: "default" | "bordered" | "minimal";
    size?: "sm" | "md" | "lg";
} & React.HTMLAttributes<HTMLElement>;

export default function EmptyState({
    title,
    description,
    icon,
    action,
    variant = "default",
    size = "md",
    className = "",
    ...props
}: EmptyStateProps) {
    const variants = {
        default: "border border-dashed border-border bg-muted/50",
        bordered: "border border-border bg-card",
        minimal: "border border-transparent bg-transparent"
    };

    const sizes = {
        sm: "px-4 py-6 gap-y-2 [&_svg]:size-8",
        md: "px-4 py-10 gap-y-3 [&_svg]:size-10",
        lg: "px-6 py-14 gap-y-4 [&_svg]:size-12"
    };

    return (
        <aside
            role="status"
            className={`flex w-full flex-col items-center rounded-lg text-center ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
            data-supa-ui="empty-state"
        >
            {icon && (
                <div className="flex items-center justify-center text-foreground-muted [&_svg]:shrink-0">
                    {icon}
                </div>
            )}

            {(title || description) && (
                <div className="flex max-w-160 flex-col items-center gap-y-1 text-balance">
                    {title && (
                        <h3 className="text-sm font-medium text-foreground">
                            {title}
                        </h3>
                    )}

                    {description && (
                        <p className="text-sm leading-relaxed text-foreground-muted">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {action && (
                <div className="flex items-center gap-2">
                    {action}
                </div>
            )}
        </aside>
    );
}