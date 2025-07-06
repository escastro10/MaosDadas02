import { api } from "@/lib/axios";

type Area = {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    Indicador: {
        id: string;
        pergunta: string;
        value: number;
        type: string;
        isHide: boolean;
        isPriority: boolean;
        hasUpload: boolean;
    }[]
}

export async function getAutoavaliacaoAreaBySlug(slug: string) {

    const response = await api.get<Area>(`/autoavaliacoes/areas/${slug}`)
    return response.data

}