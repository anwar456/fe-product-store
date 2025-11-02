import Error404 from '@app/components/Error/Error404'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ProductListPage = React.lazy(() => import(`@app/pages/ProductList/ProductListPage`))

const ProductListRouting = () => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <React.Suspense>
            <ProductListPage />
          </React.Suspense>
        }
      />
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}

export default ProductListRouting
