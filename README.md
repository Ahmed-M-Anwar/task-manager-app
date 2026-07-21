# Task Manager App

A small task management application built with **Vue 3 (Composition API)** as part of a technical assessment.

## Tech Stack

- **Vue 3** + `<script setup>` (Composition API)
- **Vite** — build tool & dev server
- **Pinia** — state management
- **Vue Router 4** — routing (list + detail pages, lazy-loaded)
- **Tailwind CSS v4** — styling, with custom design tokens (`@theme`)
- **PrimeVue 4** (Aura theme, custom brand preset) — accessible form/UI primitives
- **Axios** — HTTP client (JSONPlaceholder as a mock API)
- **Vitest** + `@vue/test-utils` — unit testing

## Features

- Task list with title, description, status, and due date
- Add / Edit tasks via a modal form
  - Validation: title required, due date must be in the future
- Delete tasks
- Filter by status + search by title (combined, reactive)
- Task detail page (`/tasks/:id`)
- Loading and error states throughout
- Initial data fetched from JSONPlaceholder (`/todos`), enriched with generated
  description/due date fields, then managed client-side via Pinia
  (JSONPlaceholder does not persist writes — this is expected behavior of the mock API)

## Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
\`\`\`bash
git clone <your-repo-url>
cd task-manager-app
npm install
\`\`\`

### Run in development
\`\`\`bash
npm run dev
\`\`\`
App runs at `http://localhost:5173`.

### Run tests
\`\`\`bash
npm run test
\`\`\`

### Build for production
\`\`\`bash
npm run build
npm run preview
\`\`\`

## Folder Structure

\`\`\`
src/
├── api/            # Axios instance + tasksApi (all HTTP calls)
├── assets/
├── components/
│   ├── ui/          # Presentational, domain-agnostic components (BaseCard, StatusBadge, IconButton)
│   └── tasks/        # Domain components (TaskCard, TaskList, TaskForm, TaskFilters)
├── composables/       # useTaskValidation, useTaskFilters — reusable, testable logic
├── router/             # Route definitions (lazy-loaded)
├── stores/              # Pinia store (tasks.js) — state + CRUD actions
├── tests/                # Vitest unit tests
├── utils/                 # dateHelpers, idGenerator
└── views/                  # TaskListView, TaskDetailView
\`\`\`

## Architecture Notes

- **Separation of concerns**: components are presentational, composables hold
  reusable logic, the Pinia store owns state, and the API layer is fully isolated
  from both — swapping the backend later would only touch `src/api/`.
- **`storeToRefs`** is used when destructuring reactive state from the store to
  avoid losing reactivity.
- **Mock API caveat**: JSONPlaceholder returns a fixed response for all writes
  (e.g. every `POST` returns `id: 201`), so local IDs are generated client-side
  and all mutations are reflected in the Pinia store after each simulated request.

## Future Improvements

- Replace JSONPlaceholder with a real backend + persistent storage
- Add optimistic updates with rollback on failure
- Add pagination / virtual scrolling for large task lists
- Add TypeScript for stronger type safety
- Add component-level tests (e.g. `TaskForm` interactions) with `@vue/test-utils`
- Add dark mode (design tokens already support it)

## Screenshots

![Home](<Screenshot (1038).png>) ![Edit](<Screenshot (1039).png>) ![Add](<Screenshot (1040).png>) ![filter](<Screenshot (1041).png>) ![Search](<Screenshot (1042).png>) ![Task Details](<Screenshot (1043).png>)