import Error404 from '@app/components/Error/Error404'
import ErrorAccesDenied from '@app/components/Error/ErrorAccesDenied'
import { MENU } from '@app/config/menu.config'
import { getItem } from '@app/helpers/localstorage.helper'
import { usePermission } from '@app/hook/permission.hook'
import React, { JSX, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

interface Props {
  children: JSX.Element
  path?: string
}

export const AuthCheck = (): boolean => {
  let auth = false
  const userLoggedIn = getItem('credentials')

  if (userLoggedIn) {
    const prevAccepted = getItem('accepted')
    if (prevAccepted) {
      auth = false
      localStorage.clear()
      window.location.reload()
    } else {
      auth = true
    }
  }
  return auth
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const { authUser } = useSelector((state: any) => state.auth)
  const { checkingPermissionAccess } = usePermission()
  const [roleAccessCheck, setUserHasRequiredRole] = useState<boolean | null>(null)
  const [notFound, setNotFound] = useState(false)
  const isAuthenticated = AuthCheck()
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    let matchedMenu = MENU?.find((menu: any) => menu?.path === path)

    if (!matchedMenu && path.startsWith('/product-list/detail')) {
      matchedMenu = MENU.find((menu: any) => menu?.path === '/product-list/detail')
    }

    if (!matchedMenu) {
      setNotFound(true)
      return
    }

    setNotFound(false)
    setUserHasRequiredRole(
      checkingPermissionAccess({
        permissionId: authUser?.permissionId,
        id: matchedMenu.id,
        access: 'view',
      }),
    )
  }, [location.pathname, MENU, authUser])


  if (!isAuthenticated) {
    return <Navigate to="/signin" />
  }

  if (notFound) {
    return <Error404 />
  }

  if (roleAccessCheck === false) {
    return <ErrorAccesDenied />
  }

  return children
}

export default ProtectedRoutes
