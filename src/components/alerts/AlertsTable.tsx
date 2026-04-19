import { useState } from "react"
import { useAlerts } from "@/hooks/useAlerts"
import { useAlertStatus } from "@/hooks/useAlertStatus"
import { StatusDialog } from "./StatusDialog"
import { CreateAlertDialog } from "./CreateAlertDialog"
import { CreateGroupDialog } from "./CreateGroupDialog"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, Users } from "lucide-react"
import type { Alert } from "@/types"

const PAGE_SIZE = 10

export function AlertsTable() {
  const [page, setPage] = useState(1)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [alertDialogOpen, setAlertDialogOpen] = useState(false)
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)

  const { data, isLoading, error } = useAlerts(page, PAGE_SIZE)

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 1

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Recent Alerts</CardTitle>
          <CardAction>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setGroupDialogOpen(true)}>
                <Users />
                Create Group
              </Button>
              <Button size="sm" onClick={() => setAlertDialogOpen(true)}>
                <Plus />
                Create Alert
              </Button>
            </div>
          </CardAction>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Sent</TableHead>
                <TableHead className="text-right">Failed</TableHead>
                <TableHead className="text-right">Pending</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Loading…
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-destructive">
                    Failed to load alerts.
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && !error && data?.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    No alerts yet.
                  </TableCell>
                </TableRow>
              )}
              {data?.items.map((alert) => (
                <AlertRow
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                />
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-1.5">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <StatusDialog alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
      <CreateAlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen} />
      <CreateGroupDialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen} />
    </>
  )
}

function AlertRow({ alert, onClick }: { alert: Alert; onClick: () => void }) {
  const { data: status } = useAlertStatus(alert.id)

  return (
    <TableRow
      className="cursor-pointer"
      onClick={onClick}
      title="Click to view delivery status"
    >
      <TableCell className="font-medium">{alert.title}</TableCell>
      <TableCell className="text-muted-foreground">
        {new Date(alert.createdAt).toLocaleString()}
      </TableCell>
      <TableCell className="text-right tabular-nums">
        {status ? (
          <span className="text-emerald-600 dark:text-emerald-400">{status.sentCount}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="text-right tabular-nums">
        {status ? (
          <span className="text-destructive">{status.failedCount}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="text-right tabular-nums">
        {status ? (
          <span className="text-amber-600 dark:text-amber-400">{status.pendingCount}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
    </TableRow>
  )
}
