---
sidebar_position: 2
---

# Tipos Básicos y Utilitarios

## `type` vs `interface`

Ambos definen la forma de un objeto, pero tienen diferencias importantes:

| Característica | `interface` | `type` |
|---|---|---|
| Extensión | `extends` | `&` (intersection) |
| Fusión de declaraciones | ✅ Sí (declaration merging) | ❌ No |
| Uniones (`\|`) | ❌ No directamente | ✅ Sí |
| Tipos primitivos | ❌ No | ✅ Sí (`type ID = string`) |
| Tipos computados | Limitado | ✅ Completo |
| Legibilidad en errores | Mejor | Variable |

```typescript
// interface: ideal para contratos de objetos y clases
interface User {
  id: number;
  name: string;
  email?: string; // opcional
}

// Extensión con interface
interface Admin extends User {
  role: "admin" | "superadmin";
}

// type: ideal para uniones, intersecciones y aliases
type Status = "active" | "inactive" | "pending";
type ID = string | number;

// Intersection con type (equivalente a extends)
type AdminUser = User & { role: string };
```

:::tip Regla práctica
Usa `interface` para definir la forma de objetos y clases. Usa `type` para uniones, intersecciones, aliases de primitivos y tipos complejos. En caso de duda, `interface` es el default recomendado por la guía de TypeScript.
:::

## Union Types e Intersection Types

```typescript
// Union Type: el valor puede ser uno de varios tipos
type StringOrNumber = string | number;
type Status = "loading" | "success" | "error";

function formatId(id: string | number): string {
  return `ID-${id}`;
}

// Intersection Type: el valor debe cumplir todos los tipos
type Serializable = { serialize(): string };
type Loggable = { log(): void };
type SerializableLoggable = Serializable & Loggable;
```

### Discriminated Unions

El patrón más poderoso de TypeScript para modelar estados:

```typescript
// Cada variante tiene un campo discriminador ('kind' o 'type')
type ApiResponse<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function renderResponse(response: ApiResponse<User>) {
  switch (response.status) {
    case "loading":
      return "Cargando...";
    case "success":
      return response.data.name; // TypeScript sabe que data existe
    case "error":
      return response.error;     // TypeScript sabe que error existe
  }
}
```

## Generics

Los genéricos permiten crear componentes reutilizables que funcionan con múltiples tipos:

```typescript
// Función genérica
function identity<T>(value: T): T {
  return value;
}

identity<string>("hola");  // T = string
identity(42);              // T = number (inferido)

// Genérico con restricción
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Juan", age: 30 };
getProperty(user, "name");   // ✅ string
getProperty(user, "email");  // ❌ Error: 'email' no es keyof typeof user

// Interfaz genérica
interface Repository<T> {
  findById(id: number): Promise<T>;
  save(entity: T): Promise<T>;
  delete(id: number): Promise<void>;
}

// Tipo genérico con múltiples parámetros
type Pair<A, B> = { first: A; second: B };
const pair: Pair<string, number> = { first: "edad", second: 30 };
```

## Utility Types

TypeScript incluye tipos de utilidad para transformar tipos existentes:

| Utility Type | Descripción | Ejemplo |
|---|---|---|
| `Partial<T>` | Todos los campos opcionales | `Partial<User>` |
| `Required<T>` | Todos los campos requeridos | `Required<Partial<User>>` |
| `Readonly<T>` | Todos los campos de solo lectura | `Readonly<User>` |
| `Pick<T, K>` | Solo los campos K de T | `Pick<User, "id" \| "name">` |
| `Omit<T, K>` | T sin los campos K | `Omit<User, "password">` |
| `Record<K, V>` | Objeto con claves K y valores V | `Record<string, number>` |
| `Exclude<T, U>` | T excluyendo los tipos de U | `Exclude<Status, "loading">` |
| `Extract<T, U>` | Solo los tipos comunes entre T y U | `Extract<Status, "success" \| "error">` |
| `NonNullable<T>` | T sin `null` ni `undefined` | `NonNullable<string \| null>` |
| `ReturnType<T>` | Tipo de retorno de una función | `ReturnType<typeof fetchUser>` |
| `Parameters<T>` | Tupla de parámetros de una función | `Parameters<typeof fetchUser>` |
| `Awaited<T>` | Resuelve el tipo de una Promise | `Awaited<Promise<User>>` |

```typescript
interface User {
  id: number;
  name: string;
  password: string;
  createdAt: Date;
}

// Partial: útil para actualizaciones parciales
type UpdateUserDto = Partial<User>;
// { id?: number; name?: string; password?: string; createdAt?: Date }

// Omit: exponer datos sin campos sensibles
type PublicUser = Omit<User, "password">;
// { id: number; name: string; createdAt: Date }

// Pick: seleccionar solo lo necesario
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Record: mapas tipados
type UserById = Record<number, User>;
const cache: UserById = { 1: { id: 1, name: "Juan", password: "...", createdAt: new Date() } };

// ReturnType: inferir el tipo de retorno
async function fetchUser(id: number): Promise<User> { /* ... */ return {} as User; }
type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>; // User
```

## Template Literal Types

```typescript
// Tipos basados en strings combinados
type EventName = "click" | "focus" | "blur";
type HandlerName = `on${Capitalize<EventName>}`; // "onClick" | "onFocus" | "onBlur"

// Útil para definir endpoints de API
type Method = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = "/users" | "/posts" | "/comments";
type ApiRoute = `${Method} ${Endpoint}`;
// "GET /users" | "GET /posts" | "POST /users" | ...

// Con interpolación de tipos
type CSSProperty = "margin" | "padding";
type CSSDirection = "top" | "right" | "bottom" | "left";
type CSSRule = `${CSSProperty}-${CSSDirection}`;
// "margin-top" | "margin-right" | "padding-top" | ...
```

## Enums vs `const` objects

:::warning Preferir `const` objects sobre `enum`
Los enums de TypeScript generan código JavaScript en tiempo de ejecución, pueden tener comportamientos sorpresivos, y tienen peor rendimiento en tree-shaking. Los `const` objects son la alternativa moderna recomendada.
:::

```typescript
// ❌ Enum: genera código JS, comportamiento extraño con numbers
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// ✅ const object: sin overhead de runtime
const Direction = {
  Up: "UP",
  Down: "DOWN",
  Left: "LEFT",
  Right: "RIGHT",
} as const;

// Inferir el tipo de los valores
type Direction = typeof Direction[keyof typeof Direction];
// "UP" | "DOWN" | "LEFT" | "RIGHT"

// Uso idéntico
function move(dir: Direction) { /* ... */ }
move(Direction.Up); // ✅
move("UP");         // ✅ (también funciona con el literal)
```
