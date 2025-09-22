import Button from '@app/components/Buttons/Button'
import SettingColInput from '@app/modules/Form/SettingColInput'
import api from '@app/services/api-request.service'
import { setCallbackForm } from '@app/store/reducers/ui'
import { DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { P16Medium } from '@app/styled/text.styled'
import { yupResolver } from '@hookform/resolvers/yup'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
})

interface Props {
  dataUser: any
}

export default function ProfileInformation({ dataUser }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  useEffect(() => reset(dataUser), [dataUser])

  const onSubmitForm = async (data: any) => {
    setLoading(true)
    const params = {
      ...data,
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
      setLoading(false)
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
            <P16Medium className="font-weight-600">Personal</P16Medium>
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
                fieldName="name"
                control={control}
                label="Nama"
                value={dataUser?.name}
                isEdit={isEdit}
                placeholder="Masukan nama"
                required
                register={register('name')}
                isInvalid={errors?.name as boolean | undefined}
                message={errors?.name?.message}
              />
              <SettingColInput
                fieldName="gender"
                control={control}
                label="Jenis Kelamin"
                value={dataUser?.gender == 'male' ? 'Laki-laki' : 'Perempuan'}
                isEdit={isEdit}
                typeForm="radio"
                required
                options={[
                  {
                    label: 'Laki-laki',
                    value: 'male',
                  },
                  {
                    label: 'Perempuan',
                    value: 'female',
                  },
                ]}
              />
              <SettingColInput
                fieldName="about"
                control={control}
                label="Tentang"
                value={dataUser?.about}
                isEdit={isEdit}
                as={'textarea'}
                rows={4}
                placeholder="Masukan tentang anda..."
                register={register('about')}
                isInvalid={errors?.about as boolean | undefined}
                message={errors?.about?.message}
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
