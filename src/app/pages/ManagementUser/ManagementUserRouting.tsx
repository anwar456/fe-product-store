import Error404 from '@app/components/Error/Error404'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ManagementUserPage = React.lazy(() => import(`@app/pages/ManagementUser/ManagementUserPage`))

export default function ManagementUserRouting() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <React.Suspense>
            <ManagementUserPage />
          </React.Suspense>
        }
      />
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}
