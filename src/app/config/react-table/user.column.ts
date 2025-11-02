import { ACTION_COLUMN } from './action.column.config'

export const USER_COLUMNS = () => {
  return [
    {
      Header: 'Nama User',
      accessor: 'name',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'No Telp',
      accessor: 'phoneNumber',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Tanggal Dibuat',
      accessor: 'createdAt',
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
