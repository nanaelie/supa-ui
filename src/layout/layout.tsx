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
            style={{ "--sui-sidebar-width": "13rem", "--sui-header-height": "3rem" } as React.CSSProperties}
            className={cn("flex min-h-svh w-full flex-col bg-background text-foreground", className)}
        >
            <a
                href="#main"
                className={cn("fixed left-2.5 top-0 z-100 w-fit -translate-y-[calc(100%+8px)] rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-foreground shadow transition-transform duration-200 ease-out focus:translate-y-[10px]")}
            >
                Skip to content
            </a>

            {header && (
                <div className={cn("z-40 shrink-0 bg-background", stickyHeader && "sticky top-0")}>{header}</div>
            )}

            <div className={cn("flex min-w-0 flex-1")}>
                {sidebar && (
                    <div className={cn("sticky top-(--sui-header-height) h-[calc(100svh-var(--sui-header-height))] shrink-0", openSidebar ? "hidden md:block" : "hidden")}>
                        {sidebar}
                    </div>
                )}

                <main id="main" tabIndex={-1} className={cn("min-w-0 flex-1 outline-none")}>
                    {children}
                </main>
            </div>

            {footer}
        </div>
    );
}
