import { RoleUpdate } from '@/types/api/roleAPI.type'
import { api } from './configs/axiosConfigs'

export const RuleAPI = {
  get: async () => {
    const response = await api.get(
      '/role'
    ).then(response => response.data)
      .catch((error) => {
          return error.response.data
      })
    return response
  },
  createRole: async (data: any) => {
    const response = await api.post(
        '/role', 
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
  editRole: async (idrole: number, data: any) => {
    const response = await api.patch(
    `/role/${idrole}`,
    {
        ...data
    }
    ).then(response => response.data)
    .catch((error) => {
        return error.response.data
    })
    return response
  },
  getViewFrontByIdrole: async (IDROLE: number) => {
    const response = await api.get(
      `/viewFront/view/${IDROLE}`
    ).then(response => response.data)
      .catch((error) => {
          return error.response.data
      })
    return response
  },
  getViewFront: async () => {
    const response = await api.get(
      `/viewFront`
    ).then(response => response.data)
      .catch((error) => {
          return error.response.data
      })
    return response
  },
  update: async (data: RoleUpdate) => {
    const response = await api.patch(
      `/viewRole`,{
        ...data
      }
    ).then(response => response.data)
      .catch((error) => {
          return error.response.data
      })
    return response
  }
}