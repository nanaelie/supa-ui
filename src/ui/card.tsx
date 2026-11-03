import * as React from "react";
import { cn } from "../lib/cn";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function CardHeader({ className = "", ...props }: DivProps) {
    return <div data-supa-ui="card-header" className={cn("flex flex-col gap-1 border-b border-border px-5 py-4", className)} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 data-supa-ui="card-title" className={cn("text-sm font-medium text-foreground", className)} {...props} />;
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p data-supa-ui="card-description" className={cn("text-sm text-foreground-muted", className)} {...props} />;
}

export function CardContent({ className = "", ...props }: DivProps) {
    return <div data-supa-ui="card-content" className={cn("px-5 py-4", className)} {...props} />;
}

export function CardFooter({ className = "", ...props }: DivProps) {
    return <div data-supa-ui="card-footer" className={cn("flex items-center gap-2 border-t border-border px-5 py-3", className)} {...props} />;
}

export type CardProps = { interactive?: boolean } & DivProps;

export default function Card({ interactive = false, className = "", ...props }: CardProps) {
    return (
        <div
            data-supa-ui="card"
            className={cn(
                "overflow-hidden rounded-lg border border-border bg-card text-card-foreground",
                interactive && "cursor-pointer transition-colors duration-200 hover:border-border-strong",
                className
            )}
            {...props}
        />
    );
}
