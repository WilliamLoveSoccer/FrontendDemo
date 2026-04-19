import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAlert } from "@/services/alerts"
import type { CreateAlertPayload } from "@/types"

export function useCreateAlert() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateAlertPayload) => createAlert(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] })
    },
  })
}
