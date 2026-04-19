import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createGroup } from "@/api/groups"

export function useCreateGroup() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) => createGroup(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] })
    },
  })
}
