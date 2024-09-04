import { api } from "./configs/axiosConfigs"

export const TaskAPI = {
    get: async (payload?: object) => {
        const response = await api.get(
            '/committee/task', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    create: async (data: object) => {
        const response = await api.post(
            '/committee/task', data
        ).then(response => response.data)
            .catch((error) => {
                console.error(error)
                return error.response.data
            })
        return response
    },

    update: async (id: number, data: object) => {
        const response = await api.patch(
            `/committee/task/${id}`, data
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    delete: async (id: number) => {
        const response = await api.delete(
            `/committee/task/${id}`
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    updateOrder: async (data: object) => {
        const response = await api.patch(
            `/committee/task/updateOrder`, data
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}