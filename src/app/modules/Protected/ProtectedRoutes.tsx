import { getItem } from '@app/helpers/localstorage.helper'
import React, { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
  path?: string
}

export const AuthCheck = (): any => {
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
  const isAuthenticated = AuthCheck() // get from state
  // const userHasRequiredRole = true // get from state loggedin user

  if (isAuthenticated) {
    return children
  }

  // if (isAuthenticated && !userHasRequiredRole) {
  //   return <p className="text-danger">Access Denied</p>
  // }

  return <Navigate to={'/signin'} />
}

export default ProtectedRoutes
