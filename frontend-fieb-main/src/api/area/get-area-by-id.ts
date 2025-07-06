import { api } from "@/lib/axios";

type Area = {
    id: string;
    name: string;
    period: {
        id: string;
        year: number;
        open: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        areaId: string;
    }[];
}

export async function getAreaById({ areaId }: { areaId: string }) {
    const { data } = await api.get<Area>(`/area/${areaId}`);
    return data;
}