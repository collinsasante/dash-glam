# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript + Vite application. The project uses a minimal setup with HMR (Hot Module Replacement) and ESLint configured for React development.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Run ESLint on all files
npm run lint

# Preview production build locally
npm run preview
```

## Technology Stack

- **Build Tool**: Vite 7.2.4
- **Framework**: React 19.2.0 with TypeScript 5.9.3
- **Linting**: ESLint 9.39.1 with TypeScript ESLint and React-specific plugins
- **JSX Transform**: react-jsx (automatic runtime)

## TypeScript Configuration

The project uses TypeScript project references with two separate configs:
- `tsconfig.app.json`: Application source code (src/)
- `tsconfig.node.json`: Build tooling configuration

Key compiler options:
- Target: ES2022
- Module resolution: bundler mode
- Strict mode enabled with additional safety checks (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`)
- `verbatimModuleSyntax` and `erasableSyntaxOnly` enabled

## Project Structure

```
apps/
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── assets/              # Static assets (CSS bundles, JS bundles, media)
│       ├── css/             # Bundled stylesheets
│       ├── js/              # Bundled scripts (widgets, custom components)
│       ├── media/           # Images (avatars, flags, logos, SVGs, etc.)
│       └── plugins/         # Third-party plugin bundles (datatables, vis-timeline, etc.)
├── public/                  # Public static assets
├── index.html              # HTML entry point
└── vite.config.ts          # Vite configuration
```

## Architecture Notes

### Assets Organization - CRITICAL

**IMPORTANT**: This project MUST use the existing `src/assets/` directory strictly as provided. Do not add, remove, or modify the assets structure.

The `src/assets/` directory contains pre-bundled resources that must be used for this project:
- **CSS bundles**: `style.bundle.css`, `plugins.bundle.css`, and plugin-specific stylesheets (datatables, vis-timeline)
- **JS bundles**: `scripts.bundle.js`, `widgets.bundle.js`, and custom components
- **Media**: Pre-organized assets (avatars, flags, logos, illustrations, SVGs, stock images)
- **Plugins**: Third-party plugin bundles (global plugins, datatables, vis-timeline)

**Rules**:
- Use ONLY the CSS and JS bundles from `src/assets/` - do not install or use alternatives
- Reference media assets from the existing `media/` subdirectories
- Do not add new CSS frameworks, UI libraries, or styling solutions
- Do not reorganize or restructure the assets folder
- Import the required bundles in your components as needed

### ESLint Configuration

Uses flat config format (`eslint.config.js`) with:
- JavaScript recommended rules
- TypeScript ESLint recommended rules
- React Hooks recommended rules
- React Refresh rules for Vite

The configuration ignores the `dist/` directory and targets all `.ts` and `.tsx` files.

### Vite Plugin

Uses `@vitejs/plugin-react` which provides Babel-based Fast Refresh. The README mentions `@vitejs/plugin-react-swc` as an alternative using SWC for potentially faster refresh.

## Development Notes

- The React Compiler is intentionally not enabled due to performance impact
- For production applications, consider upgrading to type-aware ESLint rules (see README.md for examples)
- The project uses React 19 with StrictMode enabled in the entry point
- **DO NOT install additional UI libraries** (Material-UI, Ant Design, Bootstrap, Tailwind, etc.) - use the provided assets only
