---
sidebar_position: 3
---

# Patrones de Diseño en React

## Component Composition

La composición es el patrón más fundamental de React. Prefiere construir UI combinando componentes pequeños en lugar de usar herencia.

### Children Pattern

```tsx
// Componente que acepta contenido arbitrario mediante children
interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Card({ title, children, footer }: CardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Uso: el padre decide qué va dentro
<Card title="Perfil" footer={<button>Editar</button>}>
  <p>Nombre: Juan</p>
  <p>Email: juan@example.com</p>
</Card>
```

### Compound Components

Patrón para grupos de componentes estrechamente relacionados que comparten estado implícito:

```tsx
// El estado se comparte a través de Context interno
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)!;
  return (
    <button
      className={ctx.activeTab === id ? "tab active" : "tab"}
      onClick={() => ctx.setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const ctx = useContext(TabsContext)!;
  if (ctx.activeTab !== id) return null;
  return <div className="tab-panel">{children}</div>;
}

// Agrupar bajo el namespace del componente padre
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// Uso: la API es declarativa y auto-documentada
<Tabs defaultTab="perfil">
  <Tabs.List>
    <Tabs.Tab id="perfil">Perfil</Tabs.Tab>
    <Tabs.Tab id="settings">Configuración</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="perfil"><PerfilContent /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsContent /></Tabs.Panel>
</Tabs>
```

## Container / Presentational

Separar la lógica de negocio de la presentación visual:

```tsx
// Presentational: solo recibe props y renderiza
// Sin estado propio (excepto UI state como hover/focus)
// Sin side effects
interface UserListViewProps {
  users: User[];
  loading: boolean;
  onSelectUser: (user: User) => void;
}

function UserListView({ users, loading, onSelectUser }: UserListViewProps) {
  if (loading) return <Spinner />;
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelectUser(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}

// Container / Custom Hook: maneja la lógica y datos
function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(data => { setUsers(data); setLoading(false); });
  }, []);

  const handleSelectUser = useCallback((user: User) => {
    router.push(`/users/${user.id}`);
  }, []);

  return { users, loading, handleSelectUser };
}

// Página: une el hook con la vista
function UserListPage() {
  const { users, loading, handleSelectUser } = useUserList();
  return <UserListView users={users} loading={loading} onSelectUser={handleSelectUser} />;
}
```

:::note Custom Hooks reemplazaron a los HOC
En React moderno (2019+), la separación Container/Presentational se expresa mejor con custom hooks que con Higher Order Components. Los HOC siguen siendo válidos pero son menos ergonómicos.
:::

## Higher Order Components (HOC)

Un HOC es una función que recibe un componente y retorna un componente nuevo con funcionalidad adicional:

```tsx
// HOC para proteger rutas que requieren autenticación
function withAuth<T extends object>(Component: React.ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

// Uso
const ProtectedDashboard = withAuth(Dashboard);
```

:::tip Cuándo usar HOC en 2025
Los HOC todavía tienen sentido para:
- Lógica cross-cutting que afecta el render (auth, error boundaries, analytics)
- Librerías que deben ser compatibles con React < 16.8
En la mayoría de casos nuevos, prefiere custom hooks.
:::

## Provider Pattern

```tsx
// Múltiples providers compuestos (evitar el "Provider Hell")
function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// main.tsx
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
  </AppProviders>
);
```

## Error Boundaries

Los hooks no capturan errores de render. Para eso existen los Error Boundaries (solo como clase):

```tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Reportar a servicio de monitoring (Sentry, etc.)
    console.error("Error capturado:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <div>Algo salió mal.</div>;
    }
    return this.props.children;
  }
}

// Uso
<ErrorBoundary fallback={<ErrorPage />}>
  <RiskyComponent />
</ErrorBoundary>
```

## Suspense y Code Splitting

```tsx
// React.lazy: cargar componentes de forma lazy (solo cuando se necesitan)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));

// Suspense: mostrar fallback mientras el componente se carga
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

:::tip Lazy loading por ruta, no por componente
El punto de corte más eficiente para code splitting es a nivel de ruta, no de componente individual. Cada ruta lazy se convierte en un chunk separado que solo se descarga cuando el usuario navega a ella.
:::
