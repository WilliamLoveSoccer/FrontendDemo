import { useState } from "react"
import { useCreateGroup } from "@/hooks/useCreateGroup"
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

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGroupDialog({ open, onOpenChange }: CreateGroupDialogProps) {
  const [name, setName] = useState("")
  const { mutate: createGroup, isPending, error } = useCreateGroup()

  const errorMessage =
    error instanceof Error ? error.message : error ? "Failed to create group." : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    createGroup(name.trim(), {
      onSuccess: () => {
        setName("")
        onOpenChange(false)
      },
    })
  }

  function handleOpenChange(next: boolean) {
    if (!next) setName("")
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Add a new recipient group.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="group-name">Name *</Label>
            <Input
              id="group-name"
              placeholder="e.g. Engineering"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? "Creating…" : "Create Group"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
