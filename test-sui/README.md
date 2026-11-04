# test-sui

Application Next.js de test locale pour le package Supa UI. Elle utilise directement le package parent via `file:..`, pas la version publiée sur npm.

## Démarrage

Depuis ce dossier :

```bash
npm install
npm run dev
```

Le script `predev` installe les dépendances de développement du package parent puis compile Supa UI avant de lancer Next.js.

Pour vérifier la compilation de l'application :

```bash
npm run build
```

Les styles Tailwind du package sont générés par l'application à partir de `../../src` et du thème `supa-ui/theme.css`. N'importe pas `supa-ui/styles.css` en plus dans ce mode.
