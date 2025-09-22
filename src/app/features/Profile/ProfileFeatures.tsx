import api from '@app/services/api-request.service'
import { setCallbackForm } from '@app/store/reducers/ui'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProfileAccount from './ProfileAccount'
import ProfileImage from './ProfileImage'
import ProfileInformation from './ProfileInformation'

export default function ProfileFeatures() {
  const dispatch = useDispatch()

  const { authUser } = useSelector((state: any) => state.auth)
  const { callbackForm } = useSelector((state: any) => state.ui)
  const [dataUser, setDataUser] = useState<any>()

  const getOneUser = async (params: any) => {
    try {
      const res = await api.get({
        url: '/auth/user/get-one',
        params,
      })
      setDataUser(res?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!authUser?.id) return
    const params = {
      id: authUser?.id,
    }
    getOneUser(params)

    return () => {
      dispatch(setCallbackForm(null))
    }
  }, [authUser, callbackForm])

  return (
    <>
      <Row className="g-4">
        <Col md={12}>
          <ProfileImage />
        </Col>
        <Col md={12}>
          <ProfileInformation dataUser={dataUser} />
        </Col>
        <Col md={12}>
          <ProfileAccount dataUser={dataUser} />
        </Col>
      </Row>
    </>
  )
}
