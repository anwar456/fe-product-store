import ModalConfirm from '@app/components/Modals/ModalConfirm'
import Pagination from '@app/components/Pagination/Pagination'
import ReactTable from '@app/components/Table/ReactTable'
import api from '@app/services/api-request.service'
import { setCallbackCancelDelete, setCallbackForm } from '@app/store/reducers/ui'
import { nanoid } from '@reduxjs/toolkit'
import { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

export default function TableData({ path, columnsConfig = [], respDataApi, rowData, action, selected, ids = 'id', primaryKey, setAction }: ITableData) {
  const dispatch = useDispatch()
  const { callbackForm } = useSelector((state: any) => state.ui)
  const { authUser } = useSelector((state: any) => state.auth)

  let [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(0)
  const [data, setData] = useState<any>([])
  const [respData, setRespData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [noData, setNodata] = useState<boolean>(false)
  const [dataSelected, setDataSelected] = useState<any>(selected)
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'far fa-trash',
    description: `Konfirmasi Hapus`,
    subDescriotion: `Jika kamu menghapus data ini, tindakan tersebut tidak dapat dibatalkan. Apakah kamu yakin?`,
    textApproved: 'Hapus',
    classApproved: 'danger',
    textDecline: 'Batal',
  })

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected)
    console.log('Halaman aktif:', selected + 1)
  }

  const getAllData = async () => {
    setLoading(true)
    const params = {
      searchBy: [],
      search: '',
      order: 'DESC',
      orderBy: 'createdAt',
      page: 1,
      size: 10,
      filters: [{ createdBy: authUser?.id }],
    }
    try {
      const req = await api.post({
        url: `${path}/get-all`,
        data: params,
      })
      if (req?.data) {
        setRespData(req?.data)
        setNodata(false)
      }
    } catch (error) {
      setLoading(false)
      setNodata(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  /**
   * DELETE HANDLING
   */
  const deleteData = async () => {
    setLoading(true)

    try {
      await api.delete({ url: `${path}/delete`, params: { id: dataSelected?.id } })
      // dispatchNotification(`Successfully deleted ${label}`, 'success')
      getAllData()
    } catch (err: any) {
      setLoading(false)
      // dispatchNotification(`Failed deleted ${label}`, 'danger')
    }
  }

  useEffect(() => {
    if (rowData) setData(rowData)
  }, [rowData])

  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    respDataApi(respData)
  }, [respData])

  useEffect(() => {
    if (callbackForm) getAllData()
    return () => {
      dispatch(setCallbackForm(null))
    }
  }, [callbackForm])

  useEffect(() => {
    if (selected) {
      switch (action) {
        case 'delete':
          setDataSelected(selected)
          setModalConfirm((prevState: any) => ({
            ...prevState,
            show: true,
          }))
          break
        case 'edit.modal':
          searchParams.delete(ids)
          searchParams.append(ids, get(selected, primaryKey))
          setSearchParams(searchParams)
          break
        default:
          break
      }
    }
  }, [action, selected])

  const callbackModalConfirm = (approved = false) => {
    if (approved) deleteData()
    else {
      dispatch(setCallbackCancelDelete(nanoid()))
      setModalConfirm((prevState: any) => ({
        ...prevState,
        show: false,
      }))
      setDataSelected(null)
      if (setAction) setAction(null)
    }
  }

  const tableData = useMemo(() => data, [data])

  return (
    <>
      <ReactTable columns={columnsConfig} data={tableData} loading={loading} noData={noData} />
      <Pagination pageCount={10} onPageChange={handlePageChange} forcePage={page} />

      <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} />
    </>
  )
}

interface ITableData {
  path: any
  columnsConfig: any[]
  respDataApi: any
  rowData: any
  action: any
  selected: any
  ids?: string
  primaryKey?: any
  setAction: any
}
