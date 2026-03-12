---
sidebar_position: 2
---

# Hooks de React

Los hooks son funciones especiales que permiten usar características de React (estado, ciclo de vida, contexto, etc.) en componentes funcionales.

## Reglas de los Hooks

:::danger Reglas obligatorias
1. **Solo llamar desde componentes funcionales** o desde custom hooks (nunca desde funciones regulares, clases o callbacks)
2. **Solo en el nivel superior** — nunca dentro de `if`, `for`, `while`, o funciones anidadas
:::

```tsx
// ❌ Incorrecto: dentro de un if
function Component({ show }: { show: boolean }) {
  if (show) {
    const [count, setCount] = useState(0); // Violación de reglas
  }
}

// ✅ Correcto: siempre en el nivel superior
function Component({ show }: { show: boolean }) {
  const [count, setCount] = useState(0); // Siempre se llama
  if (!show) return null;
  return <span>{count}</span>;
}
```

## `useState`

```tsx
// Sintaxis básica con TypeScript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// TypeScript infiere el tipo del valor inicial
const [name, setName] = useState(""); // string inferido

// Actualización funcional: cuando el nuevo estado depende del anterior
function increment() {
  setCount(prev => prev + 1); // ✅ Seguro con actualizaciones concurrentes
  // setCount(count + 1);     // ❌ Puede tener race conditions
}

// Estado complejo: agrupar estado relacionado
const [form, setForm] = useState({ name: "", email: "", age: 0 });

// Actualizar un campo sin perder los demás
function updateName(name: string) {
  setForm(prev => ({ ...prev, name }));
}
```

:::note Por qué no mutar el estado
React detecta cambios comparando la referencia del objeto (`===`). Si mutas el estado directamente (ej: `state.name = "nuevo"`), la referencia no cambia y React no detecta el cambio → no re-renderiza.
:::

## `useEffect`

```tsx
// Sintaxis: useEffect(efecto, [dependencias])
useEffect(() => {
  // Código del efecto

  return () => {
    // Cleanup: se ejecuta antes del próximo efecto o al desmontar
  };
}, [dependencias]);
```

### Variantes según el array de dependencias

| Array | Cuándo se ejecuta |
|---|---|
| `[]` | Solo una vez al montar el componente |
| `[dep1, dep2]` | Al montar y cuando `dep1` o `dep2` cambian |
| Sin array | En cada render (raramente útil) |

```tsx
// Fetch al montar (array vacío)
useEffect(() => {
  let cancelled = false;

  async function fetchData() {
    const data = await getUserById(userId);
    if (!cancelled) setUser(data); // Evitar actualizar si el componente se desmontó
  }

  fetchData();

  return () => { cancelled = true; }; // Cleanup: cancelar el fetch
}, []);

// Efecto con dependencia
useEffect(() => {
  document.title = `Hola, ${name}`;
}, [name]); // Solo cuando name cambia

// Suscripción con cleanup
useEffect(() => {
  const subscription = eventBus.subscribe("update", handler);
  return () => subscription.unsubscribe(); // Cleanup obligatorio
}, [handler]);
```

:::warning React StrictMode ejecuta los efectos dos veces
En desarrollo con `StrictMode`, React monta, desmonta y vuelve a montar los componentes para detectar efectos sin cleanup. Si tu efecto hace algo que no puede deshacerse (ej: analytics), usa una ref como guard. En producción no ocurre.
:::

## `useRef`

`useRef` retorna un objeto `{ current: T }` que persiste entre renders **sin causar re-renders**:

```tsx
// Uso 1: referencia a elemento del DOM
function AutoFocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus(); // Acceso directo al DOM
  }, []);

  return <input ref={inputRef} />;
}

// Uso 2: valor mutable que no dispara re-renders
function Timer() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    timerRef.current = setInterval(() => console.log("tick"), 1000);
  }

  function stop() {
    if (timerRef.current) clearInterval(timerRef.current);
  }

  return <button onClick={start}>Start</button>;
}

// Uso 3: guardar el valor previo de una prop/estado
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => { ref.current = value; });
  return ref.current;
}
```

## `useMemo` y `useCallback`

```tsx
// useMemo: memoiza el RESULTADO de un cálculo costoso
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.price - b.price);
}, [items]); // Solo recalcula cuando items cambia

// useCallback: memoiza una FUNCIÓN
const handleClick = useCallback((id: number) => {
  dispatch({ type: "SELECT", id });
}, [dispatch]); // Solo recrea la función si dispatch cambia
```

:::warning No sobre-optimizar
`useMemo` y `useCallback` tienen un costo propio (memoria + comparación de dependencias). Úsalos solo cuando:
1. Tengas un cálculo medido como lento con React DevTools Profiler
2. Una función se pasa como prop a un componente envuelto en `React.memo`
3. Una función es dependencia de otro `useEffect`
:::

## `useContext`

```tsx
// 1. Crear el contexto con un valor por defecto tipado
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// 2. Custom hook para consumir el contexto (con validación)
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider");
  return context;
}

// 3. Provider
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Uso en cualquier componente hijo
function Header() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Tema: {theme}</button>;
}
```

## `useReducer`

Ideal cuando el estado tiene múltiples transiciones relacionadas:

```tsx
// Definir el estado y las acciones con discriminated unions
interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART" };

// Reducer: función pura (estado, acción) → nuevo estado
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        items: [...state.items, action.payload],
        total: state.total + action.payload.price,
      };
    case "REMOVE_ITEM":
      const item = state.items.find(i => i.id === action.payload.id);
      return {
        items: state.items.filter(i => i.id !== action.payload.id),
        total: state.total - (item?.price ?? 0),
      };
    case "CLEAR_CART":
      return { items: [], total: 0 };
  }
}

// Uso en componente
function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <div>
      <p>Total: ${state.total}</p>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Vaciar carrito
      </button>
    </div>
  );
}
```

## Custom Hooks

Un custom hook es una función que empieza con `use` y puede llamar otros hooks:

```tsx
// useFetch: datos de una API con loading/error
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false); } });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

// useLocalStorage: estado persistente en localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
    setValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, value]);

  return [value, setStoredValue] as const;
}

// useDebounce: retrasar la ejecución de una función
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```
