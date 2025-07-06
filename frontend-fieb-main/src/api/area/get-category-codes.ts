import { api } from "@/lib/axios";

type CategoryCodesResponse = {
    id: string;
    name: string;
    codes: {
        id: string;
        name: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
    }[]
}

export async function getCategoryCodes({ categoryId }: { categoryId: string }) {
    const response = await api.get<CategoryCodesResponse[]>(`/category/${categoryId}/codes`)
    return response.data
}