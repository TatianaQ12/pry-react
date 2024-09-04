import { api } from "./configs/axiosConfigs"

export const ViewAPI = {

    get: async (payload?: object) => {
        const response = await api.get(
            '/viewFront', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    getTypes: async (payload?: object) => {
        const response = await api.get(
            '/viewFront/type', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },

    create: async (data: object) => {
        const response = await api.post(
            '/viewFront', data
        ).then(response => response.data)
            .catch((error) => {
                console.error(error)
                return error.response.data
            })
        return response
    },
}