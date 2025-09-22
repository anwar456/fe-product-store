import LoginLayout from '@app/modules/layouts/LoginLayout/LoginLayout'
import api from '@app/services/api-request.service'
import { loginUser, setLoggedInUserDetail } from '@app/store/reducers/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

export default function LoginFeatures() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmitForm = async (data: any) => {
    setLoading(true)
    try {
      const res = await api.post({
        url: '/auth/login',
        data: { ...data },
      })
      if (res?.data) {
        dispatch(setLoggedInUserDetail(res?.data?.user))
        dispatch(loginUser({ refresh: res?.data?.auth?.refreshToken, access: res?.data?.auth?.accessToken }))
        setError(false)
        navigate('/home')
      }
    } catch (error) {
      setLoading(false)
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <LoginLayout handleSubmit={handleSubmit} onSubmitForm={onSubmitForm} register={register} errors={errors} loading={loading} error={error} />
    </>
  )
}
