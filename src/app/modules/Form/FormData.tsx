import { JSONResetter, JSONtoString, stringToJSON } from '@app/helpers/data.helper'
import { getObjectKeys } from '@app/helpers/object.helper'
import api from '@app/services/api-request.service'
import { setCallbackForm } from '@app/store/reducers/ui'
import axios from 'axios'
import { get, head, isArray, isBoolean, isObject, isPlainObject, isString, merge, omit, pick, size } from 'lodash'

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

export default function FormData({
  children,
  path,
  dataParams,
  primaryKey = 'id',
  ignoreMappingParams = false,
  fields = {},
  onLoading,
  ids = 'id',
  onGetDataResult,
  setValue,
  append,
  reset,
  overrideType,
  dataInit,
}: IFormData) {
  const source = axios.CancelToken.source()

  const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams()

  const dispatch = useDispatch()
  const { authUser } = useSelector((state: any) => state.auth)
  const [loadingForm, setLoadingForm] = useState<boolean>(false)
  const [dataForm, setDataForm] = useState<any>()
  const getIdParams = id || searchParams.get(ids)

  useEffect(() => {
    if (dataParams) {
      const valueId = dataParams?.[primaryKey]

      const createdBy = valueId == 'pk' || valueId == '' || valueId === undefined ? { createdBy: authUser?.id } : {}
      const paramsParsed: any = JSONResetter({ ...dataParams, ...createdBy })
      const f: any = JSONResetter(fields)
      // const paramsMapped: any = mappingParams({ fields: f, dataParams: paramsParsed })
      const paramsMapped: any = ignoreMappingParams ? paramsParsed : mappingParams({ fields: f, dataParams: paramsParsed })
      const paramsResult = paramsMapped
      const apiParams = paramsResult

      const finalResultParams = omit(
        apiParams,
        Object.keys(apiParams)?.filter((f) => apiParams[f] == 'ignored' || apiParams[f] == 'pk'),
      )

      upsertData(finalResultParams)
    }
  }, [dataParams])

  useEffect(() => {
    if (onLoading) {
      onLoading(loadingForm)
    }
  }, [loadingForm])

  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    setLoadingForm(true)

    try {
      const PATH_ADD = `${path}/add`
      const PATH_UPDATE = `${path}/update`
      const resp = getIdParams
        ? await api.put({
            url: PATH_UPDATE,
            data: params,
          })
        : await api.post({
            url: PATH_ADD,
            data: params,
          })

      dispatch(setCallbackForm(resp))
    } catch (error) {
      console.log(error)
      setLoadingForm(false)
    }
  }

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const res = await api.get({
        url: `${path}/get-one`,
        params: { id: getIdParams },
      })
      const reqData = get(res, 'data')
      const resData = isArray(reqData) ? head(reqData) : reqData
      initDataForm(resData)
      setLoadingForm(false)
      if (onGetDataResult) {
        onGetDataResult(resData)
        // onGetDataResult(fieldParent ? resData : resData)
      }
    } catch {
      initDataForm()
    }
  }

  /** INIT */
  useEffect(() => {
    if (getIdParams) getDataById()
    else initDataForm()

    return () => {
      source.cancel('Request Canceled')
    }
  }, [getIdParams])

  /** INIT DATA FORM  */
  useEffect(() => {
    if (dataInit) {
      initDataForm(merge(dataForm, dataInit), true)
    }
  }, [dataForm, dataInit])

  useEffect(() => {
    return () => {
      setDataForm(undefined)
    }
  }, [])

  /** INIT DATA FORM EDIT OR NEW DATA */
  const initDataForm = (dt: any = undefined, merge = false) => {
    const data = JSONResetter(dt)
    const isEdit = id || searchParams.get(ids)
    const valueData = isEdit && data ? pick(data, getObjectKeys(fields)) : fields

    if (!merge) setDataForm(valueData)
    if (reset && isEdit) {
      reset(data)
      return false
    }

    Object.keys(valueData).map((field: any) => {
      const overrideCheck = get(overrideType, field)
      const valueOrigin = valueData[field]
      let v = valueOrigin
      const boolValue = {
        true: 1,
        false: 0,
      }
      if (valueOrigin !== '' && valueOrigin !== null && valueOrigin !== undefined) {
        const dateFormat = moment(valueOrigin)
        v = overrideCheck == 'string' ? `${isBoolean(valueOrigin) ? get(boolValue, `${valueOrigin}`) : valueOrigin}` : valueOrigin
        v = overrideCheck == 'int' ? parseInt(valueOrigin) : v
        v = overrideCheck == 'float' ? parseFloat(valueOrigin) : v
        v = overrideCheck == 'date' ? dateFormat.format('YYYY-MM-DD') : v
        v = overrideCheck == 'datetime' ? dateFormat.format('YYYY-MM-DD[T]HH:mm') : v
        v = overrideCheck == 'datetimefull' ? dateFormat.format('YYYY-MM-DD[T]HH:mm:ss') : v
      }
      if (isArray(v) && append) {
        console.log(append)
        if (isObject(append) && append.hasOwnProperty(field)) {
          const ap: any = append
          const appendByField: any = ap[field]
          v?.forEach((arrValue: any) => {
            appendByField(arrValue)
          })
        } else {
          v?.forEach((arrValue: any) => {
            append(arrValue)
          })
        }
      } else {
        setValue(field, v)
      }
    })
  }

  return <>{children}</>
}

interface IFormData {
  children: any
  path: string
  dataParams: any
  primaryKey?: string
  ignoreMappingParams?: boolean
  fields: any
  onLoading: any
  ids?: string
  onGetDataResult?: any
  setValue: any
  append?: any
  reset?: any
  overrideType?: any
  dataInit?: any
}

const checkingValueParams = ({ fields, dataParams, field, fieldType, valueType, fieldTypeValue, v }: any) => {
  let t = fieldType == 'number' ? (valueType == 'boolean' ? (v ? 1 : 0) : parseFloat(v ? v : 0)) : v
  t = field?.includes('tanggal') && v != '' && v != null ? moment(v).format('YYYY-MM-DD') : t
  t = fieldType == 'boolean' ? (t ? true : false) : t
  t = fieldType == 'string' ? `${t}` : t
  t = isPlainObject(field) && fieldTypeValue == null && v == '' ? null : t
  t = isPlainObject(v) ? mappingParams({ fields, dataParams }) : t

  // kalau data nya array object. kalau default value tolong di isi array object default nya juga
  if (isArray(v) && size(v) > 0) {
    const fieldsArr = get(fields, '0')
    t = isPlainObject(fieldsArr)
      ? v?.map((va: any) => {
          return mappingParams({ fields: fieldsArr, dataParams: va })
        })
      : t

    t = isString(get(v, '0')) ? v : t
  }
  t = t == 'pk' ? undefined : t
  return t
}

export const mappingParams = ({ fields, dataParams }: any) => {
  let params: any = stringToJSON(JSONtoString(fields))
  Object.keys(fields).map((field: any) => {
    const v: any = get(dataParams, field)
    const fieldTypeValue = get(fields, field)
    const fieldType = typeof fieldTypeValue
    const valueType = typeof v
    const vf = checkingValueParams({ fields: fieldTypeValue, dataParams: v, field, fieldType, valueType, fieldTypeValue, v })
    params[field] = vf == undefined || vf == 'undefined' ? v : vf
  })
  return params
}
