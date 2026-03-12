---
sidebar_position: 4
---

# E2E Testing con Playwright

Los tests E2E (End-to-End) simulan interacciones reales de un usuario en el navegador, desde la interfaz hasta el backend. Son los más lentos y costosos, pero los que más confianza dan.

## Playwright vs Cypress

| Característica | Playwright | Cypress |
|---|---|---|
| Browsers | Chromium, Firefox, WebKit | Chrome, Firefox, Edge |
| Ejecución | Paralela (múltiples workers) | Single-threaded |
| TypeScript | Nativo, sin config extra | Requiere setup |
| Velocidad | Más rápido (paralelo) | Más lento |
| Debugging | Trace Viewer, codegen | Time travel debugging |
| Mobile | ✅ Emulación nativa | ❌ Limitado |
| CI/CD | ✅ Headless por defecto | Necesita config extra |
| Precio | Open source (Microsoft) | Free tier + pago |

:::tip Playwright en 2025
Playwright se ha convertido en el estándar para E2E testing en el ecosistema moderno. Su capacidad de ejecutar tests en paralelo en múltiples browsers lo hace significativamente más rápido que Cypress en proyectos grandes.
:::

## Setup

```bash
pnpm create playwright
```

Esto genera la estructura base:
```
playwright.config.ts
tests/
├── example.spec.ts
tests-examples/
└── demo-todo-app.spec.ts
```

```typescript title="playwright.config.ts"
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,          // Tests en paralelo
  retries: process.env.CI ? 2 : 0, // Reintentar en CI
  reporter: "html",

  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",    // Capturar trace solo en fallos
  },

  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],

  // Iniciar el servidor de desarrollo antes de correr tests
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

## Escribir tests E2E

```typescript title="tests/auth.spec.ts"
import { test, expect } from "@playwright/test";

test.describe("Autenticación", () => {
  test("el usuario puede iniciar sesión con credenciales válidas", async ({ page }) => {
    // Navegar a la página
    await page.goto("/login");

    // Llenar el formulario
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Contraseña").fill("password123");

    // Hacer click en el botón
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // Esperar la navegación y verificar
    await expect(page).toHaveURL("/dashboard");
    await expect(page.getByText("Bienvenido, Juan")).toBeVisible();
  });

  test("muestra error con credenciales inválidas", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Contraseña").fill("wrongpassword");
    await page.getByRole("button", { name: "Iniciar sesión" }).click();

    await expect(page.getByText("Credenciales inválidas")).toBeVisible();
    await expect(page).toHaveURL("/login"); // No redirigió
  });
});
```

## Locators — La forma correcta de seleccionar elementos

Los locators son la evolución de los selectores en Playwright. Son automáticamente re-intentados hasta que el elemento sea visible:

```typescript
// ✅ Locators recomendados (accesibles y estables)
page.getByRole("button", { name: "Guardar" });
page.getByLabel("Email");
page.getByPlaceholder("Buscar productos...");
page.getByText("Bienvenido");
page.getByAltText("Logo de la empresa");

// ⚠️ Locators aceptables
page.getByTestId("submit-button"); // data-testid="submit-button"

// ❌ Evitar: frágiles, se rompen con cambios de CSS/estructura
page.locator(".btn-primary");
page.locator("#submit-btn");
page.locator("div > span:nth-child(2)");
```

## Assertions de Playwright

```typescript
// URL y título
await expect(page).toHaveURL("/dashboard");
await expect(page).toHaveTitle("Mi App - Dashboard");

// Visibilidad y estado
await expect(page.getByRole("dialog")).toBeVisible();
await expect(page.getByRole("button", { name: "Eliminar" })).toBeDisabled();
await expect(page.getByRole("checkbox")).toBeChecked();

// Contenido
await expect(page.getByRole("heading")).toHaveText("Productos");
await expect(page.getByLabel("Nombre")).toHaveValue("Juan García");
await expect(page.getByTestId("count")).toContainText("5 items");

// Atributos
await expect(page.getByRole("link")).toHaveAttribute("href", "/productos");
```

## Page Object Model (POM)

Para tests grandes, el POM organiza la interacción con una página en una clase reutilizable:

```typescript title="tests/pages/LoginPage.ts"
import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Contraseña");
    this.submitButton = page.getByRole("button", { name: "Iniciar sesión" });
    this.errorMessage = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// Uso en tests — más limpio y mantenible
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";

test("login exitoso", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("test@example.com", "password123");
  await expect(page).toHaveURL("/dashboard");
});
```

## Debugging

```bash
# Modo headful (ver el navegador)
pnpm playwright test --headed

# Modo debug (step by step)
pnpm playwright test --debug

# Generar tests grabando interacciones
pnpm playwright codegen http://localhost:5173

# Ver el trace de un test fallido
pnpm playwright show-report
```

## Integración con GitHub Actions

```yaml title=".github/workflows/playwright.yml"
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - uses: pnpm/action-setup@v3
      - run: pnpm install
      - run: pnpm exec playwright install --with-deps
      - run: pnpm exec playwright test
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```
