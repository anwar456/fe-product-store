import Error404 from '@app/components/Error/Error404'
import AppLayout from '@app/modules/layouts/AppLayout/AppLayout'
import AppProductListLayout from '@app/modules/layouts/AppLayout/AppProductListLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManagementUserRouting from './ManagementUser/ManagementUserRouting'
import ProductRouting from './Product/ProductRouting'
import ProductListRouting from './ProductList/ProductListRouting'

const ProductListDetailPage = React.lazy(() => import(`@app/pages/ProductList/ProductListDetailPage`))

export default function IndexRouting() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="product/*"
          element={
            <React.Suspense>
              <ProductRouting />
            </React.Suspense>
          }
        />
        <Route
          path="management-user/*"
          element={
            <React.Suspense>
              <ManagementUserRouting />
            </React.Suspense>
          }
        />
      </Route>

      <Route element={<AppProductListLayout />}>
        <Route
          path="product-list/*"
          element={
            <React.Suspense>
              <ProductListRouting />
            </React.Suspense>
          }
        />
      </Route>

      <Route element={<AppLayout />}>
        <Route
          path="product-list/detail/:id*"
          element={
            <React.Suspense>
              <ProductListDetailPage />
            </React.Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
