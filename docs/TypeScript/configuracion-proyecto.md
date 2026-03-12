---
sidebar_position: 4
---

# Configuración en Proyectos Reales

## Path Aliases

Los path aliases evitan los imports relativos largos como `../../../components/Button`.

### 1. Configurar `tsconfig.json`

```json title="tsconfig.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"],
      "@types/*": ["./src/types/*"]
    }
  }
}
```

### 2. Configurar el bundler (Vite)

TypeScript define los aliases para el type-checker, pero el bundler también necesita conocerlos:

```typescript title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
```

:::warning Sincronizar siempre tsconfig + bundler
Si defines un alias en `tsconfig.json` pero no en `vite.config.ts` (o viceversa), obtendrás errores en runtime aunque TypeScript no muestre errores. Ambos deben estar sincronizados.
:::

```typescript
// ❌ Antes de aliases
import { Button } from "../../../components/ui/Button";
import { useAuth } from "../../hooks/useAuth";

// ✅ Con aliases
import { Button } from "@components/ui/Button";
import { useAuth } from "@hooks/useAuth";
```

## ESLint con TypeScript

```bash
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

```javascript title="eslint.config.js"
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "@typescript-eslint": tseslint },
    languageOptions: { parser: tsParser },
    rules: {
      // Reglas recomendadas
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off", // Demasiado verbose
      "@typescript-eslint/consistent-type-imports": "error",     // Importar tipos con 'import type'

      // Reglas a desactivar (demasiado estrictas)
      "@typescript-eslint/no-non-null-assertion": "warn",  // A veces necesario
    },
  },
];
```

### `import type` — Imports de solo tipos

```typescript
// ❌ Import regular de un tipo (incluye el módulo en el bundle)
import { User } from "./types";

// ✅ Import de tipo (eliminado en compilación, sin overhead)
import type { User } from "./types";

// Con la regla consistent-type-imports activada, ESLint lo fuerza automáticamente
```

## Tipos para dependencias externas

La mayoría de librerías populares incluyen sus propios tipos. Para las que no:

```bash
# Instalar tipos de @types/* (DefinitelyTyped)
pnpm add -D @types/lodash @types/node @types/uuid

# Verificar si una librería tiene tipos propios o necesita @types
# Si la instalación de @types/libreria falla → la librería ya tiene tipos
```

### Escribir tu propio `.d.ts`

```typescript title="src/types/globals.d.ts"
// Declarar módulo sin tipos para que TypeScript lo acepte
declare module "libreria-sin-tipos" {
  export function metodo(arg: string): void;
  export const valor: number;
}

// Declarar variables globales de scripts externos (ej: Google Analytics)
declare const gtag: (command: string, ...args: unknown[]) => void;

// Declarar archivos importados como módulos
declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "*.png" {
  const url: string;
  export default url;
}
```

## Migración gradual de JS a TS

TypeScript permite una migración incremental sin reescribir todo de golpe:

### Paso 1: Habilitar TypeScript en un proyecto JS

```json title="tsconfig.json"
{
  "compilerOptions": {
    "allowJs": true,        // Permite archivos .js junto con .ts
    "checkJs": false,       // No verificar tipos en archivos .js (aún)
    "strict": false,        // Empezar sin strict (ir activando gradualmente)
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### Paso 2: Activar verificación en JS gradualmente

```typescript
// En archivos JS específicos, agregar en la primera línea:
// @ts-check

// Esto activa la verificación de tipos en ese archivo sin renombrarlo
```

### Paso 3: Renombrar archivos `.js` → `.ts` uno por uno

```
Prioridad de migración:
1. Tipos y modelos de datos (más impacto, sin dependencias)
2. Utilidades y helpers (fáciles de tipar)
3. Servicios y API calls (alto valor)
4. Componentes UI (dejar para el final)
```

### Paso 4: Activar `strict` gradualmente

```json
// Activar una por una en lugar de todas juntas
{
  "compilerOptions": {
    "noImplicitAny": true,     // Primero
    "strictNullChecks": true,  // Segundo
    "strict": true             // Al final, cuando todo lo anterior pase
  }
}
```

## `strict` mode — Qué activa cada flag

| Flag | Qué hace | Impacto |
|---|---|---|
| `noImplicitAny` | Error si TS no puede inferir el tipo (infiere `any`) | Alto |
| `strictNullChecks` | `null` y `undefined` son tipos separados | Alto |
| `strictFunctionTypes` | Verifica covarianza/contravarianza en funciones | Medio |
| `strictBindCallApply` | Verifica tipos en `.bind()`, `.call()`, `.apply()` | Bajo |
| `strictPropertyInitialization` | Propiedades de clase deben iniciarse en el constructor | Medio |
| `noImplicitThis` | Error si `this` tiene tipo `any` implícito | Medio |
| `alwaysStrict` | Agrega `"use strict"` al output JS | Bajo |
| `useUnknownInCatchVariables` | Variables de `catch` son `unknown` en lugar de `any` | Medio |
