import FormInputControl from '@app/components/Input/FormInputControl'
import api from '@app/services/api-request.service'
import { setCallbackForm } from '@app/store/reducers/ui'
import { DFlex, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { Loader } from '@app/styled/loader.styled'
import { P14Medium } from '@app/styled/text.styled'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'

interface Props {
  onHide: () => void
}

const schema = yup.object().shape({
  new_password: yup.string().required('Password wajib diisi'),
})

const ResetPasswordForm = ({ onHide }: Props) => {
  const dispatch = useDispatch()
  const { authUser } = useSelector((state: any) => state.auth)

  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema as any),
  })

  const onSubmitForm = async (data: any) => {
    setLoading(true)
    try {
      const res = await api.post({
        url: '/user/reset-password',
        data: {
          ...data,
          user_id: authUser?.id,
        },
      })
      if (res) {
        dispatch(setCallbackForm(res?.id))
        toast.success('Success Reset Password')
        setTimeout(() => {
          onHide()
        }, 500)
      }
    } catch (error) {
      setLoading(false)
      toast.error('Failed Reset Password')
      console.log(error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <Modal.Body>
        <Row className="g-3">
          <FormInputControl
            label="New Password"
            type="password"
            placeholder="Masukan password"
            required
            register={register('new_password')}
            isInvalid={errors?.new_password as boolean | undefined}
            message={errors?.new_password?.message}
          />
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <DFlexJustifyEnd>
          <Button variant="secondary" onClick={onHide}>
            Batal
          </Button>
          <Button type="submit">
            <DFlex className="gap-2">
              <P14Medium>Ubah Password</P14Medium>
              {loading && <Loader color="#fff" size={23} />}
            </DFlex>
          </Button>
        </DFlexJustifyEnd>
      </Modal.Footer>
    </Form>
  )
}

export default ResetPasswordForm
