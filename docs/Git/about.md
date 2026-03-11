---
sidebar_position: 1
---

# Acerca de

Git es un sistema de control de versiones distribuido gratuito y de código abierto diseñado para manejar todo, desde proyectos pequeños hasta proyectos muy grandes, incluso documentación personal, [sitio oficial].

## Glosario

- `Working Directory` : "Directorio de trabajo" en la copia local del repositorio
- `Staging Area` : "Espacio de preparación" para lanzar una nueva confirmación (Commit) al repositorio GIT
- `Git Repositorio` : El almacenamiento interno del repositorio en su forma versionada, el codigo Verdadero
- `remote/local` : El repositorio siempre se tiene local y remoto, se diferencia por la palabra "origin". "origin/master": Remota "master": Local, claro esta cuando se tiene un servidor git.
- `HEAD` : Sinónimo del ultimo commit o cabeza en la cual estamos parados
- `HEAD~2` : Indicamos el segundo commit despues del HEAD
- `-h` : este flag es usado en cualquier comando para obtener mas informacion
- `.gitignore` : Este archivo debe irse en el repositorio, se usa para ignorar archivos del versionamiento
  - **PATRONES**: `file.txt`, `\*.json` , `tmp/\*`

## Ciclo de vida del fichero (states)

- `Untracked` : Archivo nuevo
- `Modified` : Archivo ya en repositorio, que fue modificado
- `Staged` : Archivo con algun cambio/Nuevo listo para agregarse al Repositorio
- `Unmodified` : Archivo en el repositorio, en estado final de verdad, segun la rama

<!-- assets -->

<!-- link's -->

[sitio oficial]: https://git-scm.com/

<!-- Imagen -->
