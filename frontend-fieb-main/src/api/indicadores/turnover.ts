import { api } from "@/lib/axios";

type Turnover = {
    admitidos: string
    desligados: string
    efetivoMedio: string
    indicadorId: string
}

export async function createTurnoverMedio({ admitidos, desligados, efetivoMedio, indicadorId }: Turnover) {
    const response = await api.post(`/indicador/turnover-medio/${indicadorId}`, {
        admitidos,
        desligados,
        efetivoMedio
    })
    return response.data
}

export async function createTurnoverAcumulado({ admitidos, desligados, efetivoMedio, indicadorId }: Turnover) {
    const response = await api.post(`/indicador/turnover-acumulado/${indicadorId}`, {
        admitidos,
        desligados,
        efetivoMedio
    })

    return response.data
}
