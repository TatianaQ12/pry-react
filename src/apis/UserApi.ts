import { api } from "./configs/axiosConfigs"

export const UserAPI = {
    getUses: async (data?:any) => {
        const response = await api.get(
            '/user',
            {
                params: {
                    ...data
                }
            }
        ).then(response => response.data)
        .catch((error) => {
            console.error(error)
            return error.response.data
        })
        return response
    },
    createUser: async (data: any) => {
        const response = await api.post(
            '/user', 
            {
                ...data
            }
        ).then(response => response.data)
        .catch((error) => {
            console.error(error)
            return error.response.data
        })
        return response
    },
    editUser: async (iduser: number, data: any) => {
        const response = await api.patch(
        `/user/${iduser}`,
        {
            ...data
        }
        ).then(response => response.data)
        .catch((error) => {
            return error.response.data
        })
        return response
    },
    deleteUser: async (iduser: number, idcompany: number) => {
        const response = await api.delete(
        `/user/${iduser}?id_company=${idcompany}`
        ).then(response => response.data)
        .catch((error) => {
            return error.response.data
        })
        return response
        }
}