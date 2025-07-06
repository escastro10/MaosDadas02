import { api } from "@/lib/axios";


type AddMessage = {
    analiseCriticaId: string;
    message: string;
    userId: string;
}

export async function addMessage({ analiseCriticaId, message, userId }: AddMessage) {

    await api.post(`/analisescriticas/${analiseCriticaId}/message`, {
        message,
        userId
    })

}