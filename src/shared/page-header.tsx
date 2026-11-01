import * as React from "react";
import { cn } from "../lib/cn";

export type PageHeaderProps = {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    className?: string;
};

export default function PageHeader({ title, description, actions, className = "" }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", className)}>
            <div className="flex min-w-0 flex-col gap-1">
                <h1 className="truncate text-xl font-medium text-foreground">{title}</h1>
                {description && <p className="text-sm text-foreground-muted">{description}</p>}
            </div>

            {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
    );
}
