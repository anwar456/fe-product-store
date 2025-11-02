import FormInputControl from '@app/components/Input/FormInputControl'
import FormInputMask from '@app/components/Input/FormInputMask'
import InputRadio from '@app/components/Radio/InputRadio'
import SelectStatic from '@app/components/Select/SelectStatic'
import UploadImage from '@app/components/Upload/UploadImage'
import { IProduct, ProductField } from '@app/interface/product.interface'
import FormData from '@app/modules/Form/FormData'
import { DFlex, DFlexColumn, DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { Loader } from '@app/styled/loader.styled'
import { P12Medium, P14Medium } from '@app/styled/text.styled'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
})

interface Props {
  onHide: () => void
}

export default function ProductForm({ onHide }: Props) {
  const [dataParams, setDataParams] = useState<any>()
  const [loading, setLoading] = useState<any>()
  const [dataSelected, setDataSelected] = useState<any>()
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(schema as any),
  })

  const onSubmitForm = (data: any) => {
    const params = {
      ...data,
    }
    setDataParams(params)
  }

  return (
    <FormData
      path={'/product'}
      dataParams={dataParams}
      fields={ProductField}
      onLoading={setLoading}
      setValue={setValue}
      reset={reset}
      onGetDataResult={setDataSelected}
    >
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Modal.Body>
          <Row className="g-3">
            <Col md={4}>
              <UploadImage accept=".png, .jpg, .jpeg" setValue={setValue} fieldName="images" watch={watch} />
            </Col>
            <Col md={8}>
              <Row className="g-3">
                <Col md={8}>
                  <FormInputControl
                    label="Nama Produk"
                    placeholder="Masukan nama produk"
                    required
                    register={register('name')}
                    isInvalid={errors?.name as boolean | undefined}
                    message={errors?.name?.message}
                  />
                </Col>
                <Col md={4}>
                  <SelectStatic
                    control={control}
                    errors={errors}
                    fieldName={'category'}
                    options={[
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
                    ]}
                    labelName={'Kategori Produk'}
                    required
                  />
                </Col>
                <Col md={12}>
                  <FormInputControl
                    label="Deskripsi"
                    placeholder="Masukan deskripsi produk"
                    as={'textarea'}
                    rows={3}
                    register={register('description')}
                    isInvalid={errors?.description as boolean | undefined}
                    message={errors?.description?.message}
                  />
                </Col>
                <Col md={5}>
                  <FormInputMask errors={errors} field={'price'} control={control} register={register('price')} labelName={'Price'} prefix="Rp " />
                </Col>
                <Col md={4}>
                  <FormInputMask errors={errors} field={'stock'} control={control} register={register('stock')} labelName={'Stok Awal'} />
                </Col>
                <Col md={3}>
                  <SelectStatic
                    isClearable={false}
                    control={control}
                    errors={errors}
                    fieldName={'unit'}
                    options={[
                      {
                        label: 'Unit',
                        value: 'unit',
                      },
                    ]}
                    labelName={'Unit'}
                  />
                </Col>
                <Col md={12}>
                  <Card className="p-3">
                    <DFlexJustifyBetween style={{ flexWrap: 'nowrap' }}>
                      <DFlexColumn className="gap-0">
                        <P14Medium className="font-weight-500">Status Produk</P14Medium>
                        <P12Medium className="text-muted">
                          Sistem akan menandai produk sebagai “Menipis” secara otomatis jika stoknya mendekati habis.
                        </P12Medium>
                        <div className="mt-4">
                          <InputRadio
                            fieldName="status"
                            control={control}
                            options={[
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
                            ]}
                          />
                        </div>
                      </DFlexColumn>
                    </DFlexJustifyBetween>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="py-2 border-0">
          <DFlexJustifyEnd>
            <Button variant="secondary" onClick={onHide}>
              Batal
            </Button>
            <Button type="submit">
              <DFlex className="gap-2">
                <P14Medium>{dataSelected ? 'Ubah' : 'Tambah'}</P14Medium>
                {loading && <Loader color="#fff" size={23} />}
              </DFlex>
            </Button>
          </DFlexJustifyEnd>
        </Modal.Footer>
      </Form>
    </FormData>
  )
}

const FormCheckStyled = styled(Form.Check)`
  &.form-switch .form-check-input {
    height: 1.2rem;
    width: 2rem;
    margin-bottom: 0;
    cursor: pointer;

    background-image: none !important;
    background-color: var(--black-100);
    border: 1px solid var(--black-100);
    border-radius: 2rem;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;
  }

  &.form-switch .form-check-input::before {
    content: '';
    position: absolute;
    top: 2.5px;
    left: 2px;
    width: 0.85rem;
    height: 0.8rem;
    background-color: #fff;
    border-radius: 10rem;
    transition: transform 0.2s ease-in-out;
  }

  &.form-switch .form-check-input:checked {
    background-color: var(--primary);
    border-color: var(--primary);
  }
  &.form-switch .form-check-input:checked::before {
    transform: translateX(0.8rem);
  }

  &.form-switch .form-check-input:focus {
    border-color: var(--primary);
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(255, 152, 0, 0.2);
  }
`
