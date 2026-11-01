"use client";

import * as React from "react";
import { cn } from "../lib/cn";

export type TabItem = {
    value: string;
    label: string;
    icon?: React.ReactNode;
    content?: React.ReactNode;
    disabled?: boolean;
};

export type TabsProps = {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
};

export default function Tabs({ items, value, defaultValue, onChange, className = "" }: TabsProps) {
    const [inner, setInner] = React.useState(defaultValue ?? items[0]?.value);
    const current = value ?? inner;
    const baseId = React.useId();

    const select = (next: string) => {
        if (value === undefined) setInner(next);
        onChange?.(next);
    };

    const onKeyDown = (event: React.KeyboardEvent) => {
        const enabled = items.filter((item) => !item.disabled);
        const index = enabled.findIndex((item) => item.value === current);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % enabled.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + enabled.length) % enabled.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = enabled.length - 1;
        else return;
        event.preventDefault();
        select(enabled[next].value);
        document.getElementById(`${baseId}-tab-${enabled[next].value}`)?.focus();
    };

    const active = items.find((item) => item.value === current);

    return (
        <div className={cn("flex w-full flex-col gap-4", className)}>
            <div role="tablist" onKeyDown={onKeyDown} className="flex items-center gap-1 overflow-x-auto border-b border-border">
                {items.map((item) => {
                    const selected = item.value === current;
                    return (
                        <button
                            key={item.value}
                            id={`${baseId}-tab-${item.value}`}
                            role="tab"
                            type="button"
                            aria-selected={selected}
                            aria-controls={`${baseId}-panel-${item.value}`}
                            tabIndex={selected ? 0 : -1}
                            disabled={item.disabled}
                            onClick={() => select(item.value)}
                            className={cn(
                                "-mb-px inline-flex h-9 shrink-0 cursor-pointer items-center gap-2 border-b-2 px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
                                selected
                                    ? "border-primary font-medium text-foreground"
                                    : "border-transparent text-foreground-muted hover:text-foreground"
                            )}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    );
                })}
            </div>

            {active?.content !== undefined && (
                <div role="tabpanel" id={`${baseId}-panel-${active.value}`} aria-labelledby={`${baseId}-tab-${active.value}`}>
                    {active.content}
                </div>
            )}
        </div>
    );
}
