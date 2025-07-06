import { api } from "@/lib/axios";

export async function getIndices() {
    const response = await api.get('/indices-remissivos');
    return response.data;
}