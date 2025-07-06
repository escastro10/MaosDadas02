import { api } from "@/lib/axios";

type IndiceRemissivo = {
    name: string;
    type: string;
}

export async function createIndiceRemissivo({ name, type }: IndiceRemissivo) {
    await api.post('/indices-remissivos', {
        name,
        type
    })
}