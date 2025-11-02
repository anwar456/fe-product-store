import BadgeStatus from '@app/components/Badge/BadgeStatus'
import CarretDownIcon from '@app/components/Icons/CarretDownIcon'
import CheckCircleIcon from '@app/components/Icons/CheckCircleIcon'
import XCircleIcon from '@app/components/Icons/XCircleIcon'
import LazyImage from '@app/components/Lazy/LazyImage'
import ModalDetail from '@app/components/Modals/ModalDetail'
import ModalForm from '@app/components/Modals/ModalForm'
import { USER_COLUMNS } from '@app/config/react-table/user.column'
import { timeAgo } from '@app/helpers/time.helpers'
import { IModalData } from '@app/interface/modal.interface'
import DataAction from '@app/modules/Data/DataAction'
import DataFilter from '@app/modules/Data/DataFilter'
import ItemAction from '@app/modules/Data/ItemAction'
import TableData from '@app/modules/Table/TableData'
import { DFlex, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import ManagementUserForm from './ManagementUserForm'
import ResetPasswordForm from './ResetPasswordForm'

const colorConfig: Record<string, { bg: string; color: string; icon: any }> = {
  active: { bg: '#E9F9E9', color: '#26A326', icon: <CheckCircleIcon /> },
  inactive: { bg: '#E7EAF0', color: '#020C1F', icon: <XCircleIcon /> },
}

export default function ManagementUserFeatures() {
  const [dataRows, setDataRows] = useState<any>()
  const [action, setAction] = useState<any>()
  const [selected, setDataSelected] = useState<any>()
  const [status, setStatus] = useState<any>('all')
  const [paramsFilters, setFilterParams] = useState<any>({
    searchBy: ['name'],
    search: '',
    order: 'DESC',
    orderBy: 'createdAt',
  })
  const [modal, setModal] = useState<IModalData>({
    size: 'lg',
    description: 'Masukkan detail user untuk menambahkannya ke management user',
  })
  const [modalReset, setModalReset] = useState<IModalData>({
    size: 'md',
    description: 'Masukkan password baru untuk pengguna ini.',
  })

  const handleClose = () => {
    setDataSelected(null)
    setAction(null)
    setModal((prev: any) => ({
      ...prev,
      show: false,
    }))
    setModalReset((prev: any) => ({
      ...prev,
      show: false,
    }))
  }

  const handleAdd = () => {
    setModal((prev: any) => ({
      ...prev,
      show: true,
      title: `Tambah User`,
    }))
  }

  const handleDelete = (item: any) => {
    setAction('delete')
    setDataSelected(item)
  }

  const handleEdit = (item: any) => {
    setAction('edit.modal')
    setDataSelected(item)
    setModal((prev: any) => ({
      ...prev,
      title: `Ubah User`,
    }))
  }

  const handleSearch = (searchValue: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      search: searchValue,
    }))
  }

  const handleChangeStatus = (item: any) => {
    setStatus(item?.value)
    if (item?.value !== 'all') {
      setFilterParams((prev: any) => ({
        ...prev,
        filters: [{ field: 'status', value: item?.value }],
      }))
    } else {
      setFilterParams((prev: any) => ({
        ...prev,
        filters: [],
      }))
    }
  }

  const handleOrder = (order: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      order,
    }))
  }

  const hanldeResetPw = (item: any) => {
    setModalReset((prev: any) => ({
      ...prev,
      title: 'Reset Password',
      show: true,
      data: item,
    }))
  }

  const handleRespData = (data: any) => {
    const tempData = data?.map((item: any) => ({
      name: (
        <DFlex className="gap-3">
          <LazyImage src={item?.images || '/static/male.svg'} height={30} width={30} style={{ borderRadius: '.3rem' }} />
          <P14Medium>{item?.name}</P14Medium>
        </DFlex>
      ),
      phoneNumber: <P14Medium>{item?.phoneNumber}</P14Medium>,
      createdAt: <P14Medium>{timeAgo(item?.createdAt)}</P14Medium>,
      status: (
        <BadgeStatus
          status={item?.status}
          bg={colorConfig?.[item?.status]?.bg}
          color={colorConfig?.[item?.status]?.color}
          icon={colorConfig?.[item?.status]?.icon}
        />
      ),
      action: <ItemAction item={item} handleDelete={() => handleDelete(item)} handleEdit={() => handleEdit(item)} hanldeResetPw={() => hanldeResetPw(item)} />,
    }))
    setDataRows(tempData)
  }

  return (
    <>
      <DataAction onAdd={handleAdd} addLabel="Tambah User" isUpdateStock={false} />
      <DataFilter
        callbackSearch={handleSearch}
        callbackOrder={handleOrder}
        leftFilterComponents={
          <>
            <Dropdown>
              <Dropdown.Toggle variant="">
                <DFlex>
                  <P14Medium>{status === 'all' ? 'Semua Status' : status === 'active' ? 'Aktif' : 'Nonaktif'}</P14Medium>
                  <CarretDownIcon />
                </DFlex>
              </Dropdown.Toggle>

              <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                {STATUS_LIST?.map((item: any) => (
                  <Dropdown.Item key={item?.value} className={status === item?.value ? 'active' : ''} onClick={() => handleChangeStatus(item)}>
                    <DFlexJustifyBetween>
                      {item?.label} {status === item?.value && <CheckCircleIcon />}
                    </DFlexJustifyBetween>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </>
        }
      />
      <TableData
        path={'/user'}
        primaryKey={'id'}
        columnsConfig={USER_COLUMNS()}
        respDataApi={handleRespData}
        rowData={dataRows}
        action={action}
        setAction={setAction}
        selected={selected}
        filterParams={paramsFilters}
      />

      <ModalForm modalProps={modal} onHide={handleClose}>
        <ManagementUserForm onHide={handleClose} />
      </ModalForm>
      <ModalDetail modalProps={modalReset} onHide={handleClose}>
        <ResetPasswordForm onHide={handleClose} />
      </ModalDetail>
    </>
  )
}

const STATUS_LIST = [
  {
    label: 'Semua Status',
    value: 'all',
  },
  {
    label: 'Aktif',
    value: 'active',
  },
  {
    label: 'Nonaktif',
    value: 'inactive',
  },
]
