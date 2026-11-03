# supa-ui

UI kit de composants pour React et Next.js, avec Toastly (toasts, alertes, confirmations) intégré.

## Installation

    npm install supa-ui

Dans `app/layout.tsx`, importer le CSS compilé (aucun Tailwind requis dans le projet) :

    import "supa-ui/styles.css";

Thème sombre : ajouter la classe `dark` sur `<html>`.

Toutes les variables du kit sont préfixées `--sui-*` : elles n'entrent pas en conflit avec les
`--background` / `--foreground` de ton projet.

## Si ton projet utilise déjà Tailwind CSS v4 (et que tu veux les tokens dans tes propres classes)

Dans `globals.css`, à la place de l'import compilé :

    @import "tailwindcss";
    @import "supa-ui/theme.css";
    @source "../../node_modules/supa-ui/dist";

Les classes comme `bg-card`, `border-border` ou `text-foreground-muted` sont alors disponibles dans ton code.

## Composants

ui : Button, Input, Select, Textarea, Checkbox, Badge, Avatar, Spinner, Modal, Link, Tabs, Dropdown, Card
layout : Header, Navbar (menu mobile), Sidebar, Footer, Container, Layout
shared : PageHeader, EmptyState, LoadingState

## Toastly

    import { ToastlyProvider, toastly } from "supa-ui";

    <ToastlyProvider position="bottom-right" duration={4000}>{children}</ToastlyProvider>

    toastly.success("Profil enregistré");
    toastly.promise(save(), { loading: "Envoi...", success: "Envoyé", error: "Erreur" });
    await toastly.alert({ title: "Session", message: "Votre session expire bientôt." });
    const ok = await toastly.confirm({ title: "Supprimer ?", danger: true });

## Développement et publication

    npm install
    npm run build        # tsc (dist/*.js) + CSS compilé (dist/styles.css)
    npm pack --dry-run   # vérifier le contenu
    npm publish

Limite connue : les noms de classes (`bg-background`, `text-foreground`...) peuvent entrer en collision
avec ceux d'un projet qui définit les mêmes noms (thème shadcn par exemple).
