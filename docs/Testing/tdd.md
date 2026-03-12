---
sidebar_position: 5
---

# TDD: Test Driven Development

TDD es una metodología de desarrollo donde los **tests se escriben antes que el código**. No es solo una técnica de testing — es una técnica de diseño que produce código más modular, testeable y con interfaces más claras.

## El Ciclo Red-Green-Refactor

```
    ┌─────────────────────────────────────────┐
    │                                         │
    │   🔴 RED      →   🟢 GREEN   →  🔵 REFACTOR  │
    │                                         │
    │  Escribir un   Escribir el   Mejorar el  │
    │  test que      mínimo código  código sin  │
    │  falle         para pasar     romper tests│
    │                el test                  │
    └─────────────────────────────────────────┘
```

1. **🔴 Red**: Escribe un test que describe el comportamiento deseado. Debe fallar porque el código aún no existe.
2. **🟢 Green**: Escribe el mínimo código posible para que el test pase. No te preocupes por la elegancia todavía.
3. **🔵 Refactor**: Mejora el código (nombres, estructura, eliminación de duplicación) sin cambiar su comportamiento. Los tests garantizan que no rompiste nada.

## Las 3 Leyes de TDD (Uncle Bob)

1. **No escribirás código productivo** sin que primero exista un test que falle
2. **No escribirás más de un test** del que sea suficiente para fallar (incluso un error de compilación cuenta como fallo)
3. **No escribirás más código productivo** del necesario para hacer pasar el test que falla actualmente

## Kata práctica: String Calculator

Una kata es un ejercicio de práctica. La String Calculator es perfecta para aprender TDD:

**Requerimiento**: Crear una función `add(numbers: string): number` que:
- Retorna `0` con string vacío
- Retorna el número con un solo número
- Suma números separados por coma
- Suma números separados por nueva línea (`\n`)
- Soporta delimitadores personalizados: `//;\n1;2` → `3`

### Iteración 1: String vacío

```typescript
// 🔴 RED: escribir el test
it("retorna 0 para string vacío", () => {
  expect(add("")).toBe(0);
});
// ❌ Falla: add no existe

// 🟢 GREEN: mínimo código para pasar
function add(numbers: string): number {
  return 0;
}
// ✅ Pasa

// 🔵 REFACTOR: no hay nada que mejorar todavía
```

### Iteración 2: Un número

```typescript
// 🔴 RED
it("retorna el número para un solo elemento", () => {
  expect(add("1")).toBe(1);
  expect(add("5")).toBe(5);
});
// ❌ Falla: siempre retorna 0

// 🟢 GREEN
function add(numbers: string): number {
  if (numbers === "") return 0;
  return parseInt(numbers);
}
// ✅ Pasa

// 🔵 REFACTOR: nada aún
```

### Iteración 3: Dos números separados por coma

```typescript
// 🔴 RED
it("suma dos números separados por coma", () => {
  expect(add("1,2")).toBe(3);
  expect(add("3,7")).toBe(10);
});
// ❌ Falla: parseInt("1,2") → NaN

// 🟢 GREEN
function add(numbers: string): number {
  if (numbers === "") return 0;
  return numbers.split(",").reduce((sum, n) => sum + parseInt(n), 0);
}
// ✅ Pasa

// 🔵 REFACTOR: también funciona con 1 número (split retorna array con 1 elemento)
// El test de "un número" sigue pasando ✅
```

### Iteración 4: Nueva línea como delimitador

```typescript
// 🔴 RED
it("permite nueva línea como delimitador", () => {
  expect(add("1\n2,3")).toBe(6);
});
// ❌ Falla: parseInt("\n2") → NaN

// 🟢 GREEN
function add(numbers: string): number {
  if (numbers === "") return 0;
  return numbers
    .split(/[,\n]/)
    .reduce((sum, n) => sum + parseInt(n), 0);
}
// ✅ Pasa
```

### Iteración 5: Delimitador personalizado

```typescript
// 🔴 RED
it("soporta delimitador personalizado //;\n1;2", () => {
  expect(add("//;\n1;2")).toBe(3);
  expect(add("//|\n1|2|3")).toBe(6);
});
// ❌ Falla: no reconoce la sintaxis //

// 🟢 GREEN
function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /[,\n]/;
  let numbersSection = numbers;

  if (numbers.startsWith("//")) {
    const [header, ...rest] = numbers.split("\n");
    delimiter = new RegExp(header.slice(2));
    numbersSection = rest.join("\n");
  }

  return numbersSection
    .split(delimiter)
    .reduce((sum, n) => sum + parseInt(n), 0);
}
// ✅ Todos los tests pasan

// 🔵 REFACTOR: extraer la lógica de parseo del delimitador
function parseDelimiter(header: string): RegExp {
  return new RegExp(header.slice(2).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
}

function add(numbers: string): number {
  if (numbers === "") return 0;

  let delimiter = /[,\n]/;
  let numbersSection = numbers;

  if (numbers.startsWith("//")) {
    const newlineIndex = numbers.indexOf("\n");
    delimiter = parseDelimiter(numbers.slice(0, newlineIndex));
    numbersSection = numbers.slice(newlineIndex + 1);
  }

  return numbersSection
    .split(delimiter)
    .reduce((sum, n) => sum + parseInt(n, 10), 0);
}
// ✅ Todos los tests siguen pasando después del refactor
```

## Cuándo NO usar TDD

| Situación | Por qué no usar TDD |
|---|---|
| Exploración / prototipado | No sabes qué quieres construir todavía — TDD requiere especificación |
| UI altamente visual | El comportamiento visual es difícil de especificar en un test |
| Configuración de infraestructura | Archivos de config, Dockerfiles, CI/CD |
| Tests E2E | Los E2E verifican flujos completos, no son TDD unitario |
| Spike técnico | Código desechable para aprender una tecnología |

## BDD: Behavioral Driven Development

BDD es una extensión de TDD que usa lenguaje natural para describir el comportamiento:

```typescript
// TDD: describe términos técnicos
it("returns 0 when input is empty string", () => {});

// BDD: describe comportamiento del negocio
describe("String Calculator", () => {
  describe("dado un string vacío", () => {
    it("debería retornar 0", () => {
      expect(add("")).toBe(0);
    });
  });

  describe("dado un string con un número", () => {
    it("debería retornar ese número", () => {
      expect(add("5")).toBe(5);
    });
  });
});
```

El patrón **Given/When/Then** es el corazón de BDD:

```typescript
describe("Sistema de login", () => {
  it("debería redirigir al dashboard después de un login exitoso", async () => {
    // GIVEN: el usuario está en la página de login
    render(<LoginPage />);

    // WHEN: el usuario ingresa credenciales válidas y envía el formulario
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Login" }));

    // THEN: el usuario es redirigido al dashboard
    await expect(mockRouter.push).toHaveBeenCalledWith("/dashboard");
  });
});
```
