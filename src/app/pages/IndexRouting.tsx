import Error404 from '@app/components/Error/Error404'
import { MENU } from '@app/config/menu.config'
import AppLayout from '@app/modules/layouts/AppLayout/AppLayout'
import AppProductListLayout from '@app/modules/layouts/AppLayout/AppProductListLayout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManagementUserRouting from './ManagementUser/ManagementUserRouting'
import ProductRouting from './Product/ProductRouting'
import ProductListRouting from './ProductList/ProductListRouting'

export default function IndexRouting() {
  const menuId = MENU?.find((item: any) => item?.id === 'dbmbf')

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

      <Route element={menuId ? <AppLayout /> : <AppProductListLayout />}>
        <Route
          path="product-list/*"
          element={
            <React.Suspense>
              <ProductListRouting />
            </React.Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  )
}
