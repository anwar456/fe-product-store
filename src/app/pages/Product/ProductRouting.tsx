import Error404 from '@app/components/Error/Error404'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ProductPage = React.lazy(() => import(`@app/pages/Product/ProductPage`))

export default function ProductRouting() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <React.Suspense>
            <ProductPage />
          </React.Suspense>
        }
      />
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}
