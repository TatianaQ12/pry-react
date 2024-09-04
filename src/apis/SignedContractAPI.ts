import { api } from "./configs/axiosConfigs"

export const SignedContractAPI = {
    get: async (payload?: object) => {
        const response = await api.get(
            '/contract/signed', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    create: async (data: object) => {
        const response = await api.post(
            '/contract/signed', data
        ).then(response => response.data)
            .catch((error) => {
                console.error(error)
                return error.response.data
            })
        return response
    },

    update: async (id: number, data: object) => {
        const response = await api.patch(
            `/contract/signed/${id}`, data
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    delete: async (id: number) => {
        const response = await api.delete(
            `/contract/signed/${id}`
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}