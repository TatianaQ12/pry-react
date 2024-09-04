import { api } from "./configs/axiosConfigs"

export const AuthAPI = {
   login: async (user_name: string, password: string, rut: string) => {
      const response = await api.post(
         '/auth/login',
         {
            rut,
            password,
            user_name,
         }
      )
         .then(response => response.data.data)
         .catch((error) => {
               return error.response.data
         })
      return response
   },
   refresh: async (token: string) => {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      const response = await api.post(
         '/auth/refresh',
      ).then(response => response.data)
         .catch((error) => {
               return error.response.data
         })
      return response
   },
   logout: async () => {
      const response = await api.post(
         '/auth/logout'
      ).then(response => response.data)
         .catch((error) => {
            return error.response.data
         })
      return response
   },
   verifyToken: async (token) => {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      const response = await api.get(
         '/auth/validateToken',
      ).then(response => response.data)
         .catch((error) => {
               return error.response.data
         })
      return response
   },
   recoveryPass: async (perfil: number, rut: string, email: string) => {
      const response = await api.post(
         '/auth/resend_credentials', {
         iduser_type: perfil,
         rut: rut,
         email: email
      }
      ).then(response => response.data)
         .catch((error) => {
            return error.response.data
         })
      return response
   },
   credentials_params: async (perfil: number, rut: string) => {
      const response = await api.get(
         '/auth/credentials_params', {
         params: {
            iduser_type: perfil,
            rut: rut,
         }
      }
      ).then(response => response.data)
         .catch((error) => {
            return error.response.data
         })
      return response
   },
}
