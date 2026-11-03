import * as React from "react";
import Link, { LinkProps } from "../ui/link";

export type SidebarProps = {
    groups: LinkProps[][];
    pathname?: string;
    linkAs?: React.ElementType;
    footer?: React.ReactNode;
    className?: string;
};

export default function Sidebar({ groups, pathname = "", linkAs, footer, className = "" }: SidebarProps) {
    const isActive = (url: string) => {
        if (url === "/") return pathname === "/";
        return pathname === url || pathname.startsWith(`${url}/`);
    };

    return (
        <aside
            data-supa-ui="sidebar"
            className={`hidden h-full w-(--sui-sidebar-width) shrink-0 border-r border-border bg-background text-foreground md:flex ${className}`}
        >
            <div className="flex h-full w-full flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto py-2">
                    <nav aria-label="Navigation">
                        {groups.map((group, index) => (
                            <React.Fragment key={index}>
                                <ul className="flex w-full flex-col gap-1 px-2 py-1">
                                    {group.map((link) => (
                                        <li key={link.url}>
                                            <Link
                                                {...link}
                                                as={linkAs ?? link.as}
                                                active={link.active ?? isActive(link.url)}
                                                variant="default"
                                                size="md"
                                            />
                                        </li>
                                    ))}
                                </ul>
                                {index !== groups.length - 1 && (
                                    <div className="mx-auto my-2 h-px w-[calc(100%-1rem)] bg-border" />
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                {footer && (
                    <div className="flex shrink-0 flex-col gap-2 border-t border-border p-2">{footer}</div>
                )}
            </div>
        </aside>
    );
}
