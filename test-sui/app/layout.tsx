import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Supa UI Playground",
    description: "Test and preview Supa UI components.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="h-full antialiased">
            <body className="min-h-full flex flex-col font-sans">{children}</body>
        </html>
    );
}
