import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})
//ss
//Custom error handler
const errorHandler = (error:any) => {

  const statusCode = error.response?.status
  console.log('statusCode',statusCode)
  if (statusCode && statusCode !== 401){
    console.error(error)
  }
  return Promise.reject(error)
}

api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})