import { api } from "@/lib/axios";

type Area = {
    slug: string;
    period: number;
}

type AreaResponse = {
    id: string;
    name: string;
    slug: string;
    period: {
        id: string;
        year: string;
    }
    categories: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        codes: {
            id: string;
            code: {
                id: string;
                name: string;
                type: string;
                createdAt: Date;
                updatedAt: Date;
            }
        }[];
    }[]
}

export async function getAreaBySlug({ slug, period }: { slug: string, period: number }) {
    const response = await api.get<AreaResponse>(`/area/${slug}/${period}`)
    return response.data
}