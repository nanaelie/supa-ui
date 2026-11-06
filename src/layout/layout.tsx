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
        <>
            <a href="#main" className={cn("fixed left-2.5 top-0 z-100 w-fit -translate-y-[calc(100%+8px)] rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-foreground shadow transition-transform duration-200 ease-out focus:translate-y-[10px]")}>Skip to content</a>
            <div
                data-supa-ui="layout"
                data-sui-component="layout"
                className={`${className}`}
            >

                {header && (
                    <>{
                        header
                    }</>
                )}

                <div className={"container"}>
                    {sidebar && openSidebar && (
                        <>
                            {sidebar}
                        </>
                    )}

                    <main id="main" tabIndex={-1} data-sui-component="main" className={cn("bg-background")}>
                        {children}
                    </main>
                </div>

                {footer}
            </div>
        </>
    );
}
