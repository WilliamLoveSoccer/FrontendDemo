import { useAlertStatus } from "@/hooks/useAlertStatus"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Alert } from "@/types"

interface StatusDialogProps {
  alert: Alert | null
  onClose: () => void
}

export function StatusDialog({ alert, onClose }: StatusDialogProps) {
  const { data: status, isLoading, error } = useAlertStatus(alert?.id ?? null)

  return (
    <Dialog open={alert !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{alert?.title ?? "Alert Status"}</DialogTitle>
          <DialogDescription>
            Delivery breakdown for this alert
          </DialogDescription>
        </DialogHeader>

        {isLoading && (
          <p className="py-4 text-center text-sm text-muted-foreground">Loading…</p>
        )}

        {error && (
          <p className="py-4 text-center text-sm text-destructive">
            Failed to load delivery status.
          </p>
        )}

        {status && (
          <div className="grid grid-cols-2 gap-3">
            <StatusCard label="Total Recipients" value={status.totalRecipients} variant="muted" />
            <StatusCard label="Sent" value={status.sentCount} variant="success" />
            <StatusCard label="Failed" value={status.failedCount} variant="destructive" />
            <StatusCard label="Pending" value={status.pendingCount} variant="warning" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function StatusCard({
  label,
  value,
  variant,
}: {
  label: string
  value: number
  variant: "muted" | "success" | "destructive" | "warning"
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-border bg-muted/30 p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold tabular-nums">{value}</span>
        <Badge variant={variant}>{label}</Badge>
      </div>
    </div>
  )
}
