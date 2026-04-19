import { useState } from "react"
import { useGroups } from "@/hooks/useGroups"
import { useCreateAlert } from "@/hooks/useCreateAlert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MultiSelect } from "@/components/ui/multi-select"

interface CreateAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAlertDialog({ open, onOpenChange }: CreateAlertDialogProps) {
  const { data: groups = [], isLoading: groupsLoading } = useGroups()
  const { mutate: createAlert, isPending, error } = useCreateAlert()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [groupIds, setGroupIds] = useState<string[]>([])

  const errorMessage =
    error instanceof Error ? error.message : error ? "Failed to create alert." : null

  function resetForm() {
    setTitle("")
    setBody("")
    setGroupIds([])
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm()
    onOpenChange(next)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || groupIds.length === 0) return
    createAlert(
      { title: title.trim(), body: body.trim() || undefined, groupIds: groupIds.map(Number) },
      {
        onSuccess: () => {
          resetForm()
          onOpenChange(false)
        },
      }
    )
  }

  const groupOptions = groups.map((g) => ({ value: String(g.id), label: g.name }))

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Alert</DialogTitle>
          <DialogDescription>Send an alert to one or more recipient groups.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="alert-title">Title *</Label>
            <Input
              id="alert-title"
              placeholder="Alert title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="alert-body">Body</Label>
            <Textarea
              id="alert-body"
              placeholder="Alert message (optional)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="alert-group">Groups *</Label>
            <MultiSelect
              id="alert-group"
              options={groupOptions}
              value={groupIds}
              onChange={setGroupIds}
              placeholder={groupsLoading ? "Loading groups…" : "Select groups"}
              disabled={groupsLoading}
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim() || groupIds.length === 0}>
              {isPending ? "Sending…" : "Send Alert"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
