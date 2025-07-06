import { api } from "@/lib/axios";

type PeriodsProps = {
    id: string;
    year: number;
    open: boolean;
}


export async function getPeriods() {
    const response = await api.get<PeriodsProps[]>('/periods')

    return response.data
}