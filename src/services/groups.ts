import type { Group } from "@/types"
import { apiClient } from "./apiClient"

export async function fetchGroups(): Promise<Group[]> {
  const { data } = await apiClient.get<Group[]>("/v1/groups")
  return data
}

export async function createGroup(name: string): Promise<Group> {
  const { data } = await apiClient.post<Group>("/v1/groups", { name })
  return data
}
