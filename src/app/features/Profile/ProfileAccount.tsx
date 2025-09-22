import Button from '@app/components/Buttons/Button'
import SettingColInput from '@app/modules/Form/SettingColInput'
import api from '@app/services/api-request.service'
import { setCallbackForm } from '@app/store/reducers/ui'
import { DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { P16Medium } from '@app/styled/text.styled'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

const schema = yup.object().shape({
  username: yup.string().required(),
  // password: yup.string().required(),
})

interface Props {
  dataUser: any
}
export default function ProfileAccount({ dataUser }: Props) {
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  })

  useEffect(() => reset(dataUser), [dataUser])

  const onSubmitForm = async (data: any) => {
    setLoading(true)

    const payload = { ...data }
    if (!payload.password) delete payload.password

    const params = {
      ...payload,
      createdAt: dataUser?.createdAt,
      updatedAt: dayjs().toISOString(),
    }

    try {
      const res = await api.put({
        url: '/auth/user/update',
        data: params,
      })
      if (res?.data) {
        dispatch(setCallbackForm(res?.data))
        setIsEdit(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <Card.Header>
          <DFlexJustifyBetween>
            <P16Medium className="font-weight-600">Keamanan</P16Medium>
            {!isEdit && (
              <div className="cursor-pointer" onClick={() => setIsEdit(!isEdit)}>
                <P16Medium className="font-weight-600 text-primary">{isEdit ? 'Batal' : 'Ubah'}</P16Medium>
              </div>
            )}
          </DFlexJustifyBetween>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmitForm)}>
            <Row className="g-3">
              <SettingColInput
                fieldName="username"
                control={control}
                label="Username"
                value={dataUser?.username}
                isEdit={isEdit}
                placeholder="Ubah username"
                required={false}
                register={register('username')}
                isInvalid={errors?.username as boolean | undefined}
                message={errors?.username?.message}
              />
              <SettingColInput
                fieldName="password"
                control={control}
                label="Password"
                value={'•••••••'}
                type="password"
                isEdit={isEdit}
                placeholder="Ubah password"
                required={false}
                register={register('password')}
                isInvalid={errors?.password as boolean | undefined}
                message={errors?.password?.message}
              />
              {isEdit && (
                <Col md={12}>
                  <DFlexJustifyEnd className="gap-2">
                    <Button text="Batal" variant="secondary" type="button" onClick={() => setIsEdit(!isEdit)} />
                    <Button text="Ubah" type="submit" loading={loading} />
                  </DFlexJustifyEnd>
                </Col>
              )}
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
