import { api } from "@/lib/axios";


type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
}



export async function getUserDetails(email: string) {
    const response = await api.get<User>(`/user/${email}`)
    return response.data
}