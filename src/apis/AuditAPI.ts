import { api } from "./configs/axiosConfigs"

export const AuditAPI = {
    get: async (payload?: object) => {
        const response = await api.get(
            '/audit', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    create: async (data: object) => {
        const response = await api.post(
            '/audit', data
        ).then(response => response.data)
            .catch((error) => {
                console.error(error)
                return error.response.data
            })
        return response
    },

    update: async (id: number, data: object) => {
        const response = await api.patch(
            `/audit/${id}`, data
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    delete: async (id: number) => {
        const response = await api.delete(
            `/audit/${id}`
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}