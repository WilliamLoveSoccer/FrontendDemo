export interface Group {
  id: number
  name: string
}

export interface Alert {
  id: number
  title: string
  createdBy: string
  createdAt: string
}

export interface AlertStatus {
  totalRecipients: number
  sentCount: number
  failedCount: number
  pendingCount: number
}

export interface AlertsPage {
  items: Alert[]
  total: number
  page: number
  pageSize: number
}

export interface CreateAlertPayload {
  title: string
  body?: string
  createdBy?: string
  groupIds: number[]
}
