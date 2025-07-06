import { api } from "@/lib/axios";

type Indicador = {
    id: string;
    pergunta: string;
    value: number;
    type: string;
    qualitativo: string;
    question: boolean;
    isHide: boolean;
    isPriority: boolean;
    hasUpload: boolean;
    operation: boolean;
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
    OperationItems: {
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
}

export async function getIndicadorById(id: string) {
    const response = await api.get<Indicador>(`/indicador/${id}`)
    return response.data
}