import { api } from "@/lib/axios"

export async function addOperationItem({ operationId, indicadorId }) {
    const response = await api.post(`/operation-item`, { operationId, indicadorId })
    return response.data
}