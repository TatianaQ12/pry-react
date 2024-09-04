import { RoutesMap } from '@/types/common/common'

export enum Role {
  SUPER_ADMIN = 'SUPERADMIN',
  ADMINISTRADOR = 'ADMINISTRADOR',
  SUPERVISOR = 'SUPERVISOR',
  VENDEDOR = 'VENDEDOR',
  TRABAJADOR = 'TRABAJADOR'
}

export const ROUTES_FOR_ADMIN = [
  {
    module: RoutesMap.HOME,
    navigators: []
  },
]