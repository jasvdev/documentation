---
sidebar_position: 3
---

# Testing de Componentes React

## Setup: Testing Library

Testing Library es la librería estándar para testear componentes React. Su filosofía central: **testear el comportamiento del usuario, no los detalles de implementación**.

```bash
pnpm add -D @testing-library/react @testing-library/user-event @testing-library/jest-dom
```

```typescript title="src/test/setup.ts"
import "@testing-library/jest-dom";
// Agrega matchers como: toBeInTheDocument, toBeVisible, toHaveValue, etc.
```

```typescript title="vite.config.ts"
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

## Queries — Cómo encontrar elementos

Testing Library provee queries que imitan cómo los usuarios y tecnologías de asistencia interactúan con la UI:

### Prioridad de queries (de mayor a menor)

| Query | Cuándo usar | Ejemplo |
|---|---|---|
| `getByRole` | Elemento con rol ARIA — **primera opción siempre** | `getByRole("button", { name: "Guardar" })` |
| `getByLabelText` | Input asociado a un label | `getByLabelText("Email")` |
| `getByPlaceholderText` | Input con placeholder (si no hay label) | `getByPlaceholderText("Buscar...")` |
| `getByText` | Elemento por su texto visible | `getByText("Bienvenido")` |
| `getByDisplayValue` | Input/Select con valor actual | `getByDisplayValue("Argentina")` |
| `getByAltText` | Imagen con alt text | `getByAltText("Logo de la empresa")` |
| `getByTitle` | Elemento con atributo title | `getByTitle("Cerrar modal")` |
| `getByTestId` | Último recurso — elemento con `data-testid` | `getByTestId("user-avatar")` |

### Variantes de queries

```typescript
// getBy: retorna el elemento, lanza error si no existe o hay más de uno
const button = screen.getByRole("button");

// queryBy: retorna null si no existe (para assertear ausencia)
const modal = screen.queryByRole("dialog");
expect(modal).not.toBeInTheDocument();

// findBy: async, espera hasta que el elemento aparezca
const user = await screen.findByText("Juan García");

// getAllBy / queryAllBy / findAllBy: retornan arrays
const items = screen.getAllByRole("listitem");
```

## Renderizar componentes

```typescript
import { render, screen } from "@testing-library/react";

// Render básico
render(<Button label="Guardar" onClick={() => {}} />);

// Con providers (envolver en Context)
function renderWithProviders(ui: ReactElement) {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

## Eventos con `userEvent`

`userEvent` simula interacciones reales del usuario (más cercano a la realidad que `fireEvent`):

```typescript
import userEvent from "@testing-library/user-event";

// Siempre configurar userEvent al inicio del test
const user = userEvent.setup();

// Click
await user.click(screen.getByRole("button", { name: "Guardar" }));

// Escribir en un input
await user.type(screen.getByLabelText("Email"), "juan@example.com");

// Limpiar y escribir
await user.clear(screen.getByLabelText("Email"));
await user.type(screen.getByLabelText("Email"), "nuevo@example.com");

// Seleccionar en un dropdown
await user.selectOptions(screen.getByRole("combobox"), "Argentina");

// Teclado
await user.keyboard("{Enter}");
await user.keyboard("{Tab}");
```

## Ejemplo completo: formulario de login

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("llama onSubmit con los datos correctos cuando el formulario es válido", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = vi.fn();

    render(<LoginForm onSubmit={mockOnSubmit} />);

    // Arrange: llenar el formulario
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "password123");

    // Act: enviar el formulario
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    // Assert: verificar que se llamó con los datos correctos
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("muestra errores de validación cuando los campos están vacíos", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(screen.getByText("Email es requerido")).toBeInTheDocument();
    expect(screen.getByText("Contraseña es requerida")).toBeInTheDocument();
  });

  it("deshabilita el botón mientras se está enviando", async () => {
    const user = userEvent.setup();
    // onSubmit que no resuelve inmediatamente
    const mockOnSubmit = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<LoginForm onSubmit={mockOnSubmit} />);
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Contraseña"), "password123");
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

## Testing de Custom Hooks con `renderHook`

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  it("inicia en 0 por defecto", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("incrementa el contador", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it("acepta un valor inicial", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

## Testing de componentes asíncronos

```typescript
// Componente que hace fetch al montar
function UserProfile({ userId }: { userId: number }) {
  const { data, isLoading } = useFetch<User>(`/api/users/${userId}`);
  if (isLoading) return <p>Cargando...</p>;
  return <p>{data?.name}</p>;
}

// Mockear el módulo de fetch
vi.mock("../hooks/useFetch", () => ({
  useFetch: vi.fn(),
}));

import { useFetch } from "../hooks/useFetch";

describe("UserProfile", () => {
  it("muestra spinner mientras carga", () => {
    vi.mocked(useFetch).mockReturnValue({ data: null, isLoading: true, error: null });
    render(<UserProfile userId={1} />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("muestra el nombre cuando los datos cargan", async () => {
    vi.mocked(useFetch).mockReturnValue({
      data: { id: 1, name: "Juan García" },
      isLoading: false,
      error: null,
    });

    render(<UserProfile userId={1} />);

    // findByText: espera hasta que el texto aparezca
    expect(await screen.findByText("Juan García")).toBeInTheDocument();
  });
});
```

## Matchers de jest-dom

```typescript
// Presencia en el DOM
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Visibilidad
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// Estado de form elements
expect(input).toBeEnabled();
expect(button).toBeDisabled();
expect(checkbox).toBeChecked();

// Contenido
expect(element).toHaveTextContent("Bienvenido");
expect(input).toHaveValue("test@email.com");
expect(select).toHaveValue("argentina");

// Atributos y clases
expect(element).toHaveAttribute("href", "/home");
expect(element).toHaveClass("btn-primary");
expect(element).toHaveStyle({ color: "red" });
```
