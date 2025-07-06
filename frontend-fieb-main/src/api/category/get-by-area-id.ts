import { api } from "@/lib/axios";

export async function getCategoriesByArea(areaId) {
    const response = await api.get(`/area/${areaId}/categories`);
    return response.data;
}