import axios from "axios"

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://localhost:7100",
  headers: { "Content-Type": "application/json" },
})
