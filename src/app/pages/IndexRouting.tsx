import AppLayout from '@app/modules/layouts/AppLayout/AppLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const AdminProductPage = React.lazy(() => import(`@app/pages/Admin/AdminProductPage`))

export default function IndexRouting() {
  return (
    <Routes>
      <Route path="" element={<AppLayout />}>
        <Route
          path="product/*"
          element={
            <React.Suspense>
              <AdminProductPage />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <>
              <h3>ERROR 404</h3>
            </>
          }
        ></Route>
      </Route>
    </Routes>
  )
}
