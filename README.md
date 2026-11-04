# supa-ui

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
@import "supa-ui/theme.css";
@source "../../node_modules/supa-ui/dist";
```

Ne pas importer également `supa-ui/styles.css` dans ce mode : cela chargerait une deuxième fois les utilitaires du package.

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

## Développement

```bash
npm install
npm run build
npm pack --dry-run
```

Le build génère les déclarations TypeScript et `dist/styles.css`. Les composants utilisent les classes Tailwind CSS v4 sans préfixe de classe ; `cn()` fusionne les classes avec `tailwind-merge`.
