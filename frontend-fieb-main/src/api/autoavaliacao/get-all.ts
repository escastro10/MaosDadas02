import { api } from "@/lib/axios";

type Area = {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}[]

export async function getAutoAvaliacaoAreas() {
    const response = await api.get<Area>('/autoavaliacoes/areas')
    return response.data
}