TaskFlow (Taskzen)
TaskFlow is a lightweight task manager built with Vite + React + TypeScript and shadcn/ui primitives. It provides task creation, editing, filtering, tags, priorities, and toasts.

Features

Create, update and delete tasks (see addTask, updateTask, deleteTask)
Persistent in-memory task list and ordering (see TaskProvider)
UI components: header, task list, filters, stats and dialogs (see src/components)
Toast notifications (Toaster in src/components/ui/toaster.tsx)
Quick links

Project config: package.json
HTML entry: index.html
App entry: main.tsx — renders App
Root app: App in App.tsx
Main page: Index in Index.tsx
Task context: TaskProvider and helpers in TaskContext.tsx
UI toaster: Toaster in toaster.tsx
UI toast primitives: toast.tsx
Getting started
```sh
# Install dependencies (npm) and run dev server
npm install
npm run dev



(If you prefer Bun: run `bun install` then `bun run dev`.)

Available scripts (from package.json)
- npm run dev — start Vite dev server
- npm run build — build production bundle
- npm run build:dev — build in development mode
- npm run preview — preview production build
- npm run lint — run ESLint

Project structure (high level)
- public/ — static assets
- src/
  - main: [main.tsx](http://_vscodecontentref_/9) (bootstraps `App`)
  - pages: [Index.tsx](http://_vscodecontentref_/10)
  - contexts: [TaskContext.tsx](http://_vscodecontentref_/11)
  - components: src/components (Header, TaskCard, TaskDialog, TaskFilters, TaskList, TaskStats, ui/)
  - lib: src/lib/utils.ts
- config: [vite.config.ts](http://_vscodecontentref_/12), [tailwind.config.ts](http://_vscodecontentref_/13)

Notes
- Routing is handled by react-router in `App`.
- React Query is configured at app root: see `App` and `new QueryClient()`.
- Tailwind animations and utilities are configured in [tailwind.config.ts](http://_vscodecontentref_/14).

If you want this README written to the repository file, add the content above to README.md.