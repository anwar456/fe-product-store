import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Column, useTable } from 'react-table'
import ErrorNoData from '../Error/ErrorNoData'

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
    <div className="mt-0 mb-0 table-wrapper">
      <div className="table-responsive">
        <table
          {...getTableProps()}
          className="table m-0 align-middle"
          style={{
            tableLayout: 'auto',
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      whiteSpace: 'nowrap',
                      verticalAlign: 'middle',
                      textAlign: 'left',
                      padding: '10px 20px',
                    }}
                  >
                    {column.render('Header')}
                  </th>
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
                    {row.cells.map((cell, i) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          whiteSpace: 'nowrap',
                          verticalAlign: 'middle',
                          textAlign: i === row.cells.length - 1 ? 'right' : 'left',
                          padding: '10px 20px',
                          width: i === row.cells.length - 1 ? '1%' : 'auto',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                          }}
                        >
                          {cell.render('Cell')}
                        </div>
                      </td>
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
                      <ErrorNoData />
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
