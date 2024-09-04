import { api } from "./configs/axiosConfigs"

export const AreaAPI = {
    get: async (payload?: object) => {
        const response = await api.get(
            '/area', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    create: async (data: object) => {
        const response = await api.post(
            '/area', data
        ).then(response => response.data)
            .catch((error) => {
                console.error(error)
                return error.response.data
            })
        return response
    },

    update: async (id: number, data: object) => {
        const response = await api.post(
            `/area/${id}`, data
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    delete: async (id: number) => {
        const response = await api.delete(
            `/area/${id}`
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}