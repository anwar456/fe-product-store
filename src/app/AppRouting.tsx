import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './modules/Protected/ProtectedRoutes'
import Error404 from './components/Error/Error404'

const SigninPage = React.lazy(() => import(`@app/pages/Auth/SigninPage`))
const Index = React.lazy(() => import(`@app/pages/IndexRouting`))

export default function AppRouting() {
  return (
    <Routes>
      <Route path="" element={<Navigate to={'/product'} />} />
      <Route
        path="/signin"
        element={
          <React.Suspense>
            <SigninPage />
          </React.Suspense>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoutes>
            <React.Suspense>
              <Index />
            </React.Suspense>
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
