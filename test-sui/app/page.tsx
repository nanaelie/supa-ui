"use client";

import { useState } from "react";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Container,
    Dropdown,
    EmptyState,
    Footer,
    Header,
    Input,
    Layout,
    Link,
    LoadingState,
    Modal,
    Navbar,
    PageHeader,
    Select,
    Sidebar,
    Spinner,
    Tabs,
    Textarea,
    ToastlyProvider,
    toastly
} from "supa-ui";

const pages = ["Actions", "Formulaires", "Interactions", "Layout & Shared"];

function Icon({ name }: { name: string }) {
    const paths: Record<string, string> = {
        home: "M3 10.5 12 3l9 7.5M5 9v12h14V9M9 21v-8h6v8",
        settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8-.1 1.7 1.7 0 0 0-1 1.5v.2h-3.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.1l-.2.1-1.7-2.9.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5.5v-3.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.7-2.9.2.1a1.7 1.7 0 0 0 1.8.1 1.7 1.7 0 0 0 1-1.5v-.2h3.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.1l.2-.1 1.7 2.9-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z",
        user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
        check: "m5 12 4 4L19 6",
        arrow: "M5 12h14m-7-7 7 7-7 7",
        plus: "M12 5v14m-7-7h14",
        search: "m21 21-4.3-4.3M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
    };

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4">
            <path d={paths[name] ?? paths.check} />
        </svg>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {children}
            </CardContent>
        </Card>
    );
}

export default function Home() {
    const [page, setPage] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [tab, setTab] = useState("overview");
    const [name, setName] = useState("Nana Elie");

    const next = () => setPage((current) => Math.min(current + 1, pages.length - 1));
    const previous = () => setPage((current) => Math.max(current - 1, 0));

    return (
        <ToastlyProvider position="bottom-right">
            <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-background text-foreground">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <span className="text-sm font-bold">S</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Supa UI</p>
                            <p className="text-xs text-foreground-muted">Component playground</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="primary">v0.3.6</Badge>
                        <Button size="sm" variant="outline" onClick={() => document.documentElement.classList.toggle("dark")}>
                            Toggle theme
                        </Button>
                    </div>
                </header>

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-6">
                        <div className="min-w-0">
                            <p className="text-xs text-foreground-muted">Component showcase</p>
                            <h1 className="truncate text-lg font-semibold">{pages[page]}</h1>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <Badge>{page + 1} / {pages.length}</Badge>
                            <Button size="sm" variant="outline" onClick={previous} disabled={page === 0}>
                                ←
                            </Button>
                            <Button size="sm" variant="outline" onClick={next} disabled={page === pages.length - 1}>
                                →
                            </Button>
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                        {page === 0 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section title="Buttons">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button>Primary</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="danger">Danger</Button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button size="tiny">Tiny</Button>
                                        <Button size="sm">Small</Button>
                                        <Button size="md">Medium</Button>
                                        <Button size="lg">Large</Button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button leftIcon={<Icon name="plus" />}>Add item</Button>
                                        <Button rightIcon={<Icon name="arrow" />} variant="outline">Continue</Button>
                                        <Button loading>Loading</Button>
                                        <Button disabled>Disabled</Button>
                                    </div>
                                </Section>

                                <Section title="Badges">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge>Default</Badge>
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                        <Badge variant="danger">Danger</Badge>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Badge size="sm">Small badge</Badge>
                                        <Badge size="md">Medium badge</Badge>
                                    </div>
                                </Section>

                                <Section title="Avatars">
                                    <div className="flex flex-wrap items-center gap-5">
                                        <Avatar name="Nana Elie" size="sm" />
                                        <Avatar name="John Doe" size="md" />
                                        <Avatar name="Jane Smith" size="lg" />
                                        <Avatar name="Alex Morgan" src="https://i.pravatar.cc/100?img=12" size="lg" />
                                    </div>
                                </Section>

                                <Section title="Spinners">
                                    <div className="flex items-center gap-6">
                                        <Spinner size="sm" />
                                        <Spinner size="md" />
                                        <Spinner size="lg" />
                                        <LoadingState label="Loading content..." className="w-auto py-2" />
                                    </div>
                                </Section>

                                <Section title="Links">
                                    <div className="flex flex-wrap gap-2">
                                        <Link url="#" text="Default link" />
                                        <Link url="#" text="Primary link" variant="primary" />
                                        <Link url="#" text="Secondary link" variant="secondary" />
                                        <Link url="#" text="Ghost link" variant="ghost" />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Link url="#" text="Active link" active />
                                        <Link url="#" icon={<Icon name="home" />} text="With icon" />
                                    </div>
                                </Section>

                                <Section title="Cards">
                                    <Card interactive>
                                        <CardHeader>
                                            <CardTitle>Interactive card</CardTitle>
                                            <CardDescription>Card description example.</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-foreground-muted">Card content goes here.</p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button size="sm">Action</Button>
                                            <Button size="sm" variant="outline">Cancel</Button>
                                        </CardFooter>
                                    </Card>
                                </Section>
                            </div>
                        )}

                        {page === 1 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section title="Inputs">
                                    <Input label="Full name" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} />
                                    <Input label="Email" type="email" placeholder="name@example.com" hint="We'll never share your email." />
                                    <Input label="Search" icon={<Icon name="search" />} placeholder="Search..." />
                                    <Input label="Disabled" placeholder="Disabled input" disabled />
                                </Section>

                                <Section title="Input variants">
                                    <Input label="Small" size="sm" placeholder="Small input" />
                                    <Input label="Medium" size="md" placeholder="Medium input" />
                                    <Input label="Large" size="lg" placeholder="Large input" />
                                    <Input label="Filled" variant="filled" placeholder="Filled input" />
                                    <Input label="With error" error="This field is required." placeholder="Enter a value" />
                                </Section>

                                <Section title="Select">
                                    <Select
                                        label="Country"
                                        defaultValue="bf"
                                        options={[
                                            { value: "bf", label: "Burkina Faso" },
                                            { value: "ci", label: "Côte d'Ivoire" },
                                            { value: "sn", label: "Senegal" },
                                            { value: "ml", label: "Mali" }
                                        ]}
                                    />
                                    <Select label="Disabled select" disabled options={[{ value: "1", label: "Unavailable" }]} />
                                </Section>

                                <Section title="Textarea">
                                    <Textarea label="Message" placeholder="Write your message..." rows={3} />
                                    <Textarea label="With hint" hint="Maximum 500 characters." placeholder="Your description..." rows={2} />
                                    <Textarea label="With error" error="This field is required." placeholder="Required field" rows={2} />
                                </Section>

                                <Section title="Checkboxes">
                                    <Checkbox label="Accept terms and conditions" description="You agree to our terms of service." checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                                    <Checkbox label="Subscribe to newsletter" />
                                    <Checkbox label="Disabled checkbox" disabled />
                                    <Badge variant={checked ? "primary" : "outline"}>{checked ? "Accepted" : "Not accepted"}</Badge>
                                </Section>
                            </div>
                        )}

                        {page === 2 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section title="Dropdown">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-foreground-muted">Open the menu to test it.</span>
                                        <Dropdown
                                            trigger={<Button variant="outline" size="sm">Options ▾</Button>}
                                            items={[
                                                { label: "View profile", icon: <Icon name="user" />, onSelect: () => toastly.info("Profile selected") },
                                                { label: "Settings", icon: <Icon name="settings" />, onSelect: () => toastly.info("Settings selected") },
                                                { type: "separator" },
                                                { label: "Delete", danger: true, onSelect: () => toastly.warning("Delete selected") }
                                            ]}
                                        />
                                    </div>
                                </Section>

                                <Section title="Modal">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-foreground-muted">Test the modal component.</p>
                                        <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                                    </div>
                                    <Modal
                                        open={modalOpen}
                                        onClose={() => setModalOpen(false)}
                                        title="Example modal"
                                        description="This is a demonstration of the Modal component."
                                        footer={
                                            <>
                                                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                                                <Button size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
                                            </>
                                        }
                                    >
                                        <p className="text-sm text-foreground-muted">You can close this modal using the close button, Escape, or by clicking outside.</p>
                                    </Modal>
                                </Section>

                                <Section title="Tabs">
                                    <Tabs
                                        value={tab}
                                        onChange={setTab}
                                        items={[
                                            { value: "overview", label: "Overview", content: <p className="text-sm text-foreground-muted">Overview tab content.</p> },
                                            { value: "activity", label: "Activity", content: <p className="text-sm text-foreground-muted">Activity tab content.</p> },
                                            { value: "settings", label: "Settings", content: <p className="text-sm text-foreground-muted">Settings tab content.</p> }
                                        ]}
                                    />
                                </Section>

                                <Section title="Toastly">
                                    <div className="flex flex-wrap gap-2">
                                        <Button size="sm" onClick={() => toastly.info("This is an information message.")}>Info</Button>
                                        <Button size="sm" onClick={() => toastly.success("Operation completed successfully.")}>Success</Button>
                                        <Button size="sm" variant="outline" onClick={() => toastly.warning("Please check this warning.")}>Warning</Button>
                                        <Button size="sm" variant="danger" onClick={() => toastly.error("Something went wrong.")}>Error</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Button size="sm" variant="outline" onClick={() => toastly.alert({ title: "Information", message: "This is a Toastly alert." })}>Alert</Button>
                                        <Button size="sm" variant="outline" onClick={async () => {
                                            const confirmed = await toastly.confirm({ title: "Confirm action", message: "Do you want to continue?", confirmLabel: "Continue" });
                                            toastly.info(confirmed ? "Confirmed" : "Cancelled");
                                        }}>Confirm</Button>
                                    </div>
                                </Section>
                            </div>
                        )}

                        {page === 3 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section title="Page header">
                                    <PageHeader
                                        title="Dashboard"
                                        description="Manage your workspace and settings."
                                        actions={<Button size="sm"><Icon name="plus" /> New project</Button>}
                                    />
                                </Section>

                                <Section title="Empty state">
                                    <EmptyState
                                        title="No projects yet"
                                        description="Create your first project to get started."
                                        icon={<Icon name="home" />}
                                        size="sm"
                                        action={<Button size="sm">Create project</Button>}
                                    />
                                </Section>

                                <Section title="Container">
                                    <Container size="sm" className="rounded-lg border border-dashed border-border py-4 text-center text-sm text-foreground-muted">
                                        Container size: sm
                                    </Container>
                                </Section>

                                <Section title="Header">
                                    <Header
                                        logo={<span className="text-sm font-semibold">Supa UI</span>}
                                        segments={[
                                            { label: "Dashboard", href: "#" },
                                            { label: "Components", active: true, badge: "New" }
                                        ]}
                                        utilities={<Avatar name="Nana Elie" />}
                                    />
                                </Section>

                                <Section title="Navbar">
                                    <Navbar
                                        logo={<span>Supa UI</span>}
                                        items={[
                                            { label: "Home", href: "#", active: true },
                                            { label: "Components", href: "#" },
                                            { label: "Documentation", href: "#" }
                                        ]}
                                        actions={<Button size="sm">Get started</Button>}
                                    />
                                </Section>

                                <Section title="Sidebar">
                                    <div className="flex h-56 overflow-hidden rounded-lg border border-border">
                                        <Sidebar
                                            pathname="/dashboard"
                                            groups={[
                                                [
                                                    { url: "/dashboard", text: "Dashboard", icon: <Icon name="home" /> },
                                                    { url: "/dashboard/settings", text: "Settings", icon: <Icon name="settings" /> }
                                                ],
                                                [
                                                    { url: "/profile", text: "Profile", icon: <Icon name="user" /> }
                                                ]
                                            ]}
                                            footer={<p className="px-2 text-xs text-foreground-muted">Supa UI demo</p>}
                                        />
                                        <div className="flex flex-1 items-center justify-center text-sm text-foreground-muted">
                                            Main content
                                        </div>
                                    </div>
                                </Section>

                                <Section title="Footer">
                                    <Footer
                                        brand={<span className="font-semibold text-foreground">Supa UI</span>}
                                        columns={[
                                            { title: "Product", content: <><a href="#">Components</a><a href="#">Documentation</a></> },
                                            { title: "Resources", content: <><a href="#">GitHub</a><a href="#">Support</a></> }
                                        ]}
                                        bottom="© 2026 Supa UI"
                                        bottomRight="Built with React"
                                        className="mt-0"
                                    />
                                </Section>

                                <Section title="Layout">
                                    <div className="h-64 overflow-hidden rounded-lg border border-border">
                                        <Layout
                                            className="h-full min-h-0"
                                            header={<Header logo={<span className="text-sm font-semibold">Layout preview</span>} />}
                                            sidebar={<Sidebar groups={[[{ url: "/", text: "Home", icon: <Icon name="home" /> }]]} />}
                                        >
                                            <div className="p-5">
                                                <PageHeader title="Layout content" description="Header, sidebar and main content." />
                                                <Card className="mt-4">
                                                    <CardContent>
                                                        <p className="text-sm text-foreground-muted">Layout component preview.</p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Layout>
                                    </div>
                                </Section>
                            </div>
                        )}
                    </div>

                    <footer className="flex h-14 shrink-0 items-center justify-between border-t border-border px-4 sm:px-6">
                        <p className="hidden text-xs text-foreground-muted sm:block">
                            Supa UI · Component playground
                        </p>
                        <div className="ml-auto flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={previous} disabled={page === 0}>
                                ←
                            </Button>
                            <span className="min-w-16 text-center text-xs text-foreground-muted">
                                {page + 1} / {pages.length}
                            </span>
                            <Button variant="outline" size="sm" onClick={next} disabled={page === pages.length - 1}>
                                →
                            </Button>
                        </div>
                    </footer>
                </main>
            </div>
        </ToastlyProvider>
    );
}