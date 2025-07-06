import { api } from "@/lib/axios";


export type Autoavaliacao = {
    id: string;
    indicadorId: string;
    indicador: {
        id: string;
        pergunta: string;
    }
    messages: {
        id: string;
        message: string;
        user: {
            id: string;
            name: string;
            email: string
        },
        createdAt: string;
    }[]
}

export async function findAutoavaliacaoByIndicador(indicadorId: string) {
    const response = await api.get<Autoavaliacao>(`/analisescriticas/indicador/${indicadorId}`);
    return response.data;
}