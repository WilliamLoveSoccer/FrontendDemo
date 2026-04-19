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
import { Select } from "@/components/ui/select"

interface CreateAlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateAlertDialog({ open, onOpenChange }: CreateAlertDialogProps) {
  const { data: groups = [], isLoading: groupsLoading } = useGroups()
  const { mutate: createAlert, isPending, error } = useCreateAlert()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [groupId, setGroupId] = useState("")

  const errorMessage =
    error instanceof Error ? error.message : error ? "Failed to create alert." : null

  function resetForm() {
    setTitle("")
    setBody("")
    setGroupId("")
  }

  function handleOpenChange(next: boolean) {
    if (!next) resetForm()
    onOpenChange(next)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !groupId) return
    createAlert(
      { title: title.trim(), body: body.trim() || undefined, groupIds: [Number(groupId)] },
      {
        onSuccess: () => {
          resetForm()
          onOpenChange(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Alert</DialogTitle>
          <DialogDescription>Send an alert to a recipient group.</DialogDescription>
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
            <Label htmlFor="alert-group">Group *</Label>
            <Select
              id="alert-group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              disabled={groupsLoading}
              required
            >
              <option value="">
                {groupsLoading ? "Loading groups…" : "Select a group"}
              </option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </Select>
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !title.trim() || !groupId}>
              {isPending ? "Sending…" : "Send Alert"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
