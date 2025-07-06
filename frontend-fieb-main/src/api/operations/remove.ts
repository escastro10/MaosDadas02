import { api } from "@/lib/axios";

export async function removeOperationItem(id: string) {
    await api.delete(`/operation-item/${id}`)
}