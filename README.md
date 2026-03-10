# Personal Documentation Hub 📝

Bienvenido a mi repositorio personal de documentación, `jasvdev.documentation`.

Este espacio sirve como una plataforma centralizada (una especie de wiki o blog técnico) para almacenar definiciones, conceptos técnicos, tips, configuraciones personalizadas, preguntas de entrevistas y todo lo relacionado a mi carrera como ingeniero de software.

Está construido en **React** con **Docusaurus**, y estilizado de forma custom con **Tailwind CSS**.

## Sobre el Versionado de Documentación

Docusaurus nos permite crear y mantener diferentes versiones de nuestra documentación. ¡Es súper útil cuando las configuraciones, frameworks o estándares de tu carrera evolucionan!

### ¿Cómo Funciona?

Cada vez que cortamos una versión (por ejemplo, de los apuntes actuales), Docusaurus toma una "foto" (snapshot) del contenido actual de la carpeta `docs/` y lo copia a un nuevo directorio `versioned_docs/version-<numero>`.

- La carpeta `docs/` siempre representa la versión **`Next`** (la más actual, en desarrollo continuo).
- La documentación estable o de versiones pasadas queda congelada en `versioned_docs/`.

### Crear una Nueva Versión

Para generar una nueva versión basada en el estado actual de `docs/`, ejecuta:

```bash
pnpm run docusaurus docs:version <numero-o-nombre>
# Ejemplo: pnpm run docusaurus docs:version 2.0.0
```

¡Con esto, aparecerá un menú desplegable en todos tus documentos para viajar en el tiempo a través de las diferentes versiones!

## Despliegue en GitHub Pages

El sitio se despliega automáticamente en [https://jasvdev.github.io/documentation/](https://jasvdev.github.io/documentation/) mediante GitHub Actions al hacer push a `main`.

### Estrategia de despliegue

Se usa la estrategia nativa de GitHub Pages con `actions/deploy-pages`, que elimina la necesidad de un branch `gh-pages` y no requiere configurar el source manualmente.

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) tiene dos jobs:
- **build** — instala dependencias, compila el sitio y sube el artefacto
- **deploy** — despliega el artefacto directamente a GitHub Pages

### Configuración inicial (solo una vez)

Hay que habilitar GitHub Pages en modo **GitHub Actions** (no branch) en el repositorio remoto:

**Opción A — Desde la UI de GitHub:**

1. Ir a `Settings > Pages` del repositorio
2. En **Source**, seleccionar **"GitHub Actions"**
3. Guardar

**Opción B — Con GitHub CLI:**

```bash
gh api --method PUT repos/jasvdev/documentation/pages \
  -f "build_type=workflow"
```

**Verificar la configuración actual:**

```bash
gh api repos/jasvdev/documentation/pages
# El campo "build_type" debe ser "workflow"
```

> **Nota:** Si `build_type` es `legacy`, Pages intentará servir desde un branch (como `main` o `gh-pages`) en lugar del artefacto generado por el workflow, y la URL mostrará un 404.

## Comandos Útiles

- **Iniciar en desarrollo**: `pnpm start`
- **Construir para producción**: `pnpm build`
- **Generar una nueva versión**: `pnpm run docusaurus docs:version <version>`
- **Comprobar tipos de TypeScript**: `pnpm run typecheck`
