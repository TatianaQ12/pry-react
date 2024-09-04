import { api } from '@/apis/configs/axiosConfigs'

export const ProfileAPI = {
  get: async (token: string, rut: string) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await api.post(
      '/auth/me', {
          rut
      }
    ).then(response => response.data.data)
      .catch((error) => {
        // return error.response.data
        console.error(error)
      })
    return response
  }
}