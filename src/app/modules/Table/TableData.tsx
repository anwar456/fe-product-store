import ModalConfirm from '@app/components/Modals/ModalConfirm'
import Pagination from '@app/components/Pagination/Pagination'
import ReactTable from '@app/components/Table/ReactTable'
import { JSONtoString } from '@app/helpers/data.helper'
import api from '@app/services/api-request.service'
import { reloadingData, setActivePaging, setCallbackCancelDelete, setCallbackForm } from '@app/store/reducers/ui'
import { nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { get } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function TableData({
  path,
  columnsConfig = [],
  respDataApi,
  rowData,
  action,
  selected,
  ids = 'id',
  primaryKey,
  setAction,
  pagingPresistance = true,
  filterParams = {},
}: ITableData) {
  const source = axios.CancelToken.source()
  let [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { callbackForm, pagingLimit, reloadData } = useSelector((state: any) => state.ui)
  const { authUser } = useSelector((state: any) => state.auth)

  const currentPage = pagingPresistance ? searchParams.get('page') : 0

  const [data, setData] = useState<any>([])
  const [respData, setRespData] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [noData, setNodata] = useState<boolean>(false)
  const [dataSelected, setDataSelected] = useState<any>(selected)
  const [customFilters, setCustomFilters] = useState<any>(filterParams ?? {})
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
  const [pagination, setPagination] = useState<any>({
    perPage: pagingLimit,
    offset: 0,
    currentPage: currentPage ? parseInt(currentPage) - 1 : 0,
    pageCount: 15,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 1,
  })

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected
    const offset = selectedPage * pagination.perPage

    setPagination((prevState: any) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }))
  }

  const getAllData = async () => {
    setLoading(true)
    let params = {
      page: pagination.currentPage + 1,
      size: pagination.perPage,
      ...customFilters,
    }

    params = {
      page: pagination.currentPage + 1,
      size: pagingLimit > 10 ? pagingLimit : params?.size,
      ...customFilters,
    }
    try {
      const req = await api.post({
        url: `${path}/get-all`,
        data: params,
      })
      const data = get(req, 'data')
      const total = get(req, 'metaData.pagination.totalElements')

      if (data) {
        setRespData(data)
        setPagination((prevState: any) => ({
          ...prevState,
          pageCount: Math.ceil(total / pagination?.perPage),
          totalData: total,
        }))
        if (data?.length === 0) {
          setNodata(true)
          setPagination((prevState: any) => ({
            ...prevState,
            pageCount: 1,
            totalData: 0,
          }))
        } else {
          setNodata(false)
        }
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
      getAllData()
      toast.success('Success Deleted Data')
    } catch (err: any) {
      setLoading(false)
      toast.error('Failed Deleted Data')
    }
  }

  useEffect(() => {
    if (pagingPresistance) {
      setPagination((prevState: any) => ({
        ...prevState,
        currentPage: currentPage ? parseInt(currentPage) - 1 : 0,
      }))
    }
  }, [currentPage])

  useEffect(() => {
    if (pagingLimit !== pagination.perPage) {
      setPagination((prevState: any) => ({ ...prevState, perPage: pagingLimit }))
      searchParams.delete('page')
      setSearchParams(searchParams)
      dispatch(setActivePaging(1))
    }
  }, [pagingLimit])

  useEffect(() => {
    if (rowData) setData(rowData)
  }, [rowData])

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
     if (reloadData) getAllData()
     return () => {
       dispatch(reloadingData(null))
     }
   }, [reloadData])

  useEffect(() => {
    if (JSONtoString(filterParams) !== JSONtoString(customFilters)) {
      setCustomFilters(filterParams)
    }
  }, [filterParams])

  useEffect(() => {
    if (!customFilters) return
    const delayDebounce = setTimeout(() => {
      getAllData()
    }, 500)
    return () => {
      clearTimeout(delayDebounce)
      source.cancel()
    }
  }, [customFilters, pagination?.currentPage, pagination?.perPage])

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
      <Pagination pagination={pagination} onPageChange={handlePaginationClick} forcePage={pagingPresistance} />

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
  filterParams?: any
  pagingPresistance?: boolean
}
