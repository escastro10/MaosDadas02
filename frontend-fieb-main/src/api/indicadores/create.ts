import { api } from "@/lib/axios";

export type IndicadorType = {
    pergunta: string;
    type: string;
    isPriority: boolean;
    categoryId: string;
    hasUpload: boolean;
    autoAvaliacaoAreaId?: string;
    draft?: boolean;
}

export async function createIndicador({ pergunta, type, isPriority, categoryId, hasUpload, autoAvaliacaoAreaId }: IndicadorType) {
    const response = await api.post('/indicador', {
        pergunta,
        type,
        isPriority,
        categoryId,
        hasUpload,
        autoAvaliacaoAreaId
    })

    return response.data
}