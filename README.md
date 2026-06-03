# Goma Matu (goma-web-vite)

Aplicación web para visualizar el inventario (stock) en formato de tarjetas, optimizada para móvil.

## Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS** (estilo inspirado en Material Design 3)
- **ESLint + Prettier** (incluye `prettier-plugin-tailwindcss`)

## Requisitos

- **Node.js** (recomendado LTS)
- **npm**

## Instalación

```bash
npm install
```

## Scripts

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint

# Lint con fix
npm run lint:fix
```

## API / Backend

La app obtiene los datos de inventario desde un backend remoto.

- **Endpoint actual**: `https://api-rubber-hono.onrender.com/stock`

### Variables de entorno

La URL de la API se configura mediante variables de entorno:

| Entorno | Archivo | Valor |
|---------|---------|-------|
| Desarrollo | `.env` | `/api/stock` (usa proxy de Vite) |
| Producción | `.env.production` | `https://api-rubber-hono.onrender.com/stock` |

Para personalizar localmente, crea un archivo `.env.local` (se ignora en git) copiando de `.env.example`.

### Proxy en desarrollo

En `vite.config.ts` existe un proxy que redirige llamadas de `/api` al backend:

```
GET /api/stock  →  https://api-rubber-hono.onrender.com/stock
```

Esto evita problemas de CORS durante el desarrollo. Asegúrate de usar `npm run dev` y acceder a `http://localhost:5173/`.

## Estructura del proyecto

```text
src/
  components/        Componentes UI (cards, lista, error)
  hooks/             Hooks (useInventory)
  services/          Acceso a API (inventoryService)
  types/             Tipos TypeScript
  App.tsx            Layout principal
  main.tsx           Entry point
  index.css          Tailwind + estilos base
```

## Notas de UI

- La UI usa tokens de color definidos en `tailwind.config.js` (paleta estilo Material Design 3).
- Tipografía:
  - UI general: **Roboto**
  - Número de cantidad en tarjetas: **Manrope** (clase Tailwind: `font-quantity`)
