import { useAlertStatus } from "@/hooks/useAlertStatus"
import { TableRow, TableCell } from "@/components/ui/table"
import type { Alert } from "@/types"

export function AlertRow({ alert, onClick }: { alert: Alert; onClick: () => void }) {
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
