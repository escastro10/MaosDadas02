import { api } from "@/lib/axios";

type GetAreaProps = {
    periodId: string | null;
}
type AreaData = {
    id: string;
    name: string;
    slug: string;
    iconName: string;
    period: {
        id: string;
        year: number;
    },
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        areaId: string;
        indicadores: {
            id: string;
            pergunta: string;
            value: number;
            type: string;
            isHide: boolean;
        }[]
    }[];
}

export async function getAreasByPeriod({ periodId }: GetAreaProps) {
    const response = await api.get<AreaData[]>(`/areas/${periodId}`);
    return response.data;
}