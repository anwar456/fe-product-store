import ProductListBanner from '@app/components/Banner/ProductListBanner'
import React, { useState } from 'react'
import ProductList from './ProductList'

const ProductListFeatures = () => {
  const [paramsFilters, setFilterParams] = useState<any>({
    searchBy: ['name'],
    search: '',
    order: 'DESC',
    orderBy: 'createdAt',
  })

  const handleSearch = (searchValue: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      search: searchValue,
    }))
  }

  return (
    <>
      <ProductListBanner callbackSearch={handleSearch} />
      <ProductList paramsFilters={paramsFilters} />
    </>
  )
}

export default ProductListFeatures
