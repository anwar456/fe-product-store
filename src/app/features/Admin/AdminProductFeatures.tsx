import LazyImage from '@app/components/Lazy/LazyImage'
import { PRODUCT_COLUMNS } from '@app/config/react-table/product.column'
import { formatRupiah } from '@app/helpers/number.helper'
import { IModalData } from '@app/interface/modal.interface'
import DataAction from '@app/modules/Data/DataAction'
import DataFilter from '@app/modules/Data/DataFilter'
import ItemAction from '@app/modules/Data/ItemAction'
import TableData from '@app/modules/Table/TableData'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useState } from 'react'

export default function AdminProductFeatures() {
  const [dataRows, setDataRows] = useState<any>()
  const [action, setAction] = useState<any>()
  const [selected, setDataSelected] = useState<any>()
  const [modal, setModal] = useState<IModalData>({
    size: 'md',
    title: `Tabungan`,
  })

  const handleClose = () => {
    setDataSelected(null)
    setAction(null)
    setModal((prev: any) => ({
      ...prev,
      show: false,
    }))
  }

  const handleAdd = () => {
    setModal((prev: any) => ({
      ...prev,
      show: true,
    }))
  }

  const handleDelete = (item: any) => {
    setAction('delete')
    setDataSelected(item)
  }

  const handleEdit = (item: any) => {
    setAction('edit.modal')
    setDataSelected(item)
  }

  const handleRespData = (data: any) => {
    const tempData = data?.map((item: any) => ({
      name: (
        <DFlex className="gap-2">
          <LazyImage src={'/static/male.svg'} height={30} width={30} />
        </DFlex>
      ),
      category: <P14Medium>Meja</P14Medium>,
      stock: <P14Medium>2</P14Medium>,
      price: formatRupiah(3400000),
      status: <P14Medium>Menipis</P14Medium>,
      action: <ItemAction item={item} handleDelete={() => handleDelete(item)} handleEdit={() => handleEdit(item)} />,
    }))
    setDataRows(tempData)
  }

  return (
    <>
      <DataAction onAdd={handleAdd} />
      <DataFilter />
      <TableData
        path={''}
        primaryKey={'id'}
        columnsConfig={PRODUCT_COLUMNS()}
        respDataApi={handleRespData}
        rowData={dataRows}
        action={action}
        setAction={setAction}
        selected={selected}
      />
    </>
  )
}
