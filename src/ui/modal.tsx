"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type ModalProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    children?: React.ReactNode;
    className?: string;
};

export default function Modal({
    open,
    onClose,
    title,
    description,
    footer,
    size = "md",
    children,
    className = ""
}: ModalProps) {
    React.useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

    return (
        <div
            data-supa-ui="modal"
            className={cn("fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs")}
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className={cn(
                    "flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg border border-border bg-popover text-foreground shadow-2xl",
                    sizes[size]
                )} ${className}
            >
                {(title || description) && (
                    <div className={cn("flex items-start justify-between gap-4 border-b border-border px-5 py-4")}>
                        <div className={cn("flex flex-col gap-1")}>
                            {title && <h2 className={cn("text-sm font-medium")}>{title}</h2>}
                            {description && <p className={cn("text-sm text-foreground-muted")}>{description}</p>}
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close"
                            className={cn("-mr-1.5 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground-muted transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring")}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4")}>
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className={cn("min-h-0 flex-1 overflow-y-auto px-5 py-4")}>{children}</div>

                {footer && (
                    <div className={cn("flex items-center justify-end gap-2 border-t border-border px-5 py-3")}>{footer}</div>
                )}
            </div>
        </div>
    );
}
