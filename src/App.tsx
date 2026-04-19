import { AlertsTable } from "@/components/alerts/AlertsTable"

export function App() {
  return (
    <div className="min-h-svh bg-background">
      <header className="border-b px-6 py-4">
        <h1 className="font-heading text-lg font-medium">Alert Dashboard</h1>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <AlertsTable />
      </main>
    </div>
  )
}

export default App
