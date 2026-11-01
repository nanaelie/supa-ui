import * as React from "react";
import Container from "./container";
import { cn } from "../lib/cn";

export type FooterColumn = { title: string; content: React.ReactNode };

export type FooterProps = {
    brand?: React.ReactNode;
    columns?: FooterColumn[];
    bottom?: React.ReactNode;
    bottomRight?: React.ReactNode;
    className?: string;
};

export default function Footer({ brand, columns = [], bottom, bottomRight, className = "" }: FooterProps) {
    return (
        <footer className={cn("mt-auto border-t border-border bg-background text-sm text-foreground-muted", className)}>
            <Container className="py-10">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {brand && <div className="flex flex-col gap-3">{brand}</div>}

                    {columns.map((column) => (
                        <div key={column.title} className="flex flex-col gap-3">
                            <h4 className="text-sm font-medium text-foreground">{column.title}</h4>
                            <div className="flex flex-col gap-2">{column.content}</div>
                        </div>
                    ))}
                </div>

                {(bottom || bottomRight) && (
                    <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs sm:flex-row">
                        <div>{bottom}</div>
                        <div className="flex items-center gap-4">{bottomRight}</div>
                    </div>
                )}
            </Container>
        </footer>
    );
}
