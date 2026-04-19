# FrontendDemo — Alert Management Dashboard

A React SPA for creating and monitoring alerts sent to recipient groups. Users can paginate through alerts, create new ones, manage groups, and track delivery status (sent / failed / pending).

**Note: Since backend project doesn't support sending alerts to end users, so the alert recipients, sent, pending, failed status will always be 0.**

---

## Tech Stack

| Layer                | Library                              |
| -------------------- | ------------------------------------ |
| UI                   | React 19, TypeScript 5               |
| Build                | Vite 7                               |
| Styling              | Tailwind CSS 4, shadcn/ui, Radix UI  |
| Server state         | TanStack React Query 5               |
| Table                | TanStack React Table 8               |
| HTTP                 | Axios                                |
| Testing              | Vitest, React Testing Library, jsdom |
| Linting / formatting | ESLint 9, Prettier 3                 |

---

## Project Structure

```
src/
├── main.tsx                  # App entry point — sets up QueryClient and ThemeProvider
├── App.tsx                   # Root component — renders the alert dashboard layout
├── index.css                 # Global styles
│
├── components/
│   ├── alerts/
│   │   ├── AlertsTable.tsx       # Paginated alert list (main view)
│   │   ├── AlertRow.tsx          # Individual alert row
│   │   ├── CreateAlertDialog.tsx # Form to create a new alert
│   │   ├── CreateGroupDialog.tsx # Form to create a recipient group
│   │   ├── StatusDialog.tsx      # Delivery status modal (sent/failed/pending)
│   │   └── StatusDialog.test.tsx # Unit tests for StatusDialog
│   └── ui/                   # shadcn/ui primitives (button, dialog, table, etc.)
│
├── hooks/
│   ├── useAlerts.ts          # Fetch paginated alert list
│   ├── useAlertStatus.ts     # Poll delivery status for a single alert
│   ├── useCreateAlert.ts     # Mutation — create alert
│   ├── useCreateGroup.ts     # Mutation — create group
│   └── useGroups.ts          # Fetch all groups
│
├── services/
│   ├── apiClient.ts          # Axios instance (base URL, headers)
│   ├── alerts.ts             # Alert API calls
│   └── groups.ts             # Group API calls
│
├── types/
│   └── index.ts              # Shared TypeScript interfaces
│
├── lib/
│   └── utils.ts              # Helper utilities (cn, etc.)
│
└── test/
    └── setup.ts              # Vitest global setup (jsdom mocks)
```

---

## Prerequisites

- **Node.js** 18 or later
- A running backend API at `http://localhost:7100` (or configure `VITE_API_URL`)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API URL (optional)

By default the app points to `http://localhost:7100`. Override it with an environment variable:

```bash
# .env.local
VITE_API_URL=http://your-api-host:port
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` with hot module replacement enabled.

---

## Available Scripts

| Script              | Description                                         |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server with HMR                  |
| `npm run build`     | Type-check then compile a production bundle         |
| `npm run preview`   | Serve the production bundle locally                 |
| `npm run lint`      | Run ESLint across the project                       |
| `npm run format`    | Auto-format all `.ts` / `.tsx` files with Prettier  |
| `npm run typecheck` | Run TypeScript type-checking without emitting files |
| `npm test`          | Run unit tests with Vitest                          |

---

## Running Unit Tests

Tests use **Vitest** with **React Testing Library** in a jsdom environment.

```bash
# Run all tests (watch mode)
npm test

# Run once and exit
npx vitest run

# With coverage
npx vitest run --coverage
```

### Test structure

- Test files live alongside the component they test and use the `.test.tsx` extension.
- Global setup (jsdom mocks for `window.matchMedia` and `ResizeObserver`) is in [src/test/setup.ts](src/test/setup.ts).
- The only current test suite is [src/components/alerts/StatusDialog.test.tsx](src/components/alerts/StatusDialog.test.tsx), which covers:
  - Dialog visibility based on whether an alert is selected
  - Loading state rendering
  - Error state rendering
  - Correct display of sent / failed / pending counts
  - Closing the dialog with the Escape key

### Writing new tests

Place a `ComponentName.test.tsx` file next to the component:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Expected text")).toBeInTheDocument();
  });
});
```

---

## Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Components are installed into `src/components/ui/`.

---

## API Overview

See [API_INTEGRATION.md](API_INTEGRATION.md) for full request/response examples.

| Method | Endpoint                        | Description                      |
| ------ | ------------------------------- | -------------------------------- |
| `GET`  | `/v1/groups`                    | List all recipient groups        |
| `POST` | `/v1/groups`                    | Create a group                   |
| `GET`  | `/v1/alerts?page=1&pageSize=10` | List alerts (paginated)          |
| `POST` | `/v1/alerts`                    | Create an alert                  |
| `GET`  | `/v1/alerts/:id/status`         | Get delivery status for an alert |
