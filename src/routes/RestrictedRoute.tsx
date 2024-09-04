import { useAuthStore } from '@/hooks'
import { AuthStatus, RoutesMap } from '@/types'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface IRestrictedRouteProps {
  pathRequired: RoutesMap
}

export const RestrictedRoute = (props: IRestrictedRouteProps) => {
  const { pathRequired } = props
  //Hooks
  const { user, status } = useAuthStore()
  const location = useLocation()
  const hasAccess = user?.views?.some(view => pathRequired.includes(view?.url_event))
  return (
    hasAccess
      ?
      <Outlet />
      :
      status === AuthStatus.AUTHENTICATED
        ? <Navigate to="/404" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}
