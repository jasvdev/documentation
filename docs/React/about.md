---
sidebar_position: 1
---

# Acerca de React

React es una **biblioteca JavaScript** (no un framework) para construir interfaces de usuario, desarrollada por Meta. Se enfoca exclusivamente en la capa de vista y delega el resto (routing, estado global, fetching) al ecosistema. [Sitio oficial]

## React vs Otros Frameworks

| Característica | React | Angular | Vue |
|---|---|---|---|
| Tipo | Biblioteca | Framework completo | Framework progresivo |
| Lenguaje | JSX + JS/TS | TypeScript (obligatorio) | SFC + JS/TS |
| Curva de aprendizaje | Media | Alta | Baja |
| Tamaño (bundle) | ~45KB | ~130KB+ | ~35KB |
| Flexibilidad | Alta | Baja | Media |
| Ecosistema | Muy grande | Grande | Grande |
| Mantenido por | Meta | Google | Comunidad |
| Modelo de datos | Unidireccional | Bidireccional | Bidireccional |

## Conceptos Fundamentales

### JSX

JSX es azúcar sintáctico sobre `React.createElement()`. Babel o SWC lo transforman en JavaScript puro:

```jsx
// JSX que escribes
const element = <h1 className="title">Hola Mundo</h1>;

// Lo que Babel genera
const element = React.createElement("h1", { className: "title" }, "Hola Mundo");
```

**Reglas de JSX:**
- Siempre un elemento raíz (o `<>...</>` Fragment)
- `class` → `className`, `for` → `htmlFor`
- Atributos en camelCase: `onClick`, `onChange`, `onSubmit`
- Todo lo que va entre `{}` es expresión JavaScript
- Los componentes propios siempre en PascalCase: `<MyComponent />`

### Componentes

Un componente es una función pura que recibe `props` y retorna JSX:

```tsx
// Componente funcional con TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

function Button({ label, onClick, disabled = false, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// Uso
<Button label="Guardar" onClick={() => console.log("click")} />
```

### Props vs State

| | Props | State |
|---|---|---|
| Definición | Datos que el padre pasa al hijo | Datos internos del componente |
| Mutabilidad | Inmutables (solo lectura) | Mutables con `setState` |
| Flujo | Hacia abajo (padre → hijo) | Local al componente |
| Re-render | Cuando el padre re-renderiza | Cuando cambian con `setState` |

### Virtual DOM y Reconciliation

React mantiene una representación virtual del DOM en memoria. Cuando el estado cambia:

```
1. React genera un nuevo Virtual DOM
2. Compara con el Virtual DOM anterior (diffing)
3. Calcula el mínimo número de operaciones necesarias
4. Aplica solo esos cambios al DOM real (reconciliation)
```

:::tip La importancia de `key`
En listas, la prop `key` le dice a React qué elementos cambiaron, se agregaron o eliminaron. Sin una key correcta, React re-renderiza todos los elementos. Usa siempre el ID del dato, nunca el índice del array (excepto en listas estáticas).
:::

### Controlled vs Uncontrolled Components

| | Controlled | Uncontrolled |
|---|---|---|
| Estado | Manejado por React (useState) | Manejado por el DOM |
| Lectura del valor | `value` prop | `ref.current.value` |
| Validación | Fácil (en el onChange) | Más difícil |
| Caso de uso | Formularios con lógica compleja | Inputs simples, integración con libs externas |

```tsx
// Controlled: React controla el valor
function ControlledInput() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

// Uncontrolled: el DOM controla el valor
function UncontrolledInput() {
  const ref = useRef<HTMLInputElement>(null);
  const getValue = () => ref.current?.value;
  return <input ref={ref} />;
}
```

## Setup con Vite

```bash
# Crear nuevo proyecto React + TypeScript
pnpm create vite@latest my-app -- --template react-ts
cd my-app
pnpm install
pnpm dev
```

### Estructura de carpetas recomendada (Feature-based)

```
src/
├── assets/           # Imágenes, fuentes, SVGs
├── components/       # Componentes UI reutilizables (sin lógica de negocio)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── Modal/
├── features/         # Módulos por dominio de negocio
│   ├── auth/
│   │   ├── components/   # Componentes específicos de auth
│   │   ├── hooks/        # Hooks específicos de auth
│   │   ├── services/     # API calls de auth
│   │   └── types.ts      # Tipos de auth
│   └── products/
├── hooks/            # Hooks personalizados compartidos
├── services/         # API calls compartidos
├── store/            # Estado global (Zustand)
├── types/            # Tipos TypeScript compartidos
└── utils/            # Funciones utilitarias puras
```

:::tip Vite > CRA en 2025
Create React App (CRA) fue deprecado en 2023. Para proyectos nuevos usa **Vite** (más rápido, mejor DX, soporte nativo para TypeScript y ESM).
:::

<!-- link's -->

[Sitio oficial]: https://react.dev/
