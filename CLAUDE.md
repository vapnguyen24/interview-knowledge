# Interview Q&A Knowledge Base

## Role
You are a senior frontend engineer maintaining this project.

## Overview
A static, portfolio-ready technical interview Q&A knowledge base.
Built with **HTML + CSS + Vanilla JavaScript (ES modules)**. No frameworks, no build step.

---

## Running Locally

```bash
node server.js        # starts at http://localhost:8080
```

`server.js` uses Node.js built-in `http`, `fs`, and `path` — no npm install required.

---

## File Structure

```
project-interview/
├── index.html
├── server.js
├── css/
│   └── styles.css
└── js/
    ├── app.js          ← main application logic
    ├── data.js         ← imports all workspaces and re-exports
    ├── i18n.js         ← EN/VI translation system
    ├── markdown.js     ← custom markdown parser
    └── projects/
        ├── tech-stack/
        │   ├── javascript-fundamentals.js
        │   ├── react-concepts.js
        │   ├── css-layout.js
        │   └── system-design-frontend.js
        └── screen-casting/
            ├── screen-casting-webrtc.js
            ├── screen-casting-flutter.js
            └── screen-casting-performance.js
```

---

## Data Model

### Workspace (top-level, shown in sidebar)

```js
{
  id: string,
  title: string,
  description: string,
  type: "company" | "personal",
  stacks: Stack[]
}
```

### Stack (tech tab within a workspace)

```js
{
  id: string,
  title: string,          // shown as tab label
  tech: string[],         // tech badges (unused in UI currently)
  qas: QA[]
}
```

### QA item

```js
{
  id: string,
  question: { en: string, vi: string },
  answer:   { en: string, vi: string },   // markdown format
  level: "basic" | "intermediate" | "advanced",
  tags: string[]
}
```

> Answers are written in Markdown. Technical terms (code, API names, library names) stay in English even in the `vi` field.

---

## Architecture

### Navigation hierarchy

```
Workspace (sidebar)
  └── Stack (tab bar)
        └── QA cards (main content)
```

### State (`app.js`)

```js
const state = {
  activeWorkspaceId: null,   // persisted to localStorage("lastWorkspace")
  activeStackId: null,       // persisted to localStorage("lastStack")
  searchQuery: "",
  activeLevel: "all",
  activeTags: new Set(),
  expandedIds: new Set(),    // open Q&A cards
  favoriteIds: new Set(),    // persisted to localStorage("favorites")
  showFavoritesOnly: false,
};
```

### Key functions (`app.js`)

| Function | Purpose |
|----------|---------|
| `init()` | Bootstrap — theme, lang, render sidebar, restore last session |
| `renderWorkspaceList()` | Populate sidebar `<ul>` |
| `loadWorkspace(id)` | Switch active workspace, render stack tabs |
| `renderStackTabs(ws)` | Render tech stack tab buttons |
| `loadStack(ws, stackId)` | Switch active stack, reset filters, render Q&As |
| `renderTagFilter(stack)` | Build tag pill buttons from stack QA tags |
| `renderQaList()` | Filter + render all QA cards |
| `toggleExpand(id)` | Expand/collapse a QA card answer |
| `toggleFavorite(id)` | Star/unstar + persist to localStorage |

### i18n (`i18n.js`)

- `t(key)` — returns translated string for current language
- `setLang("en"|"vi")` — switches language, persists, updates DOM
- `applyStaticTranslations()` — applies `data-i18n` / `data-i18n-attr` attributes in HTML
- Dynamic text in `app.js` uses `t()` and `langText(field)` (reads `field.en` or `field.vi`)

### Markdown parser (`markdown.js`)

Supports: `##` headings, `**bold**`, `*italic*`, `` `code` ``, fenced code blocks, unordered lists, tables, `---` hr, paragraphs, `[text](url)` links.

- `parseMarkdown(md)` → HTML string
- `highlightKeyword(html, keyword)` → wraps matches in `<mark>`

---

## Adding Content

### Add a new workspace

1. Create a folder: `js/projects/<workspace-slug>/`
2. Create stack files inside it (see pattern below)
3. Import stacks in `js/data.js`
4. Add workspace object to the `workspaces` array in `js/data.js`

### Add a new stack file

```js
// js/projects/<workspace>/<stack-name>.js
export const myStack = {
  id: "my-stack",
  title: "Stack Title",
  tech: ["Tech1", "Tech2"],
  qas: [
    {
      id: "unique-id",
      question: { en: "...", vi: "..." },
      answer:   { en: `## Heading\n\nBody text`, vi: `## Tiêu đề\n\nNội dung` },
      level: "basic",         // "basic" | "intermediate" | "advanced"
      tags: ["tag1", "tag2"],
    },
  ],
};
```

### Register in `data.js`

```js
import { myStack } from "./projects/<workspace>/my-stack.js";

export const workspaces = [
  {
    id: "my-workspace",
    title: "My Workspace",
    description: "...",
    type: "company",           // "company" | "personal"
    stacks: [myStack],
  },
  // ...
];
```

---

## UI Features

| Feature | Implementation |
|---------|---------------|
| Dark / light mode | `data-theme` on `<html>`, CSS variables, persisted |
| EN / VI toggle | `lang-toggle` button → `setLang()`, persisted |
| Search | Filters `langText(qa.question)` + `langText(qa.answer)` |
| Level filter | `<select>` → `state.activeLevel` |
| Tag filter | Dynamic pill buttons per stack |
| Favourites | Star button → `state.favoriteIds` → localStorage |
| Expand/collapse | `.qa-answer.expanded` + max-height CSS transition |
| Keyword highlight | `<mark>` injected via `highlightKeyword()` |
| Last session restore | `lastWorkspace` + `lastStack` from localStorage |

---

## Constraints

- No React, Vue, or any framework
- No build step — runs directly from `node server.js`
- ES modules (`type="module"`) — must be served over HTTP (not `file://`)
- Data is never hardcoded in HTML — always in JS files under `js/projects/`
- Technical terms in answers remain in English even in Vietnamese translations
