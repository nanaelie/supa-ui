import { Avatar, Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Header, Layout, PageHeader, Sidebar } from "supa-ui";

function Icon({ name }: { name: "grid" | "users" | "settings" | "chart" | "help" }) {
    const paths = {
        grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
        users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m18 0v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-7.87a4 4 0 0 1 0 7.75",
        settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm7.4 7a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8-.1 1.7 1.7 0 0 0-1 1.5v.2h-3.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.1l-.2.1-1.7-2.9.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5.5v-3.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.7-2.9.2.1a1.7 1.7 0 0 0 1.8.1 1.7 1.7 0 0 0 1-1.5v-.2h3.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.1l.2-.1 1.7 2.9-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z",
        chart: "M3 3v18h18M8 15l4-4 4 3 5-7",
        help: "M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
    };

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0">
            <path d={paths[name]} />
        </svg>
    );
}

const groups = [
    [
        { url: "/layouts", text: "Overview", icon: <Icon name="grid" /> },
        { url: "/layouts/analytics", text: "Analytics", icon: <Icon name="chart" /> },
        { url: "/layouts/team", text: "Team", icon: <Icon name="users" /> }
    ],
    [
        { url: "/layouts/settings", text: "Settings", icon: <Icon name="settings" /> },
        { url: "/layouts/help", text: "Help", icon: <Icon name="help" /> }
    ]
];

export default function LayoutsPage() {
    return (
        <Layout
            header={
                <Header
                    logo={
                        <div className="flex items-center gap-2">
                            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">S</span>
                            <span className="text-sm font-semibold">Supa UI</span>
                        </div>
                    }
                    segments={[
                        { label: "Playground", href: "/" },
                        { label: "Layouts", active: true, badge: "Preview" }
                    ]}
                    actions={<Badge variant="primary">v0.3.10</Badge>}
                    utilities={
                        <div className="flex items-center gap-2">
                            <span className="hidden text-sm text-foreground-muted sm:inline">Nana Elie</span>
                            <Avatar name="Nana Elie" size="sm" />
                        </div>
                    }
                />
            }
            sidebar={
                <Sidebar
                    pathname="/layouts"
                    groups={groups}
                    footer={
                        <div className="flex items-center gap-2 px-1 py-2">
                            <Avatar name="Nana Elie" size="sm" />
                            <div className="min-w-0">
                                <p className="truncate text-xs font-medium">Nana Elie</p>
                                <p className="truncate text-[11px] text-foreground-muted">Administrator</p>
                            </div>
                        </div>
                    }
                />
            }
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-5 sm:p-8">
                <PageHeader
                    title="Dashboard overview"
                    description="A full-page preview of the Supa UI Layout, Header and Sidebar components."
                    actions={<Button size="sm">Create report</Button>}
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        { label: "Total users", value: "2,420", detail: "+12.5% this month" },
                        { label: "Active sessions", value: "1,284", detail: "+8.2% this week" },
                        { label: "Revenue", value: "$12,840", detail: "+4.6% this month" },
                        { label: "Pending tasks", value: "18", detail: "6 due today" }
                    ].map((item) => (
                        <Card key={item.label}>
                            <CardContent className="flex flex-col gap-2 p-4">
                                <p className="text-sm text-foreground-muted">{item.label}</p>
                                <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
                                <p className="text-xs text-foreground-muted">{item.detail}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(240px,1fr)]">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent activity</CardTitle>
                            <CardDescription>Latest updates from your workspace.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            {[
                                { title: "New member joined", detail: "Alex Morgan joined the workspace.", time: "10 min ago" },
                                { title: "Report generated", detail: "The monthly activity report is ready.", time: "42 min ago" },
                                { title: "Settings updated", detail: "Workspace preferences were changed.", time: "2 hours ago" },
                                { title: "Project completed", detail: "The onboarding project was completed.", time: "Yesterday" }
                            ].map((item) => (
                                <div key={item.title} className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="mt-1 text-xs text-foreground-muted">{item.detail}</p>
                                    </div>
                                    <span className="shrink-0 text-xs text-foreground-muted">{item.time}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Workspace status</CardTitle>
                            <CardDescription>Current system overview.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">API status</span>
                                <Badge variant="primary">Operational</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Database</span>
                                <Badge variant="primary">Connected</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Storage</span>
                                <Badge>72% used</Badge>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-[72%] rounded-full bg-primary" />
                            </div>
                            <p className="text-xs text-foreground-muted">72 GB of 100 GB used.</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Layout test area</CardTitle>
                        <CardDescription>Scroll this page to verify that the main content scrolls without moving the header or sidebar.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }, (_, index) => (
                            <div key={index} className="rounded-lg border border-border p-4">
                                <p className="text-sm font-medium">Test section {index + 1}</p>
                                <p className="mt-2 text-xs leading-5 text-foreground-muted">Sample content used to check spacing, overflow, scrolling and responsive behavior inside the layout.</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
