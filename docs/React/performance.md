---
sidebar_position: 4
---

# Performance en React

## Regla de Oro: Medir Antes de Optimizar

:::warning No optimizar prematuramente
React es rápido por defecto. La mayoría de aplicaciones no necesitan optimizaciones manuales. Antes de optimizar, **mide** con React DevTools Profiler para identificar el problema real.
:::

### React DevTools Profiler

1. Instalar la extensión [React Developer Tools] para Chrome/Firefox
2. Abrir DevTools → pestaña **Profiler**
3. Hacer click en el botón de record ●
4. Interactuar con la parte lenta de la app
5. Detener la grabación → analizar el flamegraph
6. Buscar componentes con barras largas o que re-renderizan innecesariamente

## `React.memo`

Evita que un componente se re-renderice si sus props no cambiaron:

```tsx
// Sin memo: se re-renderiza cada vez que el padre re-renderiza
function ExpensiveList({ items }: { items: Item[] }) {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}

// Con memo: solo re-renderiza si items cambia (comparación shallow)
const ExpensiveList = memo(function ExpensiveList({ items }: { items: Item[] }) {
  return <ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
});
```

### El problema con objetos y funciones como props

```tsx
// ❌ Problema: onSelect es una función nueva en cada render del padre
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {/* memo no sirve: onSelect es SIEMPRE una referencia nueva */}
      <MemoizedChild onSelect={() => console.log("selected")} />
    </>
  );
}

// ✅ Solución: useCallback para estabilizar la referencia
function Parent() {
  const [count, setCount] = useState(0);
  const handleSelect = useCallback(() => console.log("selected"), []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {/* Ahora memo funciona: handleSelect tiene referencia estable */}
      <MemoizedChild onSelect={handleSelect} />
    </>
  );
}
```

## `key` prop en listas

```tsx
const items = [
  { id: "a", name: "Manzana" },
  { id: "b", name: "Banana" },
];

// ❌ key={index}: si el orden cambia, React re-monta los componentes
{items.map((item, index) => <Item key={index} {...item} />)}

// ✅ key={item.id}: identidad estable = re-renders mínimos
{items.map(item => <Item key={item.id} {...item} />)}
```

| Situación | Key a usar |
|---|---|
| Lista de datos con ID | `key={item.id}` |
| Lista estática que nunca cambia de orden | `key={index}` (aceptable) |
| Lista que puede cambiar de orden | `key={item.id}` obligatorio |
| Lista con items que se pueden agregar/quitar | `key={item.id}` obligatorio |

## Virtualización de listas

Renderizar 10,000 elementos en el DOM causa problemas de performance. La virtualización solo renderiza los elementos visibles:

```bash
pnpm add @tanstack/react-virtual
```

```tsx
import { useVirtualizer } from "@tanstack/react-virtual";

function VirtualList({ items }: { items: string[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // altura estimada de cada item en px
  });

  return (
    <div ref={parentRef} style={{ height: "400px", overflow: "auto" }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {items[virtualItem.index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Optimización de Context

El problema: todos los consumers de un Context re-renderizan cuando **cualquier parte** del valor cambia:

```tsx
// ❌ Un solo context con datos de diferente frecuencia de cambio
const AppContext = createContext({ user, theme, notifications, count });
// Si count cambia 60 veces por segundo, user y theme también "cambian"

// ✅ Dividir contexts por frecuencia de cambio
const UserContext = createContext<User | null>(null);      // Cambia poco
const ThemeContext = createContext<Theme>("light");         // Cambia poco
const CounterContext = createContext({ count: 0 });        // Cambia frecuente

// ✅ Memoizar el value del Provider
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Sin useMemo: nuevo objeto en cada render del Provider
  // Con useMemo: mismo objeto si user no cambió
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

## React 18 — Concurrent Features

### `useTransition`

Marca actualizaciones de estado como no urgentes, manteniendo la UI responsiva:

```tsx
function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value); // Urgente: actualizar el input inmediatamente

    startTransition(() => {
      // No urgente: puede interrumpirse si el usuario sigue escribiendo
      setResults(filterItems(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleSearch} />
      {isPending ? <Spinner /> : <ResultsList items={results} />}
    </>
  );
}
```

### `useDeferredValue`

Difiere el re-render de una parte cara de la UI:

```tsx
function SearchResults({ query }: { query: string }) {
  // deferredQuery se actualiza con menor prioridad
  const deferredQuery = useDeferredValue(query);

  // Esta lista solo se recalcula cuando deferredQuery cambia
  // Mientras tanto, se muestra el resultado anterior (con opacity reducida)
  const results = useMemo(() => expensiveFilter(deferredQuery), [deferredQuery]);

  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      {results.map(item => <Result key={item.id} item={item} />)}
    </div>
  );
}
```

<!-- link's -->

[React Developer Tools]: https://react.dev/learn/react-developer-tools
