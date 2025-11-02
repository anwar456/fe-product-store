import BadgeStatus from '@app/components/Badge/BadgeStatus'
import CarretDownIcon from '@app/components/Icons/CarretDownIcon'
import CheckCircleIcon from '@app/components/Icons/CheckCircleIcon'
import XCircleIcon from '@app/components/Icons/XCircleIcon'
import LazyImage from '@app/components/Lazy/LazyImage'
import ModalDetail from '@app/components/Modals/ModalDetail'
import ModalForm from '@app/components/Modals/ModalForm'
import { PRODUCT_COLUMNS } from '@app/config/react-table/product.column'
import { formatRupiah, formatThousand } from '@app/helpers/number.helper'
import { IModalData } from '@app/interface/modal.interface'
import DataAction from '@app/modules/Data/DataAction'
import DataFilter from '@app/modules/Data/DataFilter'
import ItemAction from '@app/modules/Data/ItemAction'
import TableData from '@app/modules/Table/TableData'
import { DFlex, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import ProductDetail from './ProductDetail'
import ProductForm from './ProductForm'

const colorConfig: Record<string, { bg: string; color: string; icon: any }> = {
  active: { bg: '#E9F9E9', color: '#26A326', icon: <CheckCircleIcon /> },
  inactive: { bg: '#E7EAF0', color: '#020C1F', icon: <XCircleIcon /> },
  thin: { bg: '#FFF0DF', color: '#E6871A', icon: <CheckCircleIcon /> },
}

const textStatus: any = {
  active: { text: 'Aktif' },
  inactive: { text: 'Nonaktif' },
  thin: { text: 'Menipis' },
}

export default function ProductFeatures() {
  const [dataRows, setDataRows] = useState<any>()
  const [action, setAction] = useState<any>()
  const [selected, setDataSelected] = useState<any>()
  const [category, setCategory] = useState<any>('all')
  const [status, setStatus] = useState<any>('all')
  const [orderBy, setOrderBy] = useState<any>('createdAt')
  const [paramsFilters, setFilterParams] = useState<any>({
    searchBy: ['name'],
    search: '',
    order: 'DESC',
    orderBy: 'createdAt',
    filters: [],
  })
  const [modal, setModal] = useState<IModalData>({
    size: 'lg',
    description: 'Masukkan detail produk untuk menambahkannya ke inventaris.',
  })
  const [modalDetail, setModalDetail] = useState<IModalData>({
    size: 'lg',
    description: 'Berikut adalah detail dari produk yang dipilih.',
  })

  const handleClose = () => {
    setDataSelected(null)
    setAction(null)
    setModal((prev: any) => ({
      ...prev,
      show: false,
    }))
    setModalDetail((prev: any) => ({
      ...prev,
      show: false,
    }))
  }

  const handleAdd = () => {
    setModal((prev: any) => ({
      ...prev,
      show: true,
      title: `Tambah Produk`,
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
      title: `Ubah Produk`,
    }))
    setModalDetail((prev: any) => ({
      ...prev,
      show: false,
    }))
  }

  const handleSearch = (searchValue: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      search: searchValue,
    }))
  }

  const handleChangeCategory = (item: any) => {
    setCategory(item?.value)
    if (item?.value !== 'all') {
      setFilterParams((prev: any) => ({
        ...prev,
        filters: [{ field: 'category', value: item?.value }],
      }))
    } else {
      setFilterParams((prev: any) => ({
        ...prev,
        filters: [],
      }))
    }
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

  const handleOrderBy = (item: any) => {
    setOrderBy(item?.value)
    if (item?.value !== 'all') {
      setFilterParams((prev: any) => ({
        ...prev,
        orderBy: item?.value,
      }))
    }
  }

  const handleOrder = (order: any) => {
    setFilterParams((prev: any) => ({
      ...prev,
      order,
    }))
  }

  const handleDetail = (item: any) => {
    setDataSelected(item)
    setModalDetail((prev: any) => ({
      ...prev,
      show: true,
      title: 'Detail Produk',
    }))
  }

  const handleRespData = (data: any) => {
    const tempData = data?.map((item: any) => ({
      name: (
        <DFlex className="gap-3">
          <LazyImage src={item?.images?.[0]?.url} height={30} width={30} style={{ borderRadius: '.3rem' }} />
          <P14Medium className="text-capitalize">{item?.name}</P14Medium>
        </DFlex>
      ),
      category: <P14Medium className="text-capitalize">{item?.category}</P14Medium>,
      stock: <P14Medium>{formatThousand(item?.stock)}</P14Medium>,
      price: formatRupiah(item?.price),
      status: (
        <BadgeStatus
          status={textStatus?.[item?.status]?.text}
          bg={colorConfig?.[item?.status]?.bg}
          color={colorConfig?.[item?.status]?.color}
          icon={colorConfig?.[item?.status]?.icon}
        />
      ),
      action: <ItemAction item={item} handleDelete={() => handleDelete(item)} handleEdit={() => handleEdit(item)} onDetail={() => handleDetail(item)} />,
    }))
    setDataRows(tempData)
  }

  return (
    <>
      <DataAction onAdd={handleAdd} isUpdateStock={false} />
      <DataFilter
        callbackSearch={handleSearch}
        callbackOrder={handleOrder}
        leftFilterComponents={
          <>
            <Dropdown>
              <Dropdown.Toggle variant="">
                <DFlex>
                  <P14Medium className="text-capitalize">{category === 'all' ? 'Semua Kategori' : category}</P14Medium>
                  <CarretDownIcon />
                </DFlex>
              </Dropdown.Toggle>
              <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                {CATEGORY_LIST?.map((item: any) => (
                  <Dropdown.Item key={item?.value} className={category === item?.value ? 'active' : ''} onClick={() => handleChangeCategory(item)}>
                    <DFlexJustifyBetween>
                      {item?.label} {category === item?.value && <CheckCircleIcon />}
                    </DFlexJustifyBetween>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="">
                <DFlex>
                  <P14Medium>{status === 'active' ? 'Aktif' : status === 'inactive' ? 'Nonaktif' : status === 'thin' ? 'Menipis' : 'Semua Status'}</P14Medium>
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
        rightFilterComponents={
          <>
            <DFlex className="gap-2">
              <P14Medium className="font-weight-500">Urutkan:</P14Medium>
              <Dropdown>
                <Dropdown.Toggle variant="">
                  <DFlex>
                    <P14Medium>
                      {orderBy === 'createdAt'
                        ? 'Tanggal Dibuat'
                        : orderBy === 'name'
                        ? 'Nama Produk'
                        : orderBy === 'category'
                        ? 'Kategori'
                        : orderBy === 'stock'
                        ? 'Stok'
                        : 'Harga'}
                    </P14Medium>
                    <CarretDownIcon />
                  </DFlex>
                </Dropdown.Toggle>

                <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
                  {ORDER_PRODUCT_BY?.map((item: any) => (
                    <Dropdown.Item key={item?.value} className={orderBy === item?.value ? 'active' : ''} onClick={() => handleOrderBy(item)}>
                      <DFlexJustifyBetween>
                        {item?.label} {orderBy === item?.value && <CheckCircleIcon />}
                      </DFlexJustifyBetween>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </DFlex>
          </>
        }
      />
      <TableData
        path={'/product'}
        primaryKey={'id'}
        columnsConfig={PRODUCT_COLUMNS()}
        respDataApi={handleRespData}
        rowData={dataRows}
        action={action}
        setAction={setAction}
        selected={selected}
        filterParams={paramsFilters}
      />

      <ModalForm modalProps={modal} onHide={handleClose}>
        <ProductForm onHide={handleClose} />
      </ModalForm>
      <ModalDetail modalProps={modalDetail} onHide={handleClose}>
        <ProductDetail onHide={handleClose} selected={selected} onEdit={handleEdit} />
      </ModalDetail>
    </>
  )
}

const CATEGORY_LIST = [
  {
    label: 'Semua Kategori',
    value: 'all',
  },
  {
    label: 'Meja',
    value: 'meja',
  },
  {
    label: 'Kursi',
    value: 'kursi',
  },
  {
    label: 'Lemari',
    value: 'lemari',
  },
]

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
  {
    label: 'Menipis',
    value: 'thin',
  },
]

const ORDER_PRODUCT_BY = [
  {
    label: 'Tanggal Dibuat',
    value: 'createdAt',
  },
  {
    label: 'Nama Produk',
    value: 'name',
  },
  {
    label: 'Kategori',
    value: 'categori',
  },
  {
    label: 'Stok',
    value: 'stock',
  },
  {
    label: 'Harga',
    value: 'price',
  },
]
