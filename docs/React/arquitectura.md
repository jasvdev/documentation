---
sidebar_position: 5
---

# Arquitectura de Proyectos React

## Estructura Feature-based

Organizar por dominio de negocio (features) en lugar de por tipo técnico (components, hooks, utils):

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── store/
│   │   │   └── auth.store.ts
│   │   ├── types.ts
│   │   └── index.ts          ← API pública del feature
│   ├── products/
│   └── checkout/
├── components/               ← Componentes UI genéricos (Button, Modal, Input)
├── hooks/                    ← Hooks compartidos entre features
├── services/                 ← Servicios compartidos (http client, logger)
├── store/                    ← Estado global compartido
├── types/                    ← Tipos TypeScript compartidos
├── utils/                    ← Funciones puras compartidas
└── pages/                    ← Solo composición de features, sin lógica
    ├── LoginPage.tsx
    └── DashboardPage.tsx
```

**Regla:** Si algo se usa solo dentro de un feature, vive dentro de ese feature. Si se usa en 2+ features, sube a `/shared` o a la carpeta correspondiente en la raíz.

## Estado Global con Zustand

Zustand es la librería de estado global recomendada para proyectos nuevos en 2025: simple, sin boilerplate, con TypeScript nativo.

```bash
pnpm add zustand
```

```typescript title="src/features/auth/store/auth.store.ts"
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        // Estado inicial
        user: null,
        token: null,
        isAuthenticated: false,

        // Acciones
        login: (user, token) =>
          set({ user, token, isAuthenticated: true }, false, "auth/login"),
        logout: () =>
          set({ user: null, token: null, isAuthenticated: false }, false, "auth/logout"),
      }),
      { name: "auth-storage" } // Persistir en localStorage
    )
  )
);

// Selectors: evitar re-renders innecesarios
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;

// Uso en componente
function Header() {
  // Solo se re-renderiza si user cambia (no si token cambia)
  const user = useAuthStore(selectUser);
  const logout = useAuthStore(state => state.logout);
  return <button onClick={logout}>{user?.name}</button>;
}
```

## Server State con TanStack Query

El estado del servidor (datos de API) es diferente al estado del cliente. TanStack Query (React Query) lo maneja con cache, revalidación y sincronización automática.

```bash
pnpm add @tanstack/react-query
```

```typescript title="src/main.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 minutos: datos "frescos" por este tiempo
      retry: 1,                   // Reintentar 1 vez en caso de error
    },
  },
});

// Envolver la app con el QueryClientProvider
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

```typescript title="src/features/products/hooks/useProducts.ts"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Keys de query como constantes (evitar typos)
const QUERY_KEYS = {
  products: ["products"] as const,
  product: (id: number) => ["products", id] as const,
};

// Query: obtener datos
export function useProducts() {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: () => productService.getAll(),
    // staleTime, enabled, select, etc.
  });
}

// Mutation: modificar datos + invalidar cache
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductDto) => productService.create(data),
    onSuccess: () => {
      // Invalidar la cache de products → se re-fetcha automáticamente
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
    },
  });
}

// Uso en componente
function ProductsPage() {
  const { data, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <>
      {data?.map(p => <ProductCard key={p.id} product={p} />)}
      <button onClick={() => createProduct.mutate({ name: "Nuevo" })}>
        Agregar
      </button>
    </>
  );
}
```

:::tip Server State vs Client State
- **Server State** (datos de API): usar **TanStack Query** — maneja cache, loading, error, refetch
- **Client State** (UI state, formularios, preferencias): usar **Zustand** o `useState`
- No mixes los dos: no guardes datos de API en Zustand
:::

## Formularios con React Hook Form + Zod

```bash
pnpm add react-hook-form zod @hookform/resolvers
```

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Definir el schema de validación con Zod
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

// 2. Inferir el tipo del schema (no duplicar tipos!)
type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await authService.login(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}

      <input {...register("password")} type="password" placeholder="Contraseña" />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
```

## Routing con React Router v7

```bash
pnpm add react-router
```

```tsx title="src/router.tsx"
import { createBrowserRouter, Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // Rutas públicas
      { path: "login", element: <LoginPage /> },

      // Rutas protegidas
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          {
            path: "products",
            children: [
              { index: true, element: <ProductsPage /> },
              { path: ":id", element: <ProductDetailPage /> },
            ],
          },
        ],
      },
    ],
  },
]);
```

```tsx title="src/main.tsx"
import { RouterProvider } from "react-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
```
