import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { StatusDialog } from "./StatusDialog"
import { useAlertStatus } from "@/hooks/useAlertStatus"
import type { Alert, AlertStatus } from "@/types"

vi.mock("@/hooks/useAlertStatus")

const mockUseAlertStatus = vi.mocked(useAlertStatus)

const alert: Alert = {
  id: 1,
  title: "Test Alert",
  createdBy: "user1",
  createdAt: "2024-01-01T00:00:00Z",
}

const status: AlertStatus = {
  totalRecipients: 100,
  sentCount: 80,
  failedCount: 10,
  pendingCount: 10,
}

describe("StatusDialog", () => {
  beforeEach(() => vi.clearAllMocks())

  it("is not visible when alert is null", () => {
    mockUseAlertStatus.mockReturnValue({ data: undefined, isLoading: false, error: null } as never)
    render(<StatusDialog alert={null} onClose={vi.fn()} />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("displays the alert title when open", () => {
    mockUseAlertStatus.mockReturnValue({ data: undefined, isLoading: false, error: null } as never)
    render(<StatusDialog alert={alert} onClose={vi.fn()} />)
    expect(screen.getByText("Test Alert")).toBeInTheDocument()
  })

  it("shows loading state", () => {
    mockUseAlertStatus.mockReturnValue({ data: undefined, isLoading: true, error: null } as never)
    render(<StatusDialog alert={alert} onClose={vi.fn()} />)
    expect(screen.getByText("Loading…")).toBeInTheDocument()
  })

  it("shows error message", () => {
    mockUseAlertStatus.mockReturnValue({ data: undefined, isLoading: false, error: new Error("fail") } as never)
    render(<StatusDialog alert={alert} onClose={vi.fn()} />)
    expect(screen.getByText("Failed to load delivery status.")).toBeInTheDocument()
  })

  it("shows status cards with correct values", () => {
    mockUseAlertStatus.mockReturnValue({ data: status, isLoading: false, error: null } as never)
    render(<StatusDialog alert={alert} onClose={vi.fn()} />)
    expect(screen.getByText("100")).toBeInTheDocument()
    expect(screen.getByText("80")).toBeInTheDocument()
    expect(screen.getAllByText("10")).toHaveLength(2)
  })

  it("calls onClose when dismissed with Escape", async () => {
    const user = userEvent.setup()
    mockUseAlertStatus.mockReturnValue({ data: undefined, isLoading: false, error: null } as never)
    const onClose = vi.fn()
    render(<StatusDialog alert={alert} onClose={onClose} />)
    await user.keyboard("{Escape}")
    expect(onClose).toHaveBeenCalledOnce()
  })
})
