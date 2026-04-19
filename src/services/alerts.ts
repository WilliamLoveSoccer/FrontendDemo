import type { Alert, AlertStatus, AlertsPage, CreateAlertPayload } from "@/types"
import { apiClient } from "./apiClient"

export async function fetchAlerts(page: number, pageSize: number): Promise<AlertsPage> {
  const { data } = await apiClient.get<AlertsPage>("/v1/alerts", {
    params: { page, pageSize },
  })
  return data
}

export async function createAlert(payload: CreateAlertPayload): Promise<Alert> {
  const { data } = await apiClient.post<Alert>("/v1/alerts", payload)
  return data
}

export async function fetchAlertStatus(alertId: number): Promise<AlertStatus> {
  const { data } = await apiClient.get<AlertStatus>(`/v1/alerts/${alertId}/status`)
  return data
}
