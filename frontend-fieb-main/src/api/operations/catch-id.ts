import { api } from "@/lib/axios";

export async function catchOperationId(id) {
    const response = await api.get(`/indicador/${id}/operationId`);
    return response.data;
}