import { ApiStatus } from '../api/status'

export type CustomerType = {
  customers: Customer[]
  requests: Request[]
  status: ApiStatus
  errorMessage: string |undefined
}

export type Customer = {
  id: number
  name: string
  rut: string
  date_birth: string
  mail: string
  cell_phone: string
  address: string
}

export type Request = {
  id: number
  name: string
  rut: string
  date_birth: string
  email: string
  address: string
  idcomune: number
  commune: string
  province: string
  idregion: number
  region: string
  idcountry: number
  country: string
  idspecialty: number
  specialty: string
  idcaption: number
  caption: string
  validation_status: string
  status: string
}