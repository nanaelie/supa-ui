# supa-ui

[![npm version](https://img.shields.io/npm/v/supa-ui)](https://www.npmjs.com/package/supa-ui) [![npm downloads](https://img.shields.io/npm/dm/supa-ui)](https://www.npmjs.com/package/supa-ui)

UI kit de composants pour React et Next.js, avec Toastly (toasts, alertes et confirmations) intégré.

## Installation

```bash
npm install supa-ui
```

### Projet sans Tailwind CSS

Dans `app/layout.tsx`, importer une seule fois la feuille de style compilée :

```tsx
import "supa-ui/styles.css";
```

Cette feuille contient les tokens du thème et les utilitaires nécessaires aux composants. Elle n'inclut pas le preflight global de Tailwind.

### Projet utilisant Tailwind CSS v4

Dans `app/globals.css` :

```css
@import "tailwindcss";
@import "supa-ui/styles.css";
```

Les classes internes de Supa UI utilisent le préfixe natif Tailwind v4 `sui:` (par exemple `sui:flex`, `sui:hover:bg-primary`). Les utilitaires du projet hôte restent non préfixés : les deux systèmes peuvent cohabiter sans collision. Il ne faut pas ajouter `supa-ui/theme.css` séparément, car `styles.css` inclut déjà le thème et les utilitaires isolés.

Thème sombre : ajouter ou retirer la classe `dark` sur `<html>`.

Toutes les variables de thème du kit sont préfixées `--sui-*` pour éviter les collisions avec les variables de ton application.

## Composants

- UI : Button, Input, Select, Textarea, Checkbox, Badge, Avatar, Spinner, Modal, Link, Tabs, Dropdown, Card
- Layout : Header, Navbar, Sidebar, Footer, Container, Layout
- Shared : PageHeader, EmptyState, LoadingState
- Toastly : notifications, alertes, confirmations et gestion des promesses

## Toastly

```tsx
import { ToastlyProvider, toastly } from "supa-ui";

<ToastlyProvider position="bottom-right" duration={4000}>
    {children}
</ToastlyProvider>;

toastly.success("Profil enregistré");
toastly.promise(save(), { loading: "Envoi...", success: "Envoyé", error: "Erreur" });
await toastly.alert({ title: "Session", message: "Votre session expire bientôt." });
const ok = await toastly.confirm({ title: "Supprimer ?", danger: true });
```

## Playground

Le playground `test-sui` est disponible en ligne sur [supa-ui-three.vercel.app](https://supa-ui-three.vercel.app).

## Développement

```bash
npm install
npm run build
npm pack --dry-run
```

Le build génère les déclarations TypeScript et `dist/styles.css`. Les composants utilisent le préfixe Tailwind CSS v4 `sui:` ; `cn()` applique ce préfixe et fusionne les classes avec `tailwind-merge`. Le build génère automatiquement les candidats préfixés avant la compilation CSS.
