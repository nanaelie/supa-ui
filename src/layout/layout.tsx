import * as React from "react";
import { cn } from "../lib/cn";

export type LayoutProps = {
    header?: React.ReactNode;
    sidebar?: React.ReactNode;
    footer?: React.ReactNode;
    stickyHeader?: boolean;
    openSidebar?: boolean;
    children?: React.ReactNode;
    className?: string;
};

export default function Layout({
    header,
    sidebar,
    footer,
    stickyHeader = true,
    openSidebar = true,
    children,
    className = ""
}: LayoutProps) {
    return (
        <div
            data-supa-ui="layout"
            className={`${cn("grid h-[calc(100svh-2*var(--sui-app-margin))] min-h-0 w-full grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-(--sui-rounded) border border-(--sui-border) bg-background text-foreground shadow-[var(--sui-components-shadow)]")} ${className}`}
        >
            <a
                href="#main"
                className={cn("fixed left-2.5 top-0 z-100 w-fit -translate-y-[calc(100%+8px)] rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-foreground shadow transition-transform duration-200 ease-out focus:translate-y-[10px]")}
            >
                Skip to content
            </a>

            {header && (
                <div className={cn("z-40 min-w-0 bg-background", stickyHeader && "sticky top-0")}>{header}</div>
            )}

            <div className={cn("grid min-h-0 min-w-0 gap-(--sui-components-padding)", sidebar && openSidebar ? "grid-cols-[var(--sui-sidebar-width)_minmax(0,1fr)]" : "grid-cols-1")}>
                {sidebar && openSidebar && (
                    <div className={cn("min-h-0 min-w-0 overflow-hidden")}>
                        {sidebar}
                    </div>
                )}

                <main id="main" tabIndex={-1} className={cn("min-h-0 min-w-0 overflow-x-hidden overflow-y-auto outline-none")}>
                    {children}
                </main>
            </div>

            {footer}
        </div>
    );
}
