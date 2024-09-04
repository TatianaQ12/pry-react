import { Tracing } from "trace_events"
import { Role } from "../roles/roleTypes"

export type UserType = {
  status: AuthStatus
  user: User
  errorMessage: string |undefined
}

export type User = {
  id: number,
  email: string
  user_name: string
  n_document: string
  rut_company: string,
  status_confirm: string,
  validation_confirm: string
  status: string,
  role?: Role | null,
  data?: UserData,
  views: UserView[]
  modules: Module[]
}

export type UserData = {
  id?: number
  n_document?: string
  name?: string
  surname?: string
  second_surname?: string
  birth_date?: string
  sexo?: number
  direccion?: string
  iddistrict?: number
  idcharge?: number
  idcompany?: number
  status?: string
}

export type UserView =  {
  id: number
  idviewfront: number
  name: string
  idviewType: number
  viewType: string
  idmodule: number
  module: string
  url_event: string
  type: string
  typeName: string
  icon: string
  idsrole: string
  roles: Roles[]
  status: string
}

export type Module = {
  idmodule?: number
  module: string
  icon: string
  type_module: string
  type_moduleName: string
  view: ViewModule[]
}

export type ViewModule = {
  id: number
  name: string
  type: number
  typeName: string
  icon: string
  url: string
}


export type Roles = {
  id: number
  name: string
}


export enum AuthStatus {
  LOGGING_IN = 'logging_in',
  VERIFYING = 'verifying',
  AUTHENTICATED = 'authenticated',
  NOT_AUTHENTICATED = 'not-authenticated'
}
