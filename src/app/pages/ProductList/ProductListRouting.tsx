import Error404 from '@app/components/Error/Error404'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ProductListPage = React.lazy(() => import(`@app/pages/ProductList/ProductListPage`))
const ProductListDetailPage = React.lazy(() => import(`@app/pages/ProductList/ProductListDetailPage`))

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
      <Route
        path="detail/:id"
        element={
          <React.Suspense>
            <ProductListDetailPage />
          </React.Suspense>
        }
      />
      <Route path="*" element={<Error404 />}></Route>
    </Routes>
  )
}

export default ProductListRouting
