import { api } from "@/lib/axios";

type Category = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    areaId: string;
    codes: {
        code: {
            id: string;
            name: string;
            type: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }[];
    area: {
        period: {
            id: string;
            year: number;
            open: boolean;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

export async function getCategoryById(id: string) {
    const response = await api.get<Category>(`/category/${id}`)
    return response.data
}