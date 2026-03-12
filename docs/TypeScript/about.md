---
sidebar_position: 1
---

# Acerca de TypeScript

TypeScript es un superset tipado de JavaScript desarrollado y mantenido por **Microsoft**. Agrega tipado estático opcional al lenguaje, lo que permite detectar errores en tiempo de desarrollo antes de que lleguen a producción. [Sitio oficial]

## JavaScript vs TypeScript

| Característica | JavaScript | TypeScript |
|---|---|---|
| Tipado | Dinámico (runtime) | Estático (compile-time) |
| Detección de errores | En ejecución | En desarrollo |
| Autocompletado | Limitado | Completo (IntelliSense) |
| Refactorización | Manual y riesgosa | Segura y automatizada |
| Compilación | No necesaria | `tsc` → `.js` |
| Curva de aprendizaje | Baja | Media |
| Compatibilidad | Cualquier entorno JS | Requiere compilación |

## Ciclo de compilación

```
archivo.ts  →  tsc (TypeScript Compiler)  →  archivo.js
```

TypeScript **nunca llega al navegador o Node.js** directamente. Siempre se compila a JavaScript. El tipo de JS generado depende de la opción `target` en `tsconfig.json`.

:::tip Vite y bundlers modernos
En proyectos con Vite, el bundler maneja la transpilación de TypeScript automáticamente. El `tsc` se usa principalmente para la verificación de tipos (`tsc --noEmit`), no para compilar.
:::

## Instalación

```bash
# Instalar TypeScript como dependencia de desarrollo
pnpm add -D typescript

# Inicializar tsconfig.json
npx tsc --init

# Verificar tipos sin compilar
npx tsc --noEmit
```

## tsconfig.json — Opciones esenciales

```json title="tsconfig.json"
{
  "compilerOptions": {
    // Target de compilación
    "target": "ES2020",              // Versión de JS de salida
    "module": "ESNext",              // Sistema de módulos
    "moduleResolution": "bundler",   // Cómo resolver imports (bundler para Vite)
    "lib": ["ES2020", "DOM"],        // APIs disponibles

    // Tipado estricto (SIEMPRE activar)
    "strict": true,                  // Activa todos los checks estrictos
    "noUncheckedIndexedAccess": true,// Array[i] puede ser undefined

    // Path aliases
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },

    // Output
    "outDir": "./dist",
    "noEmit": true,                  // Solo verificar tipos, no compilar (con Vite)

    // Interoperabilidad
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,

    // Calidad de código
    "noUnusedLocals": true,          // Error si hay variables no usadas
    "noUnusedParameters": true,      // Error si hay parámetros no usados
    "noImplicitReturns": true        // Todas las rutas deben retornar
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

:::warning `strict: true` es obligatorio
Sin `strict: true` TypeScript pierde gran parte de su valor. Esta opción activa: `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitThis` y `alwaysStrict`.
:::

## Tipos primitivos

| Tipo | Descripción | Ejemplo |
|---|---|---|
| `string` | Cadena de texto | `"hola"`, `` `template` `` |
| `number` | Entero o decimal | `42`, `3.14` |
| `boolean` | Verdadero o falso | `true`, `false` |
| `null` | Ausencia intencional de valor | `null` |
| `undefined` | Variable declarada sin valor | `undefined` |
| `symbol` | Identificador único | `Symbol("id")` |
| `bigint` | Enteros grandes | `9007199254740991n` |

## `unknown` vs `any`

```typescript
// any: desactiva el tipado — EVITAR
let value: any = "hola";
value.metodoQueNoExiste(); // ✅ No hay error en TS (pero falla en runtime)

// unknown: tipado seguro — PREFERIR
let safeValue: unknown = "hola";
safeValue.toUpperCase(); // ❌ Error: Object is of type 'unknown'

// Para usar unknown, debemos verificar primero
if (typeof safeValue === "string") {
  safeValue.toUpperCase(); // ✅ OK — TypeScript sabe que es string
}
```

:::danger Nunca uses `any` en código de producción
`any` es una vía de escape del sistema de tipos. Si TypeScript no puede inferir un tipo, usa `unknown` y agrega una type guard. La única excepción válida es código de migración temporal.
:::

## `never` y `void`

```typescript
// void: función que no retorna ningún valor útil
function logMessage(msg: string): void {
  console.log(msg);
  // No retorna nada (o retorna undefined implícitamente)
}

// never: función que NUNCA retorna (lanza error o loop infinito)
function throwError(message: string): never {
  throw new Error(message);
}

// never en exhaustive checks (ver Patrones Avanzados)
type Shape = "circle" | "square";
function getArea(shape: Shape): number {
  switch (shape) {
    case "circle": return Math.PI;
    case "square": return 1;
    default:
      const exhaustiveCheck: never = shape; // Error si falta un case
      return exhaustiveCheck;
  }
}
```

<!-- link's -->

[Sitio oficial]: https://www.typescriptlang.org/
