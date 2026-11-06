"use client";

import { useEffect, useState, type ReactNode } from "react";
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

const pages = [
    { id: "actions", label: "Actions", description: "Boutons, badges, avatars, liens, cartes et états de chargement." },
    { id: "forms", label: "Formulaires", description: "Champs de saisie, sélecteurs, zones de texte et cases à cocher." },
    { id: "interactions", label: "Interactions", description: "Menu déroulant, modale et onglets." },
    { id: "toastly", label: "Toastly", description: "Toasts, promesses, alertes, confirmations et positions." },
    { id: "layout", label: "Layout & Shared", description: "Header, navbar, sidebar, footer, layout et composants partagés." }
] as const;

const VERSION = "v0.3.11";

const toastPositions = [
    "top-left", "top-center", "top-right",
    "left-center", "center", "right-center",
    "bottom-left", "bottom-center", "bottom-right"
] as const;

type ToastPosition = (typeof toastPositions)[number];

function Icon({ name }: { name: string }) {
    const paths: Record<string, string> = {
        home: "M3 10.5 12 3l9 7.5M5 9v12h14V9M9 21v-8h6v8",
        settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8-.1 1.7 1.7 0 0 0-1 1.5v.2h-3.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.1l-.2.1-1.7-2.9.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5.5v-3.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.7-2.9.2.1a1.7 1.7 0 0 0 1.8.1 1.7 1.7 0 0 0 1-1.5v-.2h3.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.1l.2-.1 1.7 2.9-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z",
        user: "M20 21a8 8 0 0 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
        check: "m5 12 4 4L19 6",
        arrow: "M5 12h14m-7-7 7 7-7 7",
        plus: "M12 5v14m-7-7h14",
        search: "m21 21-4.3-4.3M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
        copy: "M9 9h11v11H9zM5 15V4h11",
        sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 1v2m0 18v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M1 12h2m18 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
        moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z",
        trash: "M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14",
        mail: "M3 5h18v14H3zM3 7l9 6 9-6"
    };

    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
            <path d={paths[name] ?? paths.check} />
        </svg>
    );
}

/** Carte de démonstration : titre, description optionnelle et extrait de code copiable. */
function Section({
    title,
    description,
    code,
    className,
    children
}: {
    title: string;
    description?: string;
    code?: string;
    className?: string;
    children: ReactNode;
}) {
    const [showCode, setShowCode] = useState(false);

    const copy = async () => {
        if (!code) return;
        try {
            await navigator.clipboard.writeText(code);
            toastly.success("Code copié dans le presse-papiers.");
        } catch {
            toastly.error("Impossible de copier le code.");
        }
    };

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <CardTitle>{title}</CardTitle>
                        {description && <CardDescription>{description}</CardDescription>}
                    </div>
                    {code && (
                        <Button size="tiny" variant="ghost" onClick={() => setShowCode((value) => !value)} aria-expanded={showCode}>
                            {showCode ? "Masquer" : "Code"}
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {children}
                {code && showCode && (
                    <div className="relative">
                        <pre className="overflow-x-auto rounded-lg border border-border bg-muted p-3 pr-12 font-mono text-xs leading-relaxed text-foreground">
                            <code>{code}</code>
                        </pre>
                        <Button
                            size="tiny"
                            variant="outline"
                            className="absolute right-2 top-2"
                            onClick={copy}
                            aria-label="Copier le code"
                        >
                            <Icon name="copy" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function Row({ label, children }: { label?: string; children: ReactNode }) {
    return (
        <div className="flex flex-col gap-2">
            {label && <p className="text-xs font-medium uppercase tracking-wide text-foreground-muted">{label}</p>}
            <div className="flex flex-wrap items-center gap-2">{children}</div>
        </div>
    );
}

export default function Home() {
    const [page, setPage] = useState(0);
    const [dark, setDark] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSize, setModalSize] = useState<"sm" | "md" | "lg">("md");
    const [checked, setChecked] = useState(true);
    const [newsletter, setNewsletter] = useState(false);
    const [tab, setTab] = useState("overview");
    const [name, setName] = useState("Supa UI");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("bf");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [toastPosition, setToastPosition] = useState<ToastPosition>("top-center");
    const [lastToastId, setLastToastId] = useState<string | null>(null);

    const [toastX, setToastX] = useState<number>(24);
    const [toastY, setToastY] = useState<number>(24);

    const current = pages[page];
    const emailError = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email) ? "Adresse e-mail invalide." : undefined;
    const messageLimit = 200;

    const next = () => setPage((value) => Math.min(value + 1, pages.length - 1));
    const previous = () => setPage((value) => Math.max(value - 1, 0));

    // Thème : synchronisé avec la classe `dark` et avec la préférence système au premier rendu.
    useEffect(() => {
        const apply = () => {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setDark(document.documentElement.classList.contains("dark") || prefersDark);
        };apply();
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    // Page courante conservée dans l'URL (#interactions) pour pouvoir partager un lien direct.
    useEffect(() => {
        const apply = () => {
            const index = pages.findIndex((item) => item.id === window.location.hash.slice(1));
            if (index >= 0) setPage(index);
        };apply();
    }, []);

    useEffect(() => {
        window.history.replaceState(null, "", `#${current.id}`);
    }, [current.id]);

    // Navigation clavier ← / → (désactivée pendant la saisie).
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            if (target?.closest("input, textarea, select, [contenteditable='true'], [role='dialog']")) return;
            if (event.key === "ArrowRight") next();
            if (event.key === "ArrowLeft") previous();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const submitForm = async () => {
        if (!name.trim() || emailError || !email) {
            toastly.warning("Vérifiez les champs du formulaire.");
            return;
        }
        setSubmitting(true);
        try {
            await toastly.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
                loading: "Envoi en cours…",
                success: `Merci ${name}, formulaire envoyé !`,
                error: "L'envoi a échoué."
            });
        } finally {
            setSubmitting(false);
        }
    };

    const renderPageNav = (compact = false) => (
        <div className="flex flex-col">
            <div className="flex shrink-0 items-center gap-2">
                {!compact && <Badge>{page + 1} / {pages.length}</Badge>}
                <Button size="sm" variant="outline" onClick={previous} disabled={page === 0} aria-label="Page précédente">
                    &larr;
                </Button>
                {compact && (
                    <span className="min-w-16 text-center text-xs text-foreground-muted">
                        {page + 1} / {pages.length}
                    </span>
                )}
                <Button size="sm" variant="outline" onClick={next} disabled={page === pages.length - 1} aria-label="Page suivante">
                    &rarr;
                </Button>
            </div>
            {page === 4 && (
                <div>
                    <Link url="/layouts">See complete usage &rarr;</Link>
                </div>
            )}
        </div>
    );

    return (
        <ToastlyProvider position={toastPosition} maxVisible={4}>
            <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-background text-foreground">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Avatar name="S" size="lg" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Supa UI</p>
                            <p className="text-xs text-foreground-muted">Component playground</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge variant="primary">{VERSION}</Badge>
                        <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Icon name={dark ? "sun" : "moon"} />}
                            onClick={() => setDark((value) => !value)}
                            aria-pressed={dark}
                        >
                            <span className="hidden sm:inline">{dark ? "Mode clair" : "Mode sombre"}</span>
                        </Button>
                    </div>
                </header>

                <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="shrink-0 border-b border-border px-4 py-3 sm:px-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs text-foreground-muted">Component showcase</p>
                                <h1 className="truncate text-lg font-semibold">{current.label}</h1>
                                <p className="hidden truncate text-xs text-foreground-muted sm:block">{current.description}</p>
                            </div>
                            {renderPageNav()}
                        </div>

                        <nav aria-label="Pages du playground" className="-mx-1 mt-3 flex gap-1 overflow-x-auto px-1">
                            {pages.map((item, index) => (
                                <Button
                                    key={item.id}
                                    size="tiny"
                                    variant={index === page ? "primary" : "ghost"}
                                    onClick={() => setPage(index)}
                                    aria-current={index === page ? "page" : undefined}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </nav>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
                        {page === 0 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section
                                    title="Buttons"
                                    description="5 variantes, 4 tailles, icônes et états."
                                    code={`<Button variant="outline" size="sm" leftIcon={<Icon />}>Add item</Button>\n<Button loading>Loading</Button>`}
                                >
                                    <Row label="Variantes">
                                        <Button>Primary</Button>
                                        <Button variant="secondary">Secondary</Button>
                                        <Button variant="outline">Outline</Button>
                                        <Button variant="ghost">Ghost</Button>
                                        <Button variant="danger">Danger</Button>
                                    </Row>
                                    <Row label="Tailles">
                                        <Button size="tiny">Tiny</Button>
                                        <Button size="sm">Small</Button>
                                        <Button size="md">Medium</Button>
                                        <Button size="lg">Large</Button>
                                    </Row>
                                    <Row label="Icônes">
                                        <Button leftIcon={<Icon name="plus" />}>Add item</Button>
                                        <Button rightIcon={<Icon name="arrow" />} variant="outline">Continue</Button>
                                        <Button variant="danger" leftIcon={<Icon name="trash" />}>Delete</Button>
                                    </Row>
                                    <Row label="États">
                                        <Button loading>Loading</Button>
                                        <Button variant="outline" loading>Loading</Button>
                                        <Button disabled>Disabled</Button>
                                        <Button variant="outline" disabled>Disabled</Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Badges"
                                    description="4 variantes, 2 tailles."
                                    code={`<Badge variant="primary" size="sm">New</Badge>`}
                                >
                                    <Row label="Variantes">
                                        <Badge>Default</Badge>
                                        <Badge variant="primary">Primary</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                        <Badge variant="danger">Danger</Badge>
                                    </Row>
                                    <Row label="Tailles">
                                        <Badge size="sm">Small badge</Badge>
                                        <Badge size="md">Medium badge</Badge>
                                    </Row>
                                    <Row label="En contexte">
                                        <Button variant="outline" size="sm">
                                            Notifications <Badge variant="danger" size="sm">3</Badge>
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Inbox <Badge variant="primary" size="sm">12</Badge>
                                        </Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Avatars"
                                    description="Initiales automatiques à partir du nom, ou image."
                                    code={`<Avatar name="Nana Elie" size="lg" />\n<Avatar name="Alex" src="/photo.jpg" />`}
                                >
                                    <Row label="Initiales">
                                        <Avatar name="Nana Elie" size="sm" />
                                        <Avatar name="John Doe" size="md" />
                                        <Avatar name="Jane Smith" size="lg" />
                                    </Row>
                                    <Row label="Image">
                                        <Avatar name="Alex Morgan" src="https://i.pravatar.cc/100?img=12" size="sm" />
                                        <Avatar name="Sam Lee" src="https://i.pravatar.cc/100?img=32" size="md" />
                                        <Avatar name="Alex Morgan" src="https://i.pravatar.cc/100?img=12" size="lg" />
                                    </Row>
                                    <Row label="Groupe">
                                        <div className="flex -space-x-2">
                                            {["Nana Elie", "John Doe", "Jane Smith", "Max Power"].map((person) => (
                                                <Avatar key={person} name={person} size="md" className="ring-2 ring-background" />
                                            ))}
                                        </div>
                                        <span className="text-xs text-foreground-muted">4 membres</span>
                                    </Row>
                                </Section>

                                <Section
                                    title="Spinners & chargement"
                                    code={`<Spinner size="md" />\n<LoadingState label="Loading content..." />`}
                                >
                                    <Row label="Spinner">
                                        <Spinner size="sm" />
                                        <Spinner size="md" />
                                        <Spinner size="lg" />
                                    </Row>
                                    <Row label="LoadingState">
                                        <LoadingState label="Loading content..." className="w-auto py-2" />
                                    </Row>
                                </Section>

                                <Section
                                    title="Links"
                                    description="4 variantes, 3 tailles, état actif et icône."
                                    code={`<Link url="/docs" text="Docs" variant="primary" />\n<Link url="#" icon={<Icon />} text="Home" active />`}
                                >
                                    <Row label="Variantes">
                                        <Link url="#" text="Default link" />
                                        <Link url="#" text="Primary link" variant="primary" />
                                        <Link url="#" text="Secondary link" variant="secondary" />
                                        <Link url="#" text="Ghost link" variant="ghost" />
                                    </Row>
                                    <Row label="Tailles">
                                        <Link url="#" text="Small" size="sm" variant="primary" />
                                        <Link url="#" text="Medium" size="md" variant="primary" />
                                        <Link url="#" text="Large" size="lg" variant="primary" />
                                    </Row>
                                    <Row label="États">
                                        <Link url="#" text="Active link" active />
                                        <Link url="#" icon={<Icon name="home" />} text="With icon" />
                                    </Row>
                                </Section>

                                <Section
                                    title="Cards"
                                    description="Carte statique et carte interactive."
                                    code={`<Card interactive>\n  <CardHeader><CardTitle>Title</CardTitle></CardHeader>\n  <CardContent>…</CardContent>\n  <CardFooter>…</CardFooter>\n</Card>`}
                                >
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Static card</CardTitle>
                                                <CardDescription>Sans effet au survol.</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-foreground-muted">Card content goes here.</p>
                                            </CardContent>
                                        </Card>
                                        <Card interactive>
                                            <CardHeader>
                                                <CardTitle>Interactive card</CardTitle>
                                                <CardDescription>Réagit au survol.</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-foreground-muted">Card content goes here.</p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button size="sm">Action</Button>
                                                <Button size="sm" variant="outline">Cancel</Button>
                                            </CardFooter>
                                        </Card>
                                    </div>
                                </Section>
                            </div>
                        )}

                        {page === 1 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section
                                    title="Formulaire complet"
                                    description="Exemple réel : validation, compteur de caractères et envoi avec toastly.promise."
                                    className="lg:col-span-2"
                                    code={`await toastly.promise(save(), {\n  loading: "Envoi…",\n  success: "Envoyé !",\n  error: "Échec."\n});`}
                                >
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Input
                                            label="Full name"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            error={name.trim() ? undefined : "This field is required."}
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            icon={<Icon name="mail" />}
                                            hint="We'll never share your email."
                                            error={emailError}
                                        />
                                        <Select
                                            label="Country"
                                            value={country}
                                            onChange={(event) => setCountry(event.target.value)}
                                            options={[
                                                { value: "bf", label: "Burkina Faso" },
                                                { value: "ci", label: "Côte d'Ivoire" },
                                                { value: "sn", label: "Senegal" },
                                                { value: "ml", label: "Mali" },
                                                { value: "ne", label: "Niger (indisponible)", disabled: true }
                                            ]}
                                        />
                                        <Textarea
                                            label="Message"
                                            placeholder="Write your message..."
                                            rows={3}
                                            value={message}
                                            maxLength={messageLimit}
                                            onChange={(event) => setMessage(event.target.value)}
                                            hint={`${message.length} / ${messageLimit} caractères`}
                                        />
                                    </div>
                                    <Checkbox
                                        label="Subscribe to newsletter"
                                        description="Recevez les nouveautés de Supa UI."
                                        checked={newsletter}
                                        onChange={(event) => setNewsletter(event.target.checked)}
                                    />
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <p className="text-xs text-foreground-muted">
                                            Pays : <strong>{country.toUpperCase()}</strong> · Newsletter : <strong>{newsletter ? "oui" : "non"}</strong>
                                        </p>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setName("");
                                                    setEmail("");
                                                    setMessage("");
                                                    setNewsletter(false);
                                                    setCountry("bf");
                                                }}
                                            >
                                                Reset
                                            </Button>
                                            <Button loading={submitting} onClick={submitForm} rightIcon={<Icon name="arrow" />}>
                                                Send
                                            </Button>
                                        </div>
                                    </div>
                                </Section>

                                <Section
                                    title="Inputs"
                                    code={`<Input label="Search" icon={<Icon />} placeholder="Search..." />\n<Input label="Email" error="Required" />`}
                                >
                                    <Input label="Default" placeholder="Enter a value" />
                                    <Input label="With icon" icon={<Icon name="search" />} placeholder="Search..." />
                                    <Input label="With hint" hint="Helper text under the field." placeholder="Enter a value" />
                                    <Input label="With error" error="This field is required." placeholder="Enter a value" />
                                    <Input label="Disabled" placeholder="Disabled input" disabled />
                                </Section>

                                <Section
                                    title="Input variants"
                                    code={`<Input size="lg" variant="filled" />`}
                                >
                                    <Row label="Tailles">
                                        <div className="grid w-full gap-3 sm:grid-cols-3">
                                            <Input label="Small" size="sm" placeholder="Small input" />
                                            <Input label="Medium" size="md" placeholder="Medium input" />
                                            <Input label="Large" size="lg" placeholder="Large input" />
                                        </div>
                                    </Row>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <Input label="Default variant" variant="default" placeholder="Default" />
                                        <Input label="Filled variant" variant="filled" placeholder="Filled" />
                                    </div>
                                </Section>

                                <Section
                                    title="Select"
                                    code={`<Select label="Country" options={[{ value: "bf", label: "Burkina Faso" }]} />`}
                                >
                                    <Select
                                        label="Default"
                                        defaultValue="bf"
                                        options={[
                                            { value: "bf", label: "Burkina Faso" },
                                            { value: "ci", label: "Côte d'Ivoire" },
                                            { value: "sn", label: "Senegal" }
                                        ]}
                                    />
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <Select label="Small" size="sm" options={[{ value: "1", label: "Option 1" }]} />
                                        <Select label="Medium" size="md" options={[{ value: "1", label: "Option 1" }]} />
                                        <Select label="Large" size="lg" options={[{ value: "1", label: "Option 1" }]} />
                                    </div>
                                    <Select label="With hint" hint="Choisissez une option." options={[{ value: "1", label: "Option 1" }]} />
                                    <Select label="With error" error="Please select a value." options={[{ value: "", label: "Select..." }]} />
                                    <Select label="Disabled select" disabled options={[{ value: "1", label: "Unavailable" }]} />
                                </Section>

                                <Section
                                    title="Textarea"
                                    code={`<Textarea label="Message" hint="Max 500 characters." rows={3} />`}
                                >
                                    <Textarea label="Message" placeholder="Write your message..." rows={3} />
                                    <Textarea label="With hint" hint="Maximum 500 characters." placeholder="Your description..." rows={2} />
                                    <Textarea label="With error" error="This field is required." placeholder="Required field" rows={2} />
                                    <Textarea label="Disabled" disabled placeholder="Disabled textarea" rows={2} />
                                </Section>

                                <Section
                                    title="Checkboxes"
                                    code={`<Checkbox label="Accept" description="…" checked={v} onChange={(e) => set(e.target.checked)} />`}
                                >
                                    <Checkbox
                                        label="Accept terms and conditions"
                                        description="You agree to our terms of service."
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                    />
                                    <Checkbox label="Subscribe to newsletter" />
                                    <Checkbox label="Disabled checkbox" disabled />
                                    <Checkbox label="Disabled & checked" disabled defaultChecked />
                                    <Badge variant={checked ? "primary" : "outline"}>{checked ? "Accepted" : "Not accepted"}</Badge>
                                </Section>
                            </div>
                        )}

                        {page === 2 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section
                                    title="Dropdown"
                                    description="Alignement, séparateurs, icônes, éléments dangereux et désactivés."
                                    code={`<Dropdown\n  trigger={<Button variant="outline">Options</Button>}\n  align="end"\n  items={[\n    { label: "Profile", onSelect },\n    { type: "separator" },\n    { label: "Delete", danger: true }\n  ]}\n/>`}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <span className="text-sm text-foreground-muted">Open the menu to test it.</span>
                                        <div className="flex gap-2">
                                            <Dropdown
                                                align="start"
                                                triggerLabel="Menu aligné à gauche"
                                                trigger={<Button variant="outline" size="sm">Align start ▾</Button>}
                                                items={[
                                                    { label: "View profile", icon: <Icon name="user" />, onSelect: () => toastly.info("Profile selected") },
                                                    { label: "Settings", icon: <Icon name="settings" />, onSelect: () => toastly.info("Settings selected") },
                                                    { label: "Billing (soon)", disabled: true },
                                                    { type: "separator" },
                                                    {
                                                        label: "Delete",
                                                        danger: true,
                                                        icon: <Icon name="trash" />,
                                                        onSelect: async () => {
                                                            const ok = await toastly.confirm({
                                                                title: "Delete item",
                                                                message: "This action cannot be undone.",
                                                                confirmLabel: "Delete",
                                                                danger: true
                                                            });
                                                            if (ok) toastly.success("Item deleted.");
                                                        }
                                                    }
                                                ]}
                                            />
                                            <Dropdown
                                                align="end"
                                                triggerLabel="Menu aligné à droite"
                                                trigger={<Button variant="outline" size="sm">Align end ▾</Button>}
                                                items={[
                                                    { label: "View profile", icon: <Icon name="user" />, onSelect: () => toastly.info("Profile selected") },
                                                    { label: "Settings", icon: <Icon name="settings" />, onSelect: () => toastly.info("Settings selected") }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </Section>

                                <Section
                                    title="Modal"
                                    description="3 tailles. Fermeture via le bouton, Échap ou un clic à l'extérieur."
                                    code={`<Modal open={open} onClose={() => setOpen(false)} title="Title" size="md" footer={<Button>OK</Button>}>…</Modal>`}
                                >
                                    <Row label="Taille">
                                        {(["sm", "md", "lg"] as const).map((size) => (
                                            <Button
                                                key={size}
                                                size="sm"
                                                variant={modalSize === size ? "primary" : "outline"}
                                                onClick={() => setModalSize(size)}
                                            >
                                                {size}
                                            </Button>
                                        ))}
                                    </Row>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-foreground-muted">Test the modal component.</p>
                                        <Button onClick={() => setModalOpen(true)}>Open modal ({modalSize})</Button>
                                    </div>
                                    <Modal
                                        open={modalOpen}
                                        onClose={() => setModalOpen(false)}
                                        size={modalSize}
                                        title="Example modal"
                                        description="This is a demonstration of the Modal component."
                                        footer={
                                            <>
                                                <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setModalOpen(false);
                                                        toastly.success("Action confirmed.");
                                                    }}
                                                >
                                                    Confirm
                                                </Button>
                                            </>
                                        }
                                    >
                                        <div className="flex flex-col gap-3">
                                            <p className="text-sm text-foreground-muted">
                                                You can close this modal using the close button, Escape, or by clicking outside.
                                            </p>
                                            <Input label="Inline field" placeholder="Fields work inside modals too" />
                                        </div>
                                    </Modal>
                                </Section>

                                <Section
                                    title="Tabs"
                                    description="Contrôlé, avec icônes et onglet désactivé."
                                    className="lg:col-span-2"
                                    code={`<Tabs value={tab} onChange={setTab} items={[{ value: "a", label: "A", icon, content }]} />`}
                                >
                                    <Tabs
                                        value={tab}
                                        onChange={setTab}
                                        items={[
                                            { value: "overview", label: "Overview", icon: <Icon name="home" />, content: <p className="text-sm text-foreground-muted">Overview tab content.</p> },
                                            { value: "activity", label: "Activity", icon: <Icon name="user" />, content: <p className="text-sm text-foreground-muted">Activity tab content.</p> },
                                            { value: "settings", label: "Settings", icon: <Icon name="settings" />, content: <p className="text-sm text-foreground-muted">Settings tab content.</p> },
                                            { value: "archived", label: "Archived", disabled: true, content: null }
                                        ]}
                                    />
                                    <p className="text-xs text-foreground-muted">
                                        Onglet actif : <strong>{tab}</strong>
                                    </p>
                                </Section>
                            </div>
                        )}

                        {page === 3 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section
                                    title="Toasts"
                                    description="4 variantes, durée personnalisée et fermeture manuelle."
                                    code={`toastly.success("Saved!");\ntoastly.add({ message: "Persistent", variant: "info", autoDismiss: false });\ntoastly.dismiss(id);`}
                                >
                                    <Row label="Variantes">
                                        <Button size="sm" onClick={() => toastly.info("This is an information message.")}>Info</Button>
                                        <Button size="sm" onClick={() => toastly.success("Operation completed successfully.")}>Success</Button>
                                        <Button size="sm" variant="outline" onClick={() => toastly.warning("Please check this warning.")}>Warning</Button>
                                        <Button size="sm" variant="danger" onClick={() => toastly.error("Something went wrong.")}>Error</Button>
                                    </Row>
                                    <Row label="Options">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => toastly.add({ message: "Disparaît après 8 secondes.", variant: "info", autoDismissIn: 8000 })}
                                        >
                                            Durée 8 s
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setLastToastId(toastly.add({ message: "Toast persistant.", variant: "warning", autoDismiss: false }))}
                                        >
                                            Persistant
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            disabled={!lastToastId}
                                            onClick={() => {
                                                if (lastToastId) toastly.dismiss(lastToastId);
                                                setLastToastId(null);
                                            }}
                                        >
                                            Fermer le persistant
                                        </Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Promesses"
                                    description="Un toast de chargement qui devient succès ou erreur."
                                    code={`toastly.promise(fetchData(), {\n  loading: "Loading…",\n  success: (data) => \`\${data.length} items\`,\n  error: (e) => "Failed"\n});`}
                                >
                                    <Row>
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                toastly.promise(new Promise<string>((resolve) => setTimeout(() => resolve("Données"), 1500)), {
                                                    loading: "Chargement en cours…",
                                                    success: (value) => `${value} chargées avec succès.`,
                                                    error: "Échec du chargement."
                                                })
                                            }
                                        >
                                            Promesse réussie
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() =>
                                                toastly
                                                    .promise(new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 1500)), {
                                                        loading: "Connexion au serveur…",
                                                        success: "Connecté.",
                                                        error: (error) => `Erreur : ${error instanceof Error ? error.message : "inconnue"}`
                                                    })
                                                    .catch(() => undefined)
                                            }
                                        >
                                            Promesse rejetée
                                        </Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Alertes & confirmations"
                                    description="Boîtes de dialogue asynchrones : await toastly.confirm() renvoie un booléen."
                                    code={`const ok = await toastly.confirm({ title: "Delete?", danger: true });\nif (ok) remove();`}
                                >
                                    <Row>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={async () => {
                                                await toastly.alert({ title: "Information", message: "This is a Toastly alert.", okLabel: "Compris" });
                                                toastly.info("Alerte fermée.");
                                            }}
                                        >
                                            Alert
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={async () => {
                                                const confirmed = await toastly.confirm({
                                                    title: "Confirm action",
                                                    message: "Do you want to continue?",
                                                    confirmLabel: "Continue",
                                                    cancelLabel: "Not now"
                                                });
                                                toastly.info(confirmed ? "Confirmed" : "Cancelled");
                                            }}
                                        >
                                            Confirm
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={async () => {
                                                const confirmed = await toastly.confirm({
                                                    title: "Delete account",
                                                    message: "This action is permanent and cannot be undone.",
                                                    confirmLabel: "Delete",
                                                    danger: true
                                                });
                                                if (confirmed) toastly.success("Account deleted.");
                                            }}
                                        >
                                            Confirm (danger)
                                        </Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Position"
                                    description="Position globale du provider et position libre avec toastly.to(x, y)."
                                    code={`<ToastlyProvider position="bottom-right" maxVisible={4} />\ntoastly.to(50, 50).add("Au centre");`}
                                >
                                    <Select
                                        label="Position du provider"
                                        value={toastPosition}
                                        onChange={(event) => setToastPosition(event.target.value as ToastPosition)}
                                        options={toastPositions.map((position) => ({ value: position, label: position }))}
                                    />
                                    <Row>
                                        <Button size="sm" onClick={() => toastly.success(`Position : ${toastPosition}`)}>
                                            Tester la position
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => toastly.to(toastX, toastY).add(`toastly.to(x=${toastX}, y=${toastY})`)}>
                                            toastly.to(
                                            <div className="flex">
                                                <Input onClick={(e) => {e.preventDefault();e.stopPropagation();}} value={toastX} onChange={(e) => { setToastX(Number(e.target.value)) }} type="number" className="w-16! h-5! text-center text-xs! p-1!" />,
                                                <Input onClick={(e) => {e.preventDefault();e.stopPropagation();}} value={toastY} onChange={(e) => { setToastY(Number(e.target.value)) }} type="number" className="w-16! h-5! text-center text-xs! p-1!" />
                                            </div>)
                                        </Button>
                                    </Row>
                                </Section>

                                <Section
                                    title="Empilement"
                                    description="Le provider limite l'affichage à maxVisible (4 ici)."
                                    className="lg:col-span-2"
                                >
                                    <Row>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                (["info", "success", "warning", "error"] as const).forEach((variant, index) =>
                                                    setTimeout(() => toastly[variant](`Toast ${index + 1} (${variant})`), index * 150)
                                                );
                                            }}
                                        >
                                            Lancer 4 toasts
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                for (let index = 1; index <= 8; index++) toastly.info(`Toast ${index} / 8`);
                                            }}
                                        >
                                            Lancer 8 toasts
                                        </Button>
                                    </Row>
                                </Section>
                            </div>
                        )}

                        {page === 4 && (
                            <div className="grid gap-4 lg:grid-cols-2">
                                <Section
                                    title="Page header"
                                    code={`<PageHeader title="Dashboard" description="…" actions={<Button>New</Button>} />`}
                                >
                                    <PageHeader
                                        title="Dashboard"
                                        description="Manage your workspace and settings."
                                        actions={<Button size="sm" leftIcon={<Icon name="plus" />}>New project</Button>}
                                    />
                                </Section>

                                <Section
                                    title="Empty state"
                                    description="3 variantes, 3 tailles."
                                    code={`<EmptyState variant="bordered" size="md" title="…" action={<Button>Create</Button>} />`}
                                >
                                    <div className="grid gap-3 sm:grid-cols-3">
                                        <EmptyState
                                            title="Default"
                                            description="Bordure en pointillés."
                                            icon={<Icon name="home" />}
                                            size="sm"
                                            action={<Button size="sm">Create</Button>}
                                        />
                                        <EmptyState
                                            variant="bordered"
                                            title="Bordered"
                                            description="Bordure pleine."
                                            icon={<Icon name="search" />}
                                            size="sm"
                                            action={<Button size="sm" variant="outline">Search</Button>}
                                        />
                                        <EmptyState
                                            variant="minimal"
                                            title="Minimal"
                                            description="Sans bordure."
                                            icon={<Icon name="check" />}
                                            size="sm"
                                        />
                                    </div>
                                </Section>

                                <Section
                                    title="Container"
                                    description="Largeurs maximales : sm, md, lg, xl, full."
                                    code={`<Container size="lg">…</Container>`}
                                >
                                    {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
                                        <Container
                                            key={size}
                                            size={size}
                                            className="rounded-lg border border-dashed border-border py-2 text-center text-xs text-foreground-muted"
                                        >
                                            Container size: {size}
                                        </Container>
                                    ))}
                                </Section>

                                <Section
                                    title="Header"
                                    code={`<Header logo={…} segments={[{ label, href, active, badge }]} utilities={<Avatar />} />`}
                                >
                                    <Header
                                        logo={<span className="text-sm font-semibold">Supa UI</span>}
                                        segments={[
                                            { label: "Dashboard", href: "#", icon: <Icon name="home" /> },
                                            { label: "Components", href: "#", active: true, badge: "New" },
                                            { label: "Settings", href: "#", icon: <Icon name="settings" /> }
                                        ]}
                                        actions={<Button size="sm" variant="outline">Invite</Button>}
                                        utilities={<Avatar name="Nana Elie" />}
                                    />
                                </Section>

                                <Section
                                    title="Navbar"
                                    code={`<Navbar logo={…} items={[{ label, href, active }]} actions={<Button />} blur />`}
                                >
                                    <Navbar
                                        logo={<span>Supa UI</span>}
                                        items={[
                                            { label: "Home", href: "#", active: true },
                                            { label: "Components", href: "#" },
                                            { label: "Documentation", href: "#" },
                                            { label: "Toast", onClick: () => toastly.info("Navbar onClick") }
                                        ]}
                                        actions={<Button size="sm">Get started</Button>}
                                    />
                                </Section>

                                <Section
                                    title="Sidebar"
                                    description="Groupes de liens, état actif déterminé par pathname."
                                    code={`<Sidebar pathname="/dashboard" groups={[[{ url, text, icon }], […]]} footer={…} />`}
                                >
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

                                <Section
                                    title="Footer"
                                    code={`<Footer brand={…} columns={[{ title, content }]} bottom="© 2026" bottomRight="…" />`}
                                >
                                    <Footer
                                        brand={<span className="font-semibold text-foreground">Supa UI</span>}
                                        columns={[
                                            { title: "Product", content: <><a href="#">Components</a><a href="#">Documentation</a></> },
                                            { title: "Resources", content: <><a href="https://github.com/nanaelie/supa-ui">GitHub</a><a href="#">Support</a></> }
                                        ]}
                                        bottom="© 2026 Supa UI"
                                        bottomRight="Built with React"
                                        className="mt-0"
                                    />
                                </Section>

                                <Section
                                    title="Layout"
                                    description="Header + sidebar + contenu + footer. La sidebar apparaît à partir du breakpoint md."
                                    className="lg:col-span-2"
                                    code={`<Layout header={<Header />} sidebar={<Sidebar groups={…} />} footer={<Footer />} stickyHeader>…</Layout>`}
                                >
                                    <div className="h-72 overflow-auto rounded-lg border border-border">
                                        <Layout
                                            className="min-h-full"
                                            header={<Header logo={<span className="text-sm font-semibold">Layout preview</span>} utilities={<Avatar name="Nana Elie" size="sm" />} />}
                                            sidebar={
                                                <Sidebar
                                                    pathname="/"
                                                    groups={[
                                                        [
                                                            { url: "/", text: "Home", icon: <Icon name="home" /> },
                                                            { url: "/settings", text: "Settings", icon: <Icon name="settings" /> }
                                                        ]
                                                    ]}
                                                />
                                            }
                                            footer={<p className="border-t border-border px-4 py-2 text-xs text-foreground-muted">Layout footer</p>}
                                        >
                                            <div className="p-5">
                                                <PageHeader title="Layout content" description="Header, sidebar, main content and footer." />
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
                </main>
            </div>
        </ToastlyProvider>
    );
}
