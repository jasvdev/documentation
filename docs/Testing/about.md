---
sidebar_position: 1
---

# Acerca de Testing

El testing es la práctica de verificar que el software funciona como se espera. No es solo "encontrar bugs" — es una herramienta de diseño y documentación viva del comportamiento del sistema.

## La Pirámide de Testing

```
         /\
        /E2E\         ← Lentos, costosos, pocos (10%)
       /------\
      / Integr.\      ← Velocidad media (20%)
     /----------\
    /  Unit Tests \   ← Rápidos, baratos, muchos (70%)
   /--------------\
```

| Tipo | Velocidad | Costo | Confianza | Cuándo usarlo |
|---|---|---|---|---|
| **Unit** | Muy rápido (ms) | Bajo | Media | Lógica de negocio, utilidades, funciones puras |
| **Integration** | Medio (ms-s) | Medio | Alta | Flujos de datos, componentes con dependencias |
| **E2E** | Lento (s-min) | Alto | Muy alta | Flujos críticos del negocio (login, checkout) |

:::tip Enfócate en integration tests
Aunque la pirámide tradicional pone más énfasis en unit tests, muchos expertos modernos (incluyendo Kent C. Dodds, autor de Testing Library) sugieren que los **integration tests** dan el mejor balance entre confianza y velocidad de ejecución.
:::

## Glosario

| Término | Definición |
|---|---|
| **SUT** | System Under Test — el código que estás probando |
| **Mock** | Reemplaza una dependencia con una implementación falsa que puedes controlar y verificar |
| **Stub** | Reemplaza una dependencia con valores predefinidos (no verifica llamadas) |
| **Spy** | Observa las llamadas a una función real sin reemplazarla |
| **Fake** | Implementación simplificada pero funcional (ej: base de datos en memoria) |
| **Fixture** | Datos de prueba predefinidos y reutilizables |

## El Patrón AAA

Todos los tests deben seguir la estructura **Arrange → Act → Assert**:

```typescript
it("suma dos números correctamente", () => {
  // Arrange: preparar el estado inicial y dependencias
  const calculator = new Calculator();
  const a = 5;
  const b = 3;

  // Act: ejecutar la acción que se está probando
  const result = calculator.sum(a, b);

  // Assert: verificar el resultado esperado
  expect(result).toBe(8);
});
```

## Ecosistema JavaScript/TypeScript

| Herramienta | Tipo | Uso principal | Velocidad |
|---|---|---|---|
| **Vitest** | Unit/Integration | Proyectos Vite, moderno | ⚡ Muy rápido |
| **Jest** | Unit/Integration | Proyectos legacy, CRA | 🐢 Más lento |
| **Testing Library** | Integration | Componentes React/Vue/Angular | — (complemento) |
| **Playwright** | E2E | Multi-browser, CI/CD | 🔄 Paralelo |
| **Cypress** | E2E | DX, visual testing | 🐢 Single-thread |
| **MSW** | Mock | Simular APIs sin servidor | ⚡ En memoria |

:::tip Recomendación 2025
Para proyectos nuevos con Vite: **Vitest** + **Testing Library** + **Playwright**. Vitest es compatible con la API de Jest, por lo que la migración desde Jest es mínima.
:::

## Setup de Vitest

```bash
pnpm add -D vitest @vitest/ui jsdom
```

```typescript title="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",        // Simular el DOM del navegador
    globals: true,               // describe, it, expect disponibles sin import
    setupFiles: "./src/test/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: ["node_modules", "src/test"],
    },
  },
});
```

```typescript title="src/test/setup.ts"
import "@testing-library/jest-dom"; // Matchers adicionales: toBeInTheDocument, etc.
```

```json title="package.json (scripts)"
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```
