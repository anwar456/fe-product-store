import BadgeStatus from '@app/components/Badge/BadgeStatus'
import CheckCircleIcon from '@app/components/Icons/CheckCircleIcon'
import EditIcon from '@app/components/Icons/EditIcon'
import XCircleIcon from '@app/components/Icons/XCircleIcon'
import RequiredInfo from '@app/components/Info/RequiredInfo'
import FormInputMask from '@app/components/Input/FormInputMask'
import LazyImage from '@app/components/Lazy/LazyImage'
import { formatRupiah } from '@app/helpers/number.helper'
import api from '@app/services/api-request.service'
import { reloadingData } from '@app/store/reducers/ui'
import { DFlex, DFlexColumn, DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { Loader } from '@app/styled/loader.styled'
import { P14Medium } from '@app/styled/text.styled'
import { get, pick } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const colorConfig: Record<string, { bg: string; color: string; icon: any }> = {
  active: { bg: '#E9F9E9', color: '#26A326', icon: <CheckCircleIcon /> },
  inactive: { bg: '#E7EAF0', color: '#020C1F', icon: <XCircleIcon /> },
  thin: { bg: '#FFF0DF', color: '#E6871A', icon: <CheckCircleIcon /> },
}

const textStatus: any = {
  active: { text: 'Aktif' },
  inactive: { text: 'Nonaktif' },
  thin: { text: 'Menipis' },
}

interface IProductDetail {
  onHide: () => void
  onEdit: (value: any) => void
  selected: any
}

const ProductDetail = ({ onHide, selected, onEdit }: IProductDetail) => {
  const dispatch = useDispatch()
  const [item, setItem] = useState<any>()
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [isUpdateStock, setIsUpdateStock] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState('penambahan')
  const [errorStock, setErrorStock] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm()

  const stock = watch('stock')

  const getProductDetail = async () => {
    try {
      const req = await api.get({
        url: '/product/get-one',
        params: { id: selected?.id },
      })
      const data = get(req, 'data')
      if (data) setItem(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateStock = async () => {
    setLoading(true)
    const rawStock = Number(stock)

    if (!item) return

    const data = pick(item, ['category', 'description', 'id', 'images', 'name', 'price', 'unit'])
    let newStock = item?.stock ?? 0

    if (activeTab === 'penambahan') {
      newStock = item.stock + rawStock
    } else if (activeTab === 'pengurangan') {
      newStock = item.stock - rawStock
    }

    if (newStock < 0) {
      setErrorStock(true)
      setTimeout(() => {
        setErrorStock(false)
      }, 3000)
      setLoading(false)
      return
    }

    let newStatus = item.status
    if (item.status !== 'inactive') {
      if (newStock >= 10) newStatus = 'active'
      else newStatus = 'thin'
    }

    const params = {
      ...data,
      stock: newStock,
      status: newStatus,
    }

    try {
      const req = await api.put({
        url: '/product/update',
        data: params,
      })

      if (req) {
        await getProductDetail()
        dispatch(reloadingData(req?.id))
        setIsUpdateStock(false)
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!selected) return
    getProductDetail()
  }, [])

  return (
    <>
      <Modal.Body>
        <Row className="g-3">
          <Col md={4}>
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              pagination={{ clickable: true }}
              spaceBetween={10}
              style={{ width: '100%', marginBottom: '1rem' }}
              className="position-relative"
            >
              {item?.images?.map((file: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <LazyImage
                    src={file?.url}
                    height={200}
                    width="100%"
                    style={{
                      borderRadius: '.75rem',
                      objectFit: 'contain',
                      background: 'var(--black-50)',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {item?.images?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={20}
                slidesPerView={3}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{ width: '100%' }}
              >
                {item?.images?.map((img: any, i: number) => (
                  <SwiperSlide key={i}>
                    <LazyImage
                      src={img?.url}
                      height={70}
                      width={90}
                      style={{
                        borderRadius: '.5rem',
                        objectFit: 'contain',
                        background: 'var(--black-50)',
                        cursor: 'pointer',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </Col>
          <Col md={8}>
            <Row className="g-3">
              <Col md={6}>
                <DFlexColumn className="gap-2">
                  <P14Medium className="text-muted">Nama Produk</P14Medium>
                  <P14Medium className="font-weight-500 text-capitalize">{item?.name}</P14Medium>
                </DFlexColumn>
              </Col>
              <Col md={6}>
                <DFlexColumn className="gap-2">
                  <P14Medium className="text-muted">Kategori Produk</P14Medium>
                  <P14Medium className="font-weight-500 text-capitalize">{item?.category}</P14Medium>
                </DFlexColumn>
              </Col>
              <Col md={12}>
                <DFlexColumn className="gap-2">
                  <P14Medium className="text-muted">Deskripsi Produk</P14Medium>
                  <P14Medium className="font-weight-500 text-capitalize">{item?.description}</P14Medium>
                </DFlexColumn>
              </Col>
              <Col md={6}>
                <DFlexColumn className="gap-2">
                  <P14Medium className="text-muted">Harga Satuan</P14Medium>
                  <P14Medium className="font-weight-500 text-capitalize">{formatRupiah(item?.price)}</P14Medium>
                </DFlexColumn>
              </Col>
              <Col md={6}>
                <CardStock className="border-0">
                  <Card.Body>
                    <DFlexJustifyBetween>
                      <DFlexColumn className="gap-2">
                        <P14Medium className="text-muted">Stok Saat Ini</P14Medium>
                        <P14Medium className="font-weight-500 text-capitalize">
                          {item?.stock} {item?.unit}
                        </P14Medium>
                      </DFlexColumn>
                      {!isUpdateStock && (
                        <div role="button" onClick={() => setIsUpdateStock(true)}>
                          <P14Medium className="font-weight-600 text-capitalize text-primary">Perbarui</P14Medium>
                        </div>
                      )}
                    </DFlexJustifyBetween>
                  </Card.Body>
                </CardStock>
              </Col>
              <Col md={12}>
                <DFlexColumn className="gap-2">
                  <P14Medium className="text-muted">Status Produk</P14Medium>
                  <BadgeStatus
                    status={textStatus?.[item?.status]?.text}
                    bg={colorConfig?.[item?.status]?.bg}
                    color={colorConfig?.[item?.status]?.color}
                    icon={colorConfig?.[item?.status]?.icon}
                  />
                </DFlexColumn>
              </Col>
              {isUpdateStock && (
                <Col md={12}>
                  <Card className={`animate__animated ${isUpdateStock ? 'animate__zoomInDown' : 'animate__zoomOutDown'}  animate__faster`}>
                    <Card.Body>
                      <DFlexColumn>
                        <P14Medium className="font-weight-500">
                          Update Stok <RequiredInfo />
                        </P14Medium>
                        <DFlex className="w-100">
                          <div className="w-100">
                            <FormInputMask errors={errors} field={'stock'} control={control} register={register('stock')} placeholder="Stok" />
                          </div>
                          <TabWrapper>
                            <div className="slider-bg">
                              <div
                                className="slider-active"
                                style={{
                                  width: `${100 / tabs.length}%`,
                                  left: `${(tabs.findIndex((t) => t.value === activeTab) * 100) / tabs.length}%`,
                                }}
                              />
                              {tabs.map((tab) => (
                                <button
                                  key={tab.value}
                                  className={`tab-btn ${activeTab === tab.value ? 'active' : ''}`}
                                  onClick={() => {
                                    setActiveTab(tab.value)
                                  }}
                                >
                                  <span className="odm-text">{tab.key}</span>
                                </button>
                              ))}
                            </div>
                          </TabWrapper>
                        </DFlex>
                        <DFlex>
                          <Button variant="secondary" onClick={() => setIsUpdateStock(false)}>
                            Batal
                          </Button>
                          <Button variant="primary" type="button" onClick={handleUpdateStock} disabled={loading || !stock}>
                            <DFlex>
                              <P14Medium>Update</P14Medium>
                              {loading && <Loader color="#fff" size={23} />}
                            </DFlex>
                          </Button>
                        </DFlex>
                      </DFlexColumn>
                    </Card.Body>
                  </Card>
                </Col>
              )}
              {success && (
                <Col md={12}>
                  <AlertSuccess className="p-2 animate__animated animate__zoomIn animate__faster">
                    <DFlex className="gap-2">
                      <CheckCircleIcon />
                      <P14Medium className="font-weight-500">Stok berhasil diperbarui!</P14Medium>
                    </DFlex>
                  </AlertSuccess>
                </Col>
              )}
              {errorStock && (
                <Col md={12}>
                  <AlertDanger variant="danger" className="p-2 animate__animated animate__headShake animate__faster">
                    <DFlex className="gap-2">
                      <CheckCircleIcon />
                      <P14Medium className="font-weight-500">Stok tidak boleh kurang dari 0!</P14Medium>
                    </DFlex>
                  </AlertDanger>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <DFlexJustifyEnd>
          <Button variant="secondary" onClick={onHide}>
            Tutup
          </Button>
          <Button type="button" onClick={() => onEdit(item)}>
            <DFlex className="gap-2">
              <EditIcon />
              <P14Medium>Edit Produk</P14Medium>
            </DFlex>
          </Button>
        </DFlexJustifyEnd>
      </Modal.Footer>
    </>
  )
}

export default ProductDetail

const tabs = [
  { key: 'Penambahan', value: 'penambahan' },
  { key: 'Pengurangan', value: 'pengurangan' },
]

const CardStock = styled(Card)`
  border-radius: 0.75rem;
  background: var(--black-50);
`

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0.26667rem;
  background: var(--black-50);
  border-radius: 0.66667rem;
  position: relative;
  overflow: hidden;

  .slider-bg {
    display: flex;
    width: 100%;
    position: relative;
  }

  .slider-active {
    position: absolute;
    top: 0;
    bottom: 0;
    border-radius: 0.6667rem;
    background: #fff;
    box-shadow: 0 2px 8px 0 rgba(51, 51, 51, 0.07);
    transition: all 0.25s ease;
    padding: 0.53333rem;
    border-radius: 0.53333rem;
  }

  .tab-btn {
    z-index: 1;
    flex: 1;
    display: flex;
    height: 1.86667rem;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    border-radius: 0.53333rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      color: var(--black);
    }

    .odm-text {
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
`

const AlertSuccess = styled(Alert)`
  &.alert {
    background-color: #ebf3eb;
    color: #499949;
    border: none;
  }
`

const AlertDanger = styled(Alert)`
  &.alert {
    background-color: #fdecea;
    color: #d93025;
    border: none;
  }
`
