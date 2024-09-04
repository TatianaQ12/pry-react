import { api } from "./configs/axiosConfigs"

export const CompanyAPI = {
    getCompanies: async (data?:any) => {
        const response = await api.get(
            '/company',
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
    createCompany: async (data: any) => {
        const response = await api.post(
            '/company', 
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
    editCompany: async (idcompany: number, data: any) => {
        const response = await api.patch(
        `/company/${idcompany}`,
        {
            ...data
        }
        ).then(response => response.data)
        .catch((error) => {
            return error.response.data
        })
        return response
    },
    deleteCompany: async (idcompany: number) => {
        const response = await api.delete(
        `/company/${idcompany}`
        ).then(response => response.data)
        .catch((error) => {
            return error.response.data
        })
        return response
        }
}