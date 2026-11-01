"use client";

import * as React from "react";
import Container from "./container";
import { cn } from "../lib/cn";

export type NavbarItem = {
    label: string;
    href?: string;
    active?: boolean;
    onClick?: () => void;
};

export type NavbarProps = {
    logo: React.ReactNode;
    onLogoClick?: () => void;
    brandHref?: string;
    items?: NavbarItem[];
    actions?: React.ReactNode;
    blur?: boolean;
    className?: string;
};

export default function Navbar({
    logo,
    onLogoClick,
    brandHref = "/",
    items = [],
    actions,
    blur = true,
    className = ""
}: NavbarProps) {
    const [open, setOpen] = React.useState(false);

    const itemClass = (active?: boolean, mobile?: boolean) =>
        cn(
            "inline-flex cursor-pointer items-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            mobile ? "h-10 w-full px-3" : "h-8 px-2.5",
            active ? "bg-accent font-medium text-foreground" : "text-foreground-lighter hover:bg-accent hover:text-foreground"
        );

    const renderItem = (item: NavbarItem, mobile?: boolean) =>
        item.href ? (
            <a
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={itemClass(item.active, mobile)}
            >
                {item.label}
            </a>
        ) : (
            <button
                key={item.label}
                type="button"
                aria-current={item.active ? "page" : undefined}
                onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                }}
                className={itemClass(item.active, mobile)}
            >
                {item.label}
            </button>
        );

    return (
        <header
            className={cn(
                "relative w-full border-b border-border",
                blur ? "bg-background/80 backdrop-blur-md" : "bg-background",
                className
            )}
        >
            <Container className="flex h-12 items-center justify-between gap-2 sm:gap-6">
                <div className="flex min-w-0 items-center gap-1">
                    {items.length > 0 && (
                        <button
                            type="button"
                            aria-label="Menu"
                            aria-expanded={open}
                            onClick={() => setOpen((v) => !v)}
                            className="-ml-2 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground-lighter hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-5">
                                {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                            </svg>
                        </button>
                    )}

                    <a
                        href={brandHref}
                        onClick={(event) => {
                            if (onLogoClick) {
                                event.preventDefault();
                                onLogoClick();
                            }
                        }}
                        className="flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground"
                    >
                        {logo}
                    </a>
                </div>

                {items.length > 0 && (
                    <nav aria-label="Navigation" className="hidden min-w-0 items-center gap-1 overflow-x-auto md:flex">
                        {items.map((item) => renderItem(item))}
                    </nav>
                )}

                {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
            </Container>

            {open && items.length > 0 && (
                <nav
                    aria-label="Navigation mobile"
                    className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-background p-2 shadow-lg md:hidden"
                >
                    {items.map((item) => renderItem(item, true))}
                </nav>
            )}
        </header>
    );
}
