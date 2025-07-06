import { api } from "@/lib/axios";

type UpdateValue = {
    id: string;
    value: number;
}

export async function UpdateValue({ id, value }: UpdateValue) {
    await api.put(`/indicador/${id}`, { value });
}