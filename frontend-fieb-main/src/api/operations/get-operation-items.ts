import { api } from "@/lib/axios";

export async function getOperationItems(id: string) {
    const response = await api.get(`/indicador/${id}/operation-items`)
    return response.data
}