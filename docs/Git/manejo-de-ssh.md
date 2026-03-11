---
sidebar_position: 4
---

# Manejo de SSH

Un uso muy habitual en las empresas es tener alojados sus repositorios, si bien el metodo de obtener una repositio por **Http** es utilizado no es el mas recomendable, siempre debe de intentarse hacer por medio de **SSH**, para eliminar muchos pasos intermedios en medio de nuestras confirmaciones

## Windows

Para llegar al sitio donde se encuentras nuestras llaves

> (Win + R) > `.ssh`

### Generar clave

Caracteristicas de tokens SSH:

- Cada token SSH se compone de Email y password
  - el password es opcional, si se indica, siempre sera solicitado al momento de hacer las operaciones
- Solo se puede registrar un token SSH por Host Remoto

`Comando recomendado via ed25519`

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

`Luego te pedirá los datos`

```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key: >> $NameSSH

Enter passphrase (empty for no passphrase): >> $Password
```

| var         | descripcion                                      |
| ----------- | ------------------------------------------------ |
| `$NameSSH`  | Nombre de nuestra nueva clave publica en fichero |
| `$Password` | Se puede dejar en blanco, para no ponerla        |

---

### Archivo de configuracion

Para los casos donde se necesiten manejar diferentes host o organizaciones, Se debe de crear un archivo `config` en el directorio `.ssh` sin extensión en la cual se indica

`config`

```text
# Default GitHub user
Host github.com
 HostName github.com
 PreferredAuthentications publickey
 IdentityFile ~/.ssh/id_rsa

# Default GitLab user
Host gitlab.com
 HostName gitlab.com
 PreferredAuthentications publickey
 IdentityFile ~/.ssh/id_rsa

# enterprise GitHub user
Host enterprise-github.com
 HostName github.com
 PreferredAuthentications publickey
 IdentityFile ~/.ssh/id_rsa_enterprise
```

#### Default GitHub user

```bash
git clone git@github.com:user/repositorio.git
```

Esta instruccion usa **git@github.com** como host, los cual usaria la definicion

```bash
Host github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa
```

#### Empresa GitHub user

```bash
git clone git@enterprise-github.com:empresa/repositorio.git
```

Esta instruccion usa **enterprise-github.com** como host, los cual usaria la definicion

```bash
Host enterprise-github.com
  HostName github.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_enterprise
```
