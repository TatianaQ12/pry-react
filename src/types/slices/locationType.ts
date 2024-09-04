import { ApiStatus } from '../api/status'

export type LocationType = {
  locationSelected: LocationSelectedType
  status: ApiStatus
  countries: Country[]
  regions: Region[]
  provinces: Province[]
  communes: Commune[]
  errorMessage: string |undefined
}

export type LocationSelectedType = {
  country: Country
  region: Region
  province: Province
  commune: Commune
}

export type Country = {
  id: number
  country: string
  status: string
}
export type Region = {
  id: number
  code: string
  region: string
  idcountry: number
  status: string
}

export type Province = {
  id: number
  code: string
  province: string
  idregion: number
  status: string
}

export type Commune = {
  id: number
  code: string
  commune: string
  idprovince: number
  status: string
}