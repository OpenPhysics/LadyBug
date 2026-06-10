# Lady Bug

A [SceneryStack](https://scenerystack.org/) port of the PhET *Ladybug Motion 2D* simulation. Explore 2D
motion, position, velocity, and acceleration using a ladybug on a rotating platform.

## Features

- Single-screen simulation with default and projector color profiles
- English and French localization
- Progressive Web App (installable, offline-capable) via `vite-plugin-pwa`
- GitHub Actions CI and GitHub Pages deployment

## Quick Start

```bash
npm install
npm run icons    # generate PWA icons + favicon from public/icons/icon.svg
npm start        # dev server → http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm start` / `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | TypeScript type check (`src` + `scripts`) |
| `npm run lint` | Biome lint check |
| `npm run format` | Auto-format all files |
| `npm run fix` | Lint + auto-fix |
| `npm run icons` | Regenerate icons from `public/icons/icon.svg` |
| `npm run clean` | Remove `dist/` |

## Project structure

```
src/
├── main.ts            Entry point (launches the Sim)
├── brand.ts           SceneryStack bootstrap chain: init -> assert -> splash -> brand
├── splash.ts
├── assert.ts
├── init.ts
├── LadyBugNamespace.ts
├── LadyBugColors.ts   Color profiles (default / projector)
├── i18n/              StringManager + per-locale JSON (en / fr)
└── lady-bug/          The Lady Bug screen
    ├── LadyBugScreen.ts
    ├── model/LadyBugModel.ts
    └── view/LadyBugScreenView.ts
```

## Deployment

Pushing to `main` builds the app and deploys it to GitHub Pages (see `.github/workflows/deploy.yml`).
Enable Pages with the "GitHub Actions" source in the repository settings.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [SceneryStack](https://scenerystack.org/) | ^3.0.0 | Simulation framework |
| [Vite](https://vitejs.dev/) | ^8 | Build tool + dev server |
| [TypeScript](https://www.typescriptlang.org/) | ^6 | Type-safe JavaScript |
| [Biome](https://biomejs.dev/) | ^2.4 | Linting + formatting |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | ^1 | PWA + service worker |

## License

MIT. The original PhET simulation is Copyright © University of Colorado; this is an independent reimplementation.

## Contributing

See [OpenPhysics contributing guidelines](https://github.com/OpenPhysics/.github/blob/main/CONTRIBUTING.md).
Report bugs via GitHub Issues; use org issue templates.
