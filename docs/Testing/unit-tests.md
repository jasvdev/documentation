---
sidebar_position: 2
---

# Unit Testing con Vitest

## Estructura de un test

```typescript
// Organización con describe / it
describe("Calculator", () => {
  // beforeEach: se ejecuta antes de cada test en este bloque
  beforeEach(() => {
    // Resetear estado, limpiar mocks, etc.
  });

  // afterEach: se ejecuta después de cada test
  afterEach(() => {
    vi.clearAllMocks(); // Limpiar todos los mocks después de cada test
  });

  describe("sum()", () => {
    it("suma dos números positivos", () => {
      expect(sum(2, 3)).toBe(5);
    });

    it("suma números negativos", () => {
      expect(sum(-1, -2)).toBe(-3);
    });

    it("retorna 0 al sumar cero con cero", () => {
      expect(sum(0, 0)).toBe(0);
    });
  });
});
```

| Hook | Cuándo usar |
|---|---|
| `beforeAll` | Setup costoso que se hace una sola vez (ej: iniciar servidor de test) |
| `afterAll` | Teardown de setup costoso (ej: cerrar servidor) |
| `beforeEach` | Resetear estado antes de cada test (lo más común) |
| `afterEach` | Limpiar mocks, efectos secundarios después de cada test |

## Assertions con `expect`

### Matchers de igualdad

```typescript
// toBe: igualdad estricta (===) — para primitivos
expect(2 + 2).toBe(4);
expect("hola").toBe("hola");

// toEqual: igualdad profunda — para objetos y arrays
expect({ a: 1 }).toEqual({ a: 1 }); // ✅ (toBe fallaría: referencias distintas)

// toStrictEqual: como toEqual pero verifica también undefined y constructores
expect([1, undefined]).toStrictEqual([1, undefined]); // ✅
expect([1, undefined]).toEqual([1]);                  // ✅ (toEqual ignora undefined)
```

### Matchers de veracidad

```typescript
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect("hola").toBeDefined();
expect(1).toBeTruthy();
expect(0).toBeFalsy();
expect(true).toBe(true);
```

### Matchers de strings, arrays y objetos

```typescript
expect("Hello World").toContain("World");
expect("Hello World").toMatch(/^Hello/);
expect([1, 2, 3]).toContain(2);
expect([1, 2, 3]).toHaveLength(3);
expect({ name: "Juan", age: 30 }).toMatchObject({ name: "Juan" }); // subconjunto
```

### Matchers de errores

```typescript
// toThrow: verifica que una función lanza un error
expect(() => divide(1, 0)).toThrow();
expect(() => divide(1, 0)).toThrow("División por cero");
expect(() => divide(1, 0)).toThrow(Error);

// Para funciones async
await expect(asyncFunction()).rejects.toThrow("Error message");
await expect(asyncFunction()).resolves.toEqual({ data: "ok" });
```

### Matchers de mocks

```typescript
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
expect(mockFn).toHaveBeenLastCalledWith("last arg");
expect(mockFn).toHaveReturnedWith("valor");
```

## Mocking con Vitest

### `vi.fn()` — Mock de función

```typescript
const mockCallback = vi.fn();

// Configurar el valor de retorno
mockCallback.mockReturnValue(42);
mockCallback.mockReturnValueOnce(1).mockReturnValueOnce(2); // Secuencia

// Configurar implementación
mockCallback.mockImplementation((x: number) => x * 2);

// Verificar uso
mockCallback("test");
expect(mockCallback).toHaveBeenCalledWith("test");
```

### `vi.mock()` — Mock de módulo completo

```typescript
// Mockear un módulo externo
vi.mock("../services/userService", () => ({
  getUserById: vi.fn().mockResolvedValue({ id: 1, name: "Juan" }),
  createUser: vi.fn().mockResolvedValue({ id: 2, name: "María" }),
}));

// En el test, el módulo mockeado es el que se usa
import { getUserById } from "../services/userService";

it("obtiene el usuario correctamente", async () => {
  const user = await getUserById(1);
  expect(user.name).toBe("Juan");
  expect(getUserById).toHaveBeenCalledWith(1);
});
```

### `vi.spyOn()` — Espiar métodos existentes

```typescript
const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

// Ejecutar código que llama console.error
renderSomething();

expect(consoleSpy).toHaveBeenCalledWith("Error message");
consoleSpy.mockRestore(); // Restaurar la implementación original
```

:::warning Mockear en la frontera del sistema
Mockea solo dependencias externas (APIs, filesystem, timers, módulos de terceros). No mockees el código que estás probando ni sus dependencias directas — eso hace que el test sea menos confiable.
:::

## Tests parametrizados con `it.each`

```typescript
// Tabla de casos: [input, expected]
it.each([
  [1, 1],
  [2, 4],
  [3, 9],
  [4, 16],
  [0, 0],
  [-2, 4],
])("square(%i) = %i", (input, expected) => {
  expect(square(input)).toBe(expected);
});

// Con objetos nombrados
it.each([
  { a: 1, b: 2, expected: 3 },
  { a: -1, b: 1, expected: 0 },
  { a: 0, b: 0, expected: 0 },
])("sum($a, $b) = $expected", ({ a, b, expected }) => {
  expect(sum(a, b)).toBe(expected);
});
```

## Coverage

```bash
pnpm test:coverage
```

```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
 utils/calculator.ts|   100   |   100    |   100   |   100   |
 services/auth.ts   |    75   |    60    |    80   |    75   |
--------------------|---------|----------|---------|---------|
```

| Métrica | Qué mide |
|---|---|
| **Statements** | Líneas ejecutadas |
| **Branches** | Ramas de if/switch/ternario cubiertas |
| **Functions** | Funciones llamadas al menos una vez |
| **Lines** | Líneas de código (similar a statements) |

:::note Calidad > Cantidad en coverage
Un 80% de coverage con tests bien escritos es mejor que un 100% con tests triviales. El objetivo es cubrir los **caminos críticos y casos borde**, no alcanzar un número.
:::
