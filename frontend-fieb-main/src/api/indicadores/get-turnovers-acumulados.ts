import { api } from "@/lib/axios";


type TurnoverMedio = {
    id: string;
    indicadorId: string;
    admitidos: string;
    desligados: string;
    efetivoMedio: string;
    createdAt: Date;
    updatedAt: Date;
}[];

export async function getTurnoversAcumulados(categoryId: string) {
    const response = await api.get<TurnoverMedio>(`/indicador/turnovers-acumulados/${categoryId}`)
    return response.data
}