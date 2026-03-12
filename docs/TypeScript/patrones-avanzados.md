---
sidebar_position: 3
---

# Patrones Avanzados

## Type Guards y Narrowing

TypeScript reduce (narrows) el tipo de una variable según las condiciones del código:

```typescript
function processInput(input: string | number | null) {
  // typeof guard
  if (typeof input === "string") {
    console.log(input.toUpperCase()); // input: string
  } else if (typeof input === "number") {
    console.log(input.toFixed(2));    // input: number
  } else {
    console.log("Es null");           // input: null
  }
}

// instanceof guard
function formatDate(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString(); // value: Date
  }
  return value;                 // value: string
}

// in guard: verificar si una propiedad existe en un objeto
type Cat = { meow(): void };
type Dog = { bark(): void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow(); // animal: Cat
  } else {
    animal.bark(); // animal: Dog
  }
}
```

### Custom Type Guards

```typescript
interface User { id: number; name: string; }
interface Admin extends User { role: "admin" }

// Predicate function: retorna `valor is Tipo`
function isAdmin(user: User | Admin): user is Admin {
  return "role" in user && user.role === "admin";
}

function greet(user: User | Admin) {
  if (isAdmin(user)) {
    console.log(`Bienvenido Admin: ${user.role}`); // user: Admin
  } else {
    console.log(`Hola: ${user.name}`);              // user: User
  }
}
```

### Exhaustive Check con `never`

```typescript
type Shape = "circle" | "square" | "triangle";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle":   return Math.PI * 4;
    case "square":   return 16;
    case "triangle": return 6;
    default:
      // Si olvidamos un case, TypeScript lanza error aquí
      const _exhaustive: never = shape;
      throw new Error(`Shape no manejada: ${_exhaustive}`);
  }
}
```

## Conditional Types

```typescript
// Sintaxis: T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Caso de uso real: unwrap de Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;
type ResolvedUser = Awaited<Promise<User>>; // User
type DirectUser = Awaited<User>;            // User

// infer: extraer un tipo desconocido dentro de una estructura
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type ElementType<T> = T extends Array<infer E> ? E : never;

type Fn = () => string;
type R = ReturnType<Fn>;    // string

type Arr = string[];
type E = ElementType<Arr>;  // string
```

## Mapped Types

```typescript
// Sintaxis básica: recorrer todas las claves de un tipo
type Optional<T> = {
  [K in keyof T]?: T[K];
};
// Equivalente a Partial<T>

// Modificadores + (agregar) y - (quitar)
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // Quita readonly de todos los campos
};

type AllRequired<T> = {
  [K in keyof T]-?: T[K]; // Quita el opcional de todos los campos
};

// Remapear claves con as
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// DeepPartial: caso de uso real
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

## Declaration Merging y Module Augmentation

Útil para extender tipos de librerías de terceros:

```typescript
// Extender la interfaz global Window
declare global {
  interface Window {
    analytics: { track(event: string): void };
  }
}

// Ahora window.analytics está tipado
window.analytics.track("page_view");

// Extender tipos de Express
declare module "express" {
  interface Request {
    user?: { id: string; role: string };
  }
}

// En tu middleware, req.user está tipado
app.use((req, res, next) => {
  req.user = { id: "123", role: "admin" }; // ✅
  next();
});
```

## El operador `satisfies`

Introducido en TypeScript 4.9. Permite validar que un valor cumple un tipo sin perder la inferencia del tipo literal:

```typescript
type Colors = "red" | "green" | "blue";
type ColorMap = Record<Colors, string | number[]>;

// Con anotación de tipo: perdemos los tipos literales
const palette: ColorMap = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
};
palette.red; // string | number[] — perdimos la info de que es number[]

// Con satisfies: mantenemos los tipos literales
const palette2 = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies ColorMap;

palette2.red;   // number[] — TypeScript mantiene el tipo exacto
palette2.green; // string   — TypeScript mantiene el tipo exacto
```

| Operador | Valida tipo | Mantiene tipo literal | Uso principal |
|---|---|---|---|
| `: Type` | ✅ | ❌ (amplia al tipo) | Variables con tipo explícito |
| `as Type` | ❌ (fuerza) | ❌ | Type casting (evitar) |
| `satisfies Type` | ✅ | ✅ | Validar + mantener literales |
