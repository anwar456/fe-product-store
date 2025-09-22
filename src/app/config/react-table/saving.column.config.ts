import { ACTION_COLUMN } from './action.column.config'

export const SAVING_COLUMNS = () => {
  return [
    {
      Header: 'No',
      accessor: 'no',
      disableFilters: true,
      minWidth: 50,
    },
    {
      Header: 'Nama',
      accessor: 'nama',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Nominal',
      accessor: 'nominal',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Tanggal',
      accessor: 'date',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Deskripsi',
      accessor: 'desc',
      disableFilters: true,
      minWidth: 200,
    },
    {
      Header: 'Terakhir Update',
      accessor: 'lastUpdate',
      disableFilters: true,
      minWidth: 200,
    },
    ...ACTION_COLUMN,
  ]
}
