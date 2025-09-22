import Button from '@app/components/Buttons/Button'
import AntDatePicker from '@app/components/DatePicker/AntDatePicker'
import FormInputControl from '@app/components/Input/FormInputControl'
import { ISaving, SavingField } from '@app/interface/saving.interface'
import FormData from '@app/modules/Form/FormData'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  nominal: yup.number().required(),
  date: yup.number().required(),
  description: yup.string().optional(),
})

interface Props {
  onHide: () => void
}

export default function SavingForm({ onHide }: Props) {
  const [dataParams, setDataParams] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISaving>({
    resolver: yupResolver(schema as any),
  })

  const onSubmitForm = (data: any) => {
    const params = {
      ...data,
    }
    setDataParams(params)
  }

  return (
    <FormData path={'/saving'} dataParams={dataParams} fields={SavingField} onLoading={setLoading} setValue={setValue} reset={reset}>
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={12}>
              <FormInputControl
                label="Nominal"
                placeholder="Masukan nominal"
                type="number"
                required
                register={register('nominal')}
                isInvalid={errors?.nominal as boolean | undefined}
                message={errors?.nominal?.message}
              />
            </Col>
            <Col md={12}>
              <AntDatePicker fieldName="date" label="Tanggal" control={control} required errors={errors} />
            </Col>
            <Col md={12}>
              <FormInputControl
                label="Deskripsi"
                placeholder="Masukan deskripsi"
                as={'textarea'}
                rows={5}
                register={register('description')}
                isInvalid={errors?.description as boolean | undefined}
                message={errors?.description?.message}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="py-2">
          <Button text="Batal" variant="secondary" onClick={onHide} />
          <Button text="Simpan" type="submit" loading={loading} />
        </Modal.Footer>
      </Form>
    </FormData>
  )
}
