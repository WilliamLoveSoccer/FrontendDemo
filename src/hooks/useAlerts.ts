import { useQuery } from "@tanstack/react-query"
import { fetchAlerts } from "@/api/alerts"

export function useAlerts(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["alerts", page, pageSize],
    queryFn: () => fetchAlerts(page, pageSize),
  })
}
