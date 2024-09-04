import { ApiStatus } from "../api/status";

export type UserType = {
    status: ApiStatus,
    users: User[],
    errorMessage: string | undefined,
    selectedUser: User
}

export type User = {
    id: number,
    iduser: number,
    name: string, 
    surname: string,
    idcharge: number,
    idcompany: number,
    idrole: number,
    user_name: string,
    n_document: string,
    email: string,
    role: number
}