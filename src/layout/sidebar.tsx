import * as React from "react";
import { cn } from "../lib/cn";
import Link, { LinkProps } from "../ui/link";

export type SidebarProps = {
    groups: LinkProps[][];
    pathname?: string;
    link?: React.ElementType<LinkProps>;
    linkAs?: React.ElementType;
    locales?: string[];
    footer?: React.ReactNode;
    className?: string;
};

const normalizePath = (path: string, locales: string[]) => {
    const segments = path.split(/[?#]/)[0].split("/").filter(Boolean);

    if (locales.includes(segments[0])) segments.shift();

    return `/${segments.join("/")}`;
};

export default function Sidebar({ groups, pathname = "", link: LinkComponent = Link, linkAs, locales = ["en", "fr"], footer, className = "" }: SidebarProps) {
    const currentPath = normalizePath(pathname, locales);

    const isActive = (url: string) => {
        const target = normalizePath(url, locales);

        if (target === "/") return currentPath === "/";
        return currentPath === target || currentPath.startsWith(`${target}/`);
    };

    return (
        <aside
            data-supa-ui="sidebar"
            className={`${cn("hidden h-full w-(--sui-sidebar-width) shrink-0 border-r border-border bg-background text-foreground md:flex")} ${className}`}
        >
            <div className={cn("flex h-full w-full flex-col")}>
                <div className={cn("min-h-0 flex-1 overflow-y-auto py-2")}>
                    <nav aria-label="Navigation">
                        {groups.map((group, index) => (
                            <React.Fragment key={index}>
                                <ul className={cn("flex w-full flex-col gap-1 px-2 py-1")}>
                                    {group.map((item) => (
                                        <li key={item.url}>
                                            <LinkComponent
                                                {...item}
                                                as={linkAs ?? item.as}
                                                active={item.active ?? isActive(item.url)}
                                                variant="default"
                                                size="md"
                                            />
                                        </li>
                                    ))}
                                </ul>
                                {index !== groups.length - 1 && (
                                    <div className={cn("mx-auto my-2 h-px w-[calc(100%-1rem)] bg-border")} />
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                {footer && (
                    <div className={cn("flex shrink-0 flex-col gap-2 border-t border-border p-2")}>{footer}</div>
                )}
            </div>
        </aside>
    );
}
