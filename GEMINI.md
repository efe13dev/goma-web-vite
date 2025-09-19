# GEMINI.md - Project Context

This document provides context for the "Goma Matu" inventory web application.

## Project Overview

This is a modern web application built to display and manage inventory data. The frontend is built with **React** and **TypeScript**, utilizing **Vite** for a fast development experience and build process. The user interface is styled with **Tailwind CSS**, and icons are provided by the **Lucide React** library.

The application fetches inventory data from a remote API, displays it in a list format, and provides functionality to refresh the data. The core logic for state management and data fetching is encapsulated in the `useInventory` custom hook.

### Key Technologies

*   **Framework/Library:** React 18
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Linting:** ESLint
*   **API Endpoint:** `https://api-rubber-hono.onrender.com/stock`

## Building and Running

The project uses `npm` as the package manager. The following scripts are defined in `package.json`:

*   **`npm run dev`**: Starts the Vite development server. The application will be available at `http://localhost:5173` by default. The `vite.config.ts` file configures a proxy to redirect API requests from `/api` to the production backend to avoid CORS issues.
*   **`npm run build`**: Compiles and bundles the application for production into the `dist/` directory.
*   **`npm run lint`**: Runs ESLint to check for code quality and style issues across the project.
*   **`npm run preview`**: Serves the production build from the `dist/` directory locally to preview the final application.

## Development Conventions

*   **Component-Based Architecture:** The UI is built using a component-based approach, with components located in `src/components/`.
*   **Functional Components & Hooks:** The project exclusively uses functional components with React Hooks for state management and side effects.
*   **Custom Hooks:** Application logic is abstracted into custom hooks, such as `useInventory` in `src/hooks/`, to promote reusability and separation of concerns.
*   **Styling:** Utility-first CSS is implemented via Tailwind CSS. Configuration is in `tailwind.config.js`.
*   **Type Safety:** TypeScript is used throughout the project. Type definitions, like those for inventory items, are located in `src/types/`.
*   **Services:** API interactions are isolated within service files, like `src/services/inventoryService.ts`, to keep data fetching logic separate from UI components.
