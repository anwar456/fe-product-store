import { ACTION_COLUMN } from './action.column.config'

export const PRODUCT_COLUMNS = () => {
  return [
    {
      Header: 'Nama Produk',
      accessor: 'name',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Kategori',
      accessor: 'category',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Stok',
      accessor: 'stock',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Harga',
      accessor: 'price',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Status',
      accessor: 'status',
      disableFilters: true,
      minWidth: 200,
    },
    ...ACTION_COLUMN,
  ]
}
