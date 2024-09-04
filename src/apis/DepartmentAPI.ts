import { api } from "./configs/axiosConfigs"

export const DepartmentAPI = {

    get: async (payload?: object) => {
        const response = await api.get(
            '/department', { params: payload }
        ).then(response => response.data)
            .catch((error) => {
                return error.response.data
            })
        return response
    },
}