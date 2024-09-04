import { RoutesMap } from '@/types'

export type MenuOptionsType = {
  label: string
  icon: string
  route?: RoutesMap
}

export const MENU_OPTIONS: MenuOptionsType[] = [
  {
    label: 'Inicio',
    icon: 'eva:home-fill',
    route: RoutesMap.RULES
  },
  {
    label: 'Cambiar contraseña',
    icon: 'eva:person-fill',
  },
]
