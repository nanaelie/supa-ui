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
            data-sui-component="sidebar"
            className={`${cn("bg-background text-foreground")} ${className}`}
        >
            <div className={cn("flex min-h-0 w-full flex-1 flex-col")}>
                <div className={cn("min-h-0 flex-1 overflow-y-auto py-2")}>
                    <nav aria-label="Navigation">
                        {groups.map((group, index) => (
                            <React.Fragment key={index}>
                                <ul className={cn("flex w-full flex-col gap-1 px-2 py-1")}>
                                    {group.map((item, idx) => (
                                        <li key={idx}>
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
