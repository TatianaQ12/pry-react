import { api } from "./configs/axiosConfigs"

export const ContractVariableAPI = {
    get: async (payload?: object) => {
        const response = await api.get(
            '/contract/variable', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}