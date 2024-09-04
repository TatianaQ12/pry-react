import { api } from "./configs/axiosConfigs"

export const ModuleAPI = {
  get: async () => {
    const response = await api.get(
      '/viewFront/module'
    ).then(response => response.data)
      .catch((error) => {
        return error.response.data
      })
    return response
  },
  createModule: async (data: any) => {
    const response = await api.post(
        '/viewFront/module', 
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
  editModule: async (idmodule: number, data: any) => {
    const response = await api.patch(
    `/viewFront/module/${idmodule}`,
    {
        ...data
    }
    ).then(response => response.data)
    .catch((error) => {
        return error.response.data
    })
    return response
  },
}