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

export async function getTurnoversMedios(categoryId: string) {
    const response = await api.get<TurnoverMedio>(`/indicadores/turnovers-medios/${categoryId}`)
    return response.data
}