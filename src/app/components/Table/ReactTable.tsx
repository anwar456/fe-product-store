import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Column, useTable } from 'react-table'

interface IReactTable {
  columns: Column<any>[]
  data: any[]
  loading?: boolean
  noData?: boolean
}

export default function ReactTable({ columns, data, loading = false, noData = false }: IReactTable) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  return (
    <div className="mt-4 mb-2 table-wrapper">
      <div className="table-responsive">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!loading && !noData ? (
              rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                )
              })
            ) : (
              <>
                {loading && !noData ? (
                  Array.from({ length: 10 }).map((_, rowIdx) => (
                    <tr key={`skeleton-${rowIdx}`}>
                      {columns.map((_, colIdx) => (
                        <td key={`skeleton-cell-${rowIdx}-${colIdx}`}>
                          <Skeleton height={25} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
