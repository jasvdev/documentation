---
sidebar_position: 5
---

# Utils

## Comandos Git Config

> Establece VS Code como herramienta para resolver conflictos de merge. Git abrirá VS Code automáticamente cuando haya conflictos.

```bash
git config --global merge.tool vscode
```

> Configura VS Code para mostrar diferencias entre archivos. Al usar `git difftool` se abrirá VS Code en lugar de mostrar diff en terminal.

```bash
git config --global diff.tool vscode
```

> Maneja automáticamente terminaciones de línea entre sistemas operativos. Convierte LF ↔ CRLF según sea necesario.

```bash
git config --global core.autocrlf true
```

> Con esta configuración, cuando hagas `git push` en una rama nueva, Git automáticamente creará la rama remota y establecerá el upstream.

```bash
git config --global push.autoSetupRemote true
```

> Establece VS Code como editor predeterminado para Git. `--wait` hace que Git espere hasta cerrar el editor.

```bash
git config --global core.editor "code --wait"
```

> Configura tu nombre que aparecerá en todos los commits. Información obligatoria para identificar autor.

```bash
git config --global user.name "Tu Nombre"
```

> Establece tu email asociado a commits. Debe coincidir con tu cuenta GitHub/GitLab.

```bash
git config --global user.email "tu_email@ejemplo.com"
```

> Muestra toda la configuración de Git (global + local + sistema).

```bash
git config --list
```

> Muestra únicamente la configuración global del usuario.

```bash
git config --global --list
```

> Consulta el nombre de usuario configurado (local o global).

```bash
git config user.name
```

> Consulta el email configurado (local o global).

```bash
git config user.email
```

## Flags

| FLAG/REFERENCIA | SHORTCUT | DESCRIPCIÓN                                                 |
| --------------- | -------- | ----------------------------------------------------------- |
| HEAD            | -        | Referencia al último commit de la rama actual               |
| HEAD~1          | HEAD^    | Referencia al commit anterior al último (1 commit atrás)    |
| HEAD~5          | -        | Referencia al commit 5 posiciones atrás del último          |
| --no-verify     | -n       | Omite la ejecución de hooks pre-commit y commit-msg         |
| --verbose       | -v       | Muestra información detallada durante la ejecución          |
| --local         | -        | Aplica la configuración solo al repositorio local           |
| --global        | -        | Aplica la configuración a nivel global del usuario          |
| --continue      | -        | Continúa una operación después de resolver conflictos       |
| --abort         | -        | Cancela una operación en curso y regresa al estado anterior |
| --skip          | -        | Salta el commit actual durante rebase/cherry-pick           |
| --interactive   | -i       | Ejecuta el comando en modo interactivo                      |

## Alias

### Table

| ALIAS   | COMANDO GIT                                                  | EXPLICACIÓN                                            |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| ✨ st   | git status                                                   | Muestra el estado actual del repositorio               |
| ✨ a    | git add                                                      | Añade archivos al área de staging                      |
| ✨ all  | git add --all                                                | Añade todos los archivos al staging                    |
| ✨ cm   | git commit --message                                         | Hace un commit con mensaje                             |
| ✨ ps   | git push                                                     | Sube cambios al repositorio remoto                     |
| ✨ psf  | git push --force                                             | Push forzado                                           |
| ✨ pl   | git pull                                                     | Descarga cambios del repositorio remoto                |
| ✨ b    | git branch                                                   | Lista las ramas locales                                |
| ✨ sw   | git switch                                                   | Cambia a otra rama                                     |
| ✨ ck   | git checkout                                                 | Cambia a otra rama o restaura archivos                 |
| ✨ mg   | git merge                                                    | Fusiona ramas                                          |
| ✨ log1 | git log --graph --decorate --abbrev-commit --all --oneline   | Historial de commits en formato gráfico de una línea   |
| ✨ cl   | git clone --recurse-submodules                               | Clona un repositorio con submódulos                    |
| v       | git --version                                                | Muestra la versión de Git                              |
| i       | git init                                                     | Inicializa un nuevo repositorio                        |
| gc      | git gc                                                       | Limpia archivos innecesarios y optimiza el repositorio |
| cf      | git config                                                   | Configura opciones de Git                              |
| cfl     | git config --list                                            | Lista toda la configuración                            |
| cfla    | git config --get-regexp alias                                | Lista todos los alias configurados                     |
| cflu    | git config --get-regexp user                                 | Lista la configuración del usuario                     |
| cfun    | git config user.name                                         | Muestra o configura el nombre del usuario              |
| cfue    | git config user.email                                        | Muestra o configura el email del usuario               |
| sts     | git status --short                                           | Estado del repositorio en formato corto                |
| stb     | git status --short --branch                                  | Estado corto con información de rama                   |
| df      | git diff --word-diff                                         | Diferencias palabra por palabra                        |
| dfs     | git diff --word-diff --staged                                | Diferencias palabra por palabra de archivos staged     |
| ap      | git add --patch                                              | Añade cambios de forma interactiva                     |
| au      | git add --update                                             | Añade solo archivos ya trackeados                      |
| rs      | git restore                                                  | Restaura archivos del working directory                |
| rsa     | git restore .                                                | Restaura todos los archivos del directorio actual      |
| rss     | git reset                                                    | Deshace cambios del área de staging                    |
| rsh     | git reset --hard                                             | Deshace cambios completamente                          |
| clean   | git clean -f -d                                              | Elimina archivos no trackeados                         |
| sh      | git stash                                                    | Guarda cambios temporalmente                           |
| shl     | git stash list                                               | Lista todos los stashes                                |
| shall   | git stash --all                                              | Guarda todos los archivos incluyendo ignorados         |
| shu     | git stash --include-untracked                                | Guarda incluyendo archivos no trackeados               |
| sha     | git stash apply                                              | Aplica el último stash                                 |
| shd     | git stash drop                                               | Elimina un stash                                       |
| shcl    | git stash clear                                              | Elimina todos los stashes                              |
| shs     | git stash show --patch                                       | Muestra los cambios en un stash                        |
| cmx     | git commit --no-verify --message                             | Commit sin ejecutar hooks                              |
| cma     | git commit --no-edit --amend                                 | Modifica el último commit sin editar mensaje           |
| cmax    | git commit --no-verify --no-edit --amend                     | Modifica último commit sin hooks ni editar             |
| cmae    | git commit --amend -m                                        | Modifica el último commit con nuevo mensaje            |
| rev     | git revert HEAD                                              | Revierte el último commit                              |
| revn    | git revert -n HEAD                                           | Revierte el último commit sin hacer commit             |
| br      | git branch --remote                                          | Lista ramas remotas                                    |
| ba      | git branch --all                                             | Lista todas las ramas (locales y remotas)              |
| bm      | git branch --no-merged                                       | Lista ramas no fusionadas                              |
| bd      | git branch --delete                                          | Elimina una rama                                       |
| bdf     | git branch --delete --force                                  | Elimina una rama forzadamente                          |
| brn     | git branch -m                                                | Renombra una rama                                      |
| bsup    | git branch --set-upstream-to=                                | Configura rama upstream                                |
| swx     | git switch --discard-changes                                 | Cambia rama descartando cambios                        |
| swc     | git switch -c                                                | Crea y cambia a nueva rama                             |
| ckb     | git checkout -b                                              | Crea y cambia a nueva rama                             |
| mgs     | git merge --squash                                           | Fusiona rama comprimiendo commits                      |
| chp     | git cherry-pick                                              | Aplica commit específico                               |
| rb      | git rebase                                                   | Reaplica commits sobre otra base                       |
| rbi     | git rebase -i                                                | Rebase interactivo                                     |
| fh      | git fetch                                                    | Descarga cambios sin fusionar                          |
| fha     | git fetch --all --prune                                      | Descarga todos los remotos y limpia referencias        |
| plr     | git pull --rebase                                            | Pull con rebase en lugar de merge                      |
| plra    | git pull --rebase --autostash                                | Pull con rebase y stash automático                     |
| plo     | git pull origin                                              | Pull desde origin                                      |
| pls     | git pull upstream                                            | Pull desde upstream                                    |
| psx     | git push --no-verify                                         | Push sin ejecutar hooks                                |
| psfx    | git push --force --no-verify                                 | Push forzado sin hooks                                 |
| psup    | git push --set-upstream origin                               | Push configurando upstream                             |
| pso     | git push origin --all && git push origin --tags              | Push de todas las ramas y tags                         |
| pss     | git push upstream                                            | Push a upstream                                        |
| re      | git remote                                                   | Gestiona repositorios remotos                          |
| rev     | git remote -v                                                | Lista remotos con URLs                                 |
| rea     | git remote add                                               | Añade un remoto                                        |
| rerm    | git remote remove                                            | Elimina un remoto                                      |
| remv    | git remote rename                                            | Renombra un remoto                                     |
| reset   | git remote set-url                                           | Cambia URL de un remoto                                |
| reup    | git remote update                                            | Actualiza referencias remotas                          |
| tg      | git tag                                                      | Gestiona etiquetas                                     |
| tgd     | git tag -d                                                   | Elimina una etiqueta                                   |
| rlog    | git reflog                                                   | Historial de referencias                               |
| rlog1   | git reflog --pretty=oneline --decorate --abbrev-commit       | Reflog en formato de una línea                         |
| rlog2   | git reflog --pretty=oneline --decorate --abbrev-commit --all | Reflog de todas las referencias                        |
| log2    | git log --graph --decorate --all --oneline                   | Log gráfico de todas las ramas                         |
| log3    | git log --decorate --all --oneline                           | Log simple de todas las ramas                          |
| log4    | git log --all --oneline                                      | Log de una línea de todas las ramas                    |
| log5    | git log --stat                                               | Log con estadísticas de cambios                        |
| ls      | git ls-files -v                                              | Lista archivos del índice                              |
| lsm     | git ls-files -v -m                                           | Lista archivos modificados                             |
| lsd     | git ls-files -v -d                                           | Lista archivos eliminados                              |
| sec     | git bisect                                                   | Búsqueda binaria de bugs                               |
| secb    | git bisect bad                                               | Marca commit como malo en bisect                       |
| secg    | git bisect good                                              | Marca commit como bueno en bisect                      |
| secr    | git bisect reset                                             | Resetea sesión de bisect                               |
| secs    | git bisect start                                             | Inicia sesión de bisect                                |
| bl      | git blame -w -e                                              | Muestra quién modificó cada línea                      |
| us      | git shortlog --summary                                       | Resumen de commits por autor                           |
| usn     | git shortlog --summary -n                                    | Resumen de commits por autor ordenado                  |
| hh      | git help                                                     | Ayuda de Git                                           |
| wt      | git worktree                                                 | Gestiona árboles de trabajo                            |
| wtls    | git worktree list                                            | Lista árboles de trabajo                               |
| wtmv    | git worktree move                                            | Mueve un árbol de trabajo                              |
| wtrm    | git worktree remove                                          | Elimina un árbol de trabajo                            |

### .gitconfig

```git
 [alias]
  v = --version
  i = init
  gc = gc
  cf = config
  cfl = config --list
  cfla = config --get-regexp alias
  cflu = config --get-regexp user
  cfun = config user.name
  cfue = config user.email
  st = status
  sts = status --short
  stb = status --short --branch
  df = diff --word-diff
  dfs = diff --word-diff --staged
  a = add
  all = add --all
  ap = add --patch
  au = add --update
  rs = restore
  rsa = restore .
  rss = reset
  rsh = reset --hard
  clean = clean -f -d
  sh = stash
  shl = stash list
  shall = stash --all
  shu = stash --include-untracked
  sha = stash apply
  shd = stash drop
  shcl = stash clear
  shs = stash show --patch
  cm = commit --message
  cmx = commit --no-verify --message
  cma = commit --no-edit --amend
  cmax = commit --no-verify --no-edit --amend
  cmae = commit --amend -m
  rev = revert HEAD
  revn = revert -n HEAD
  b = branch
  br = branch --remote
  ba = branch --all
  bm = branch --no-merged
  bd = branch --delete
  bdf = branch --delete --force
  brn = branch -m
  bsup = branch --set-upstream-to=
  sw = switch
  swx = switch --discard-changes
  swc = switch -c
  ck = checkout
  ckb = checkout -b
  mg = merge
  mgs = merge --squash
  chp = cherry-pick
  rb = rebase
  rbi = rebase -i
  cl = clone --recurse-submodules
  fh = fetch
  fha = fetch --all --prune
  pl = pull
  plr = pull --rebase
  plra = pull --rebase --autostash
  plo = pull origin
  pls = pull upstream
  ps = push
  psx = push --no-verify
  psf = push --force
  psfx = push --force --no-verify
  psup = push --set-upstream origin
  pso = push origin --all && git push origin --tags
  pss = push upstream
  re = remote
  rev = remote -v
  rea = remote add
  rerm = remote remove
  remv = remote rename
  reset = remote set-url
  reup = remote update
  tg = tag
  tgd = tag -d
  rlog = reflog
  rlog1 = reflog --pretty=oneline --decorate --abbrev-commit
  rlog2 = reflog --pretty=oneline --decorate --abbrev-commit --all
  log0 = log --graph --decorate --abbrev-commit --all --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset) %C(white)%s%C(reset) %C(dim white)- %ae%C(reset)'
  log1 = log --graph --decorate --abbrev-commit --all --oneline
  log2 = log --graph --decorate --all --oneline
  log3 = log --decorate --all --oneline
  log4 = log --all --oneline
  log5 = log --stat
  ls = ls-files -v
  lsm = ls-files -v -m
  lsd = ls-files -v -d
  sec = bisect
  secb = bisect bad
  secg = bisect good
  secr = bisect reset
  secs = bisect start
  bl = blame -w -e
  us = shortlog --summary
  usn = shortlog --summary -n
  hh = help
  wt = worktree
  wtls = worktree list
  wtmv = worktree move
  wtrm = worktree remove
```

## VsCode Extensiones

### GitLens — Git supercharged

La extensión más popular para Git con visualización de autoría, navegación avanzada y comparaciones poderosas
[GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

### Git Graph

Visualiza el historial de Git como un gráfico interactivo
[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)

### GitHub Copilot

Extensión invaluable que revoluciona el desarrollo de código, generando sugerencias inteligentes mientras escribes
[GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

### GitHub Copilot Chat

Herramienta de programación AI que proporciona sugerencias de código y chat en lenguaje natural
[GitHub Copilot Chat](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)

## Git clients

### SourceTree

[SourceTree](https://www.sourcetreeapp.com/) es uno de los clientes Git que mas uso, almenos para la seleccion de contenido a subir al **stage**, esta herramienta gestiona muy bien

- Creacion de ramas
- Creacion de stash
- Visualizacion de varios repositorios al tiempo
- Seleccion por Hunk (bloque de codigo)
- Seleccion por linea de codigo

Si se desea que la herramienta externa de **diff** desde el cliente sea VsCode

> Menu>Tools>diff>External Diff/Merge

Agrega los siguientes datos

| CONFIGURACIÓN      | VALOR                                                              |
| ------------------ | ------------------------------------------------------------------ |
| External Diff Tool | `Custom`                                                           |
| Diff Command       | `C:\Users\{username}\AppData\Local\Programs\Microsoft VS Code\Code.exe` |
| Arguments (Diff)   | `--diff --wait "$LOCAL" "$REMOTE"`                                 |
| Merge Tool         | `Custom`                                                           |
| Merge Command      | `C:\Users\{username}\AppData\Local\Programs\Microsoft VS Code\Code.exe` |
| Arguments (Merge)  | `-n --wait "$MERGED"`                                              |
