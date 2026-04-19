import { useQuery } from "@tanstack/react-query"
import { fetchAlertStatus } from "@/api/alerts"

export function useAlertStatus(alertId: number | null) {
  return useQuery({
    queryKey: ["alert-status", alertId],
    queryFn: () => fetchAlertStatus(alertId!),
    enabled: alertId !== null,
  })
}
