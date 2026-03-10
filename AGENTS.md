# AGENTS.md — Guía de contexto global para el agente

> Este archivo es leído automáticamente por el agente AI al inicio de cada conversación en este repositorio. Define las convenciones, herramientas y reglas que **SIEMPRE** deben seguirse, sin excepción.

---

## 📦 Package Manager

**SIEMPRE usar `pnpm`**. Nunca usar `npm` ni `yarn` en este proyecto.

```bash
# ✅ Correcto
pnpm install
pnpm add <package>
pnpm run <script>
pnpm generate-readme

# ❌ Incorrecto
npm install
yarn add
```

---

## 🌿 Git — Branches

**SIEMPRE leer y aplicar el skill:** `.agents/skills/git-branching/SKILL.md`

---

## ✍️ Git — Commits

**SIEMPRE leer y aplicar el skill:** `.agents/skills/git-commits/SKILL.md`

---

## 🔑 Reglas generales para el agente

1. **Leer skills relevantes** antes de ejecutar cualquier acción de git
2. **Usar `pnpm`** para todos los comandos de Node.js
3. **Respetar el formato de branches y commits** siempre, aunque no sea explícitamente pedido
4. **Verificar el branch actual** antes de crear uno nuevo
