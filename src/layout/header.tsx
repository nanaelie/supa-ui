import * as React from "react";
import { cn } from "../lib/cn";

type HeaderSegment = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    badge?: string;
    active?: boolean;
    menu?: React.ReactNode;
};

type HeaderProps = {
    logo?: React.ReactNode;
    brandHref?: string;
    segments?: HeaderSegment[];
    actions?: React.ReactNode;
    utilities?: React.ReactNode;
    mobile?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function Header({
    logo,
    brandHref = "/",
    segments = [],
    actions,
    utilities,
    mobile = true,
    className = "",
    ...props
}: HeaderProps) {
    return (
        <header
            className={`${cn("flex h-(--sui-header-height) w-full shrink-0 items-center border-b border-border bg-background")} ${className}`}
            {...props}
            data-supa-ui="header"
        >
            <div className={cn("flex h-full min-w-0 flex-1 items-center justify-between gap-4 overflow-x-auto px-4")}>
                <div className={cn("flex min-w-0 h-full items-center gap-4")}>
                    <a
                        href={brandHref}
                        className={cn("flex shrink-0 items-center justify-center")}
                        aria-label="Home"
                    >
                        {logo}
                    </a>

                    {segments.length > 0 && (
                        <nav
                            aria-label="Breadcrumb"
                            className={cn("flex h-full min-w-0 items-center gap-2")}
                        >
                            {segments.map((segment, index) => (
                                <React.Fragment key={`${segment.label}-${index}`}>
                                    <span
                                        aria-hidden="true"
                                        className={cn("h-4 w-px shrink-0 rotate-27 bg-border-strong")}
                                    />

                                    <div className={cn("flex shrink-0 items-center gap-1")}>
                                        {segment.href ? (
                                            <a
                                                href={segment.href}
                                                aria-current={segment.active ? "page" : undefined}
                                                className={cn(`flex min-w-0 items-center gap-2 text-sm transition-colors hover:text-foreground ${segment.active ? "text-foreground" : "text-foreground-muted"}`)}
                                            >
                                                {segment.icon}

                                                <span className={cn("max-w-32 truncate lg:max-w-64")}>
                                                    {segment.label}
                                                </span>
                                            </a>
                                        ) : (
                                            <span className={cn("flex min-w-0 items-center gap-2 text-sm text-foreground")}>
                                                {segment.icon}

                                                <span className={cn("max-w-32 truncate lg:max-w-64")}>
                                                    {segment.label}
                                                </span>
                                            </span>
                                        )}

                                        {segment.badge && (
                                            <span className={cn("inline-flex shrink-0 items-center rounded-full border border-border bg-muted px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-foreground-muted")}>
                                                {segment.badge}
                                            </span>
                                        )}

                                        {segment.menu}
                                    </div>
                                </React.Fragment>
                            ))}
                        </nav>
                    )}

                    {actions && (
                        <div className={cn("flex shrink-0 items-center gap-2")}>
                            {actions}
                        </div>
                    )}
                </div>

                {utilities && (
                    <div className={cn("flex shrink-0 items-center gap-2")}>
                        {utilities}
                    </div>
                )}
            </div>
        </header>
    );
}
