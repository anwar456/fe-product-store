import LazyImage from '@app/components/Lazy/LazyImage'
import ModalForm from '@app/components/Modals/ModalForm'
import { SAVING_COLUMNS } from '@app/config/react-table/saving.column.config'
import { formatRupiah } from '@app/helpers/number.helper'
import { dateFormat, timeAgo } from '@app/helpers/time.helpers'
import { IModalData } from '@app/interface/modal.interface'
import DataAction from '@app/modules/Data/DataAction'
import ItemAction from '@app/modules/Data/ItemAction'
import TableData from '@app/modules/Table/TableData'
import { DFlex } from '@app/styled/flex.styled'
import React, { useState } from 'react'
import SavingForm from './SavingForm'

export default function SavingFeatures() {
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
    const tempData = data?.map((item: any, index: number) => ({
      no: index + 1,
      nama: (
        <>
          <DFlex className="gap-2">
            <LazyImage src={'/static/male.svg'} height={30} width={30} />
            <p className="m-0">{item?.userDetail?.name}</p>
          </DFlex>
        </>
      ),
      nominal: formatRupiah(item?.nominal),
      date: dateFormat(item?.date, 'DD-MMM-YYYY'),
      desc: item?.description,
      lastUpdate: timeAgo(item?.updatedAt),
      action: <ItemAction item={item} handleDelete={() => handleDelete(item)} handleEdit={() => handleEdit(item)} />,
    }))
    setDataRows(tempData)
  }

  return (
    <>
      <DataAction onAdd={handleAdd} />

      <TableData
        path={'/saving'}
        primaryKey={'id'}
        columnsConfig={SAVING_COLUMNS()}
        respDataApi={handleRespData}
        rowData={dataRows}
        action={action}
        setAction={setAction}
        selected={selected}
      />

      <ModalForm modalProps={modal} onHide={handleClose}>
        <SavingForm onHide={handleClose} />
      </ModalForm>
    </>
  )
}
