import { api } from "@/lib/axios";

type Data = {
    areaId: string;
    name: string
}

export async function createCategory({ areaId, name }: Data) {
    const response = await api.post(`/category/${areaId}`, {
        name
    })

    return response.data
}