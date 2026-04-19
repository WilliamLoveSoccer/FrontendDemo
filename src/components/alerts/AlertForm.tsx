import { useState } from "react"
import { useGroups } from "@/hooks/useGroups"
import { useCreateAlert } from "@/hooks/useCreateAlert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function AlertForm() {
  const { data: groups = [], isLoading: groupsLoading } = useGroups()
  const { mutate: createAlert, isPending, error } = useCreateAlert()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [groupId, setGroupId] = useState<string>("")

  const errorMessage =
    error instanceof Error ? error.message : error ? "Failed to create alert." : null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !groupId) return
    createAlert(
      { title: title.trim(), body: body.trim() || undefined, groupIds: [Number(groupId)] },
      {
        onSuccess: () => {
          setTitle("")
          setBody("")
          setGroupId("")
        },
      }
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Alert</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="alert-title">Title *</Label>
            <Input
              id="alert-title"
              placeholder="Alert title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
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

          <Button type="submit" disabled={isPending || !title.trim() || !groupId}>
            {isPending ? "Sending…" : "Send Alert"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
