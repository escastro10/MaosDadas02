import { api } from "@/lib/axios"

export async function createOperation({ indicadorId, type }) {
    const response = await api.post(`/indicador/${indicadorId}/operation`, { type })
    return response.data
}