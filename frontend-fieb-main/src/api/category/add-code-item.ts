import { api } from "@/lib/axios";

type Data = {
    categoryId: string,
    codeId: string
}

export async function addCodeIem({ categoryId, codeId }: Data) {
    await api.post(`/category/${categoryId}/code`, {
        codeId
    })
}   