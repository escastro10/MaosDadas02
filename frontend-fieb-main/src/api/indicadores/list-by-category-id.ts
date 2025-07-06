import { api } from "@/lib/axios";

type Indicador = {
    id: string;
    pergunta: string;
    value: number;
    type: string;
    isHide: boolean;
    qualitativo: string;
    question: string;
    isPriority: boolean;
    hasUpload: boolean;
    operation: boolean;
    campo1: string | null;
    campo2: string | null;
    ordem: number;
    analises_criticas: {
        messages: {
            id: string;
            message: string;
        }[]
    },
    operations: {
        id: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        indicadorId: string;
        campos: {
            id: string;
            operationId: string;
            indicadorId: string;
            createdAt: Date;
            updatedAt: Date;
            indicador: {
                id: string;
                pergunta: string;
                value: number;
            }
        }[];
    }[],
    turnoverMedio: {
        id: string;
        indicador: {
            id: string;
            pergunta: string;
            value: number;
            type: string;
            isHide: boolean;
            isPriority: boolean;
            hasUpload: boolean;
        }
    },

    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
}

export async function listIndicadoresByCategoryId(categoryId: string) {
    const response = await api.get<Indicador[]>(`/indicadores/${categoryId}`)
    return response.data
}