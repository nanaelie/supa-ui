"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type DropdownEntry =
    | { type?: "item"; label: string; icon?: React.ReactNode; onSelect?: () => void; danger?: boolean; disabled?: boolean }
    | { type: "separator" };

export type DropdownProps = {
    trigger: React.ReactNode;
    items: DropdownEntry[];
    align?: "start" | "end";
    triggerLabel?: string;
    className?: string;
};

export default function Dropdown({ trigger, items, align = "end", triggerLabel = "Menu", className = "" }: DropdownProps) {
    const [open, setOpen] = React.useState(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const onPointer = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointer);
        document.addEventListener("keydown", onKey);
        menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([disabled])')?.focus();
        return () => {
            document.removeEventListener("mousedown", onPointer);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const onMenuKeyDown = (event: React.KeyboardEvent) => {
        const nodes = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])') ?? []);
        const index = nodes.indexOf(document.activeElement as HTMLElement);
        if (event.key === "ArrowDown") nodes[(index + 1) % nodes.length]?.focus();
        else if (event.key === "ArrowUp") nodes[(index - 1 + nodes.length) % nodes.length]?.focus();
        else return;
        event.preventDefault();
    };

    const triggerElement = React.isValidElement(trigger)
        ? (() => {
            const element = trigger as React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
            return React.cloneElement(element, {
                "aria-label": element.props["aria-label"] ?? triggerLabel,
                "aria-haspopup": "menu",
                "aria-expanded": open,
                onClick: (event) => {
                    element.props.onClick?.(event);
                    setOpen((value) => !value);
                }
            });
        })()
        : (
            <button
                type="button"
                aria-label={triggerLabel}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className="inline-flex cursor-pointer items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                {trigger}
            </button>
        );

    return (
        <div ref={rootRef} data-supa-ui="dropdown" className={cn("relative inline-flex", className)}>
            {triggerElement}

            {open && (
                <div
                    ref={menuRef}
                    role="menu"
                    onKeyDown={onMenuKeyDown}
                    style={{ animation: "sui-pop-in 120ms ease-out" }}
                    className={cn(
                        "absolute top-full z-50 mt-1.5 min-w-44 rounded-md border border-border bg-popover p-1 text-sm text-foreground shadow-lg",
                        align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left"
                    )}
                >
                    {items.map((entry, index) =>
                        entry.type === "separator" ? (
                            <div key={index} role="separator" className="my-1 h-px bg-border" />
                        ) : (
                            <button
                                key={`${entry.label}-${index}`}
                                role="menuitem"
                                type="button"
                                disabled={entry.disabled}
                                onClick={() => {
                                    entry.onSelect?.();
                                    setOpen(false);
                                }}
                                className={cn(
                                    "flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-left outline-none transition-colors hover:bg-accent focus:bg-accent disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
                                    entry.danger && "text-destructive"
                                )}
                            >
                                {entry.icon}
                                {entry.label}
                            </button>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
