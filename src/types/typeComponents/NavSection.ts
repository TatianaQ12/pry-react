import { RoutesMap } from '@/types'
import { SvgIconProps } from '@mui/material'

type subrouteAdminType = {
  'name_ruta': string
  location: RoutesMap
  icon: React.ReactElement<SvgIconProps>
}

export type routeAdminType = {
  id: number
  name: string
  location?:RoutesMap
  icon: React.ReactElement<SvgIconProps>
  rutas: subrouteAdminType[]
}