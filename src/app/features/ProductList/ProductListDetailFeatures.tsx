import BadgeStatus from '@app/components/Badge/BadgeStatus'
import CheckCircleIcon from '@app/components/Icons/CheckCircleIcon'
import MinIcon from '@app/components/Icons/MinIcon'
import PlusIcon from '@app/components/Icons/PlusIcon'
import StarIcon, { StarPart } from '@app/components/Icons/StarIcon'
import XCircleIcon from '@app/components/Icons/XCircleIcon'
import LazyImage from '@app/components/Lazy/LazyImage'
import { formatRupiah } from '@app/helpers/number.helper'
import api from '@app/services/api-request.service'
import { DFlex, DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium, P18Medium, P20Medium } from '@app/styled/text.styled'
import { get } from 'lodash'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Dot } from './ProductList'

const colorConfig: Record<string, { bg: string; color: string; icon: any }> = {
  active: { bg: '#E9F9E9', color: '#26A326', icon: <CheckCircleIcon /> },
  inactive: { bg: '#E7EAF0', color: '#020C1F', icon: <XCircleIcon /> },
  thin: { bg: '#FFF0DF', color: '#E6871A', icon: <CheckCircleIcon /> },
}

const textStatus: any = {
  active: { text: 'Tersedia' },
  inactive: { text: 'Tidak Tersedia' },
  thin: { text: 'Menipis' },
}

const ProductListDetailFeatures = () => {
  const [item, setItem] = useState<any>()
  const [qty, setQty] = useState<number>(1)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const { id } = useParams()

  const getProductDetail = async () => {
    try {
      const req = await api.get({
        url: '/product/get-one',
        params: { id },
      })
      const data = get(req, 'data')
      if (data) setItem(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!id) return
    getProductDetail()
  }, [id])

  if (!id) return null

  // Fungsi tombol
  const handleIncrease = () => setQty((prev) => prev + 1)
  const handleDecrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1))
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (isNaN(value) || value < 1) setQty(1)
    else setQty(value)
  }

  return (
    <Container>
      <Row className="gy-5">
        <Col md={4}>
          <DFlexColumn className="w-100 align-items-center">
            {/* Swiper utama */}
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              pagination={{ clickable: true }}
              spaceBetween={10}
              style={{ width: '100%', height: '100%' }}
              className="position-relative"
            >
              {item?.images?.map((file: any, idx: number) => (
                <SwiperSlide key={idx}>
                  <LazyImage
                    src={file?.url}
                    height={400}
                    width="100%"
                    style={{
                      borderRadius: '.75rem',
                      objectFit: 'contain',
                      background: 'var(--black-100)',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            {item?.images?.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{ width: '100%', height: '100%' }}
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
                        border: '1px solid var(--black-200)',
                        background: 'var(--black-100)',
                        cursor: 'pointer',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </DFlexColumn>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <DFlexColumn className="gap-2 mb-4">
                <Title className="m-0 text-capitalize">{item?.name}</Title>
                <DFlex className="gap-2">
                  <P14Medium>4.5</P14Medium>
                  <DFlex className="gap-1">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarPart />
                  </DFlex>
                  <Dot />
                  <P14Medium>30 Terjual</P14Medium>
                </DFlex>
                <DFlex className="mt-3 gap-2">
                  <Price>{formatRupiah(item?.price)}</Price>
                  <DiscLabel>
                    <P12Medium className="font-weight-500">-12%</P12Medium>
                  </DiscLabel>
                </DFlex>
              </DFlexColumn>

              <Row className="gy-4">
                <Col md={4}>
                  <P14Medium>Pengiriman</P14Medium>
                </Col>
                <Col md={8}>
                  <DFlexColumn className="gap-2">
                    <P18Medium className="font-weight-500">Garansi Tiba: 4 - 6 September</P18Medium>
                    <P14Medium className="text-muted">Dapatkan Voucher s/d Rp10.000 jika pesanan terlambat.</P14Medium>
                  </DFlexColumn>
                </Col>

                <Col md={4}>
                  <P14Medium>Kuantitas</P14Medium>
                </Col>
                <Col md={8}>
                  <DFlex>
                    <InputGroup className="mb-3" style={{ width: '10rem' }}>
                      <InputGroupText onClick={handleDecrease}>
                        <MinIcon />
                      </InputGroupText>
                      <Form.Control type="number" value={qty} onChange={handleChange} />
                      <InputGroupText onClick={handleIncrease}>
                        <PlusIcon />
                      </InputGroupText>
                    </InputGroup>
                    <div className="mb-3">
                      <BadgeStatus
                        status={textStatus?.[item?.status]?.text}
                        bg={colorConfig?.[item?.status]?.bg}
                        color={colorConfig?.[item?.status]?.color}
                        icon={colorConfig?.[item?.status]?.icon}
                      />
                    </div>
                  </DFlex>
                </Col>

                <Col md={12}>
                  <Button className="w-100">Beli Produk</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <DFlexColumn className="w-100">
            <CardDesc className="w-100">
              <Card.Body>
                <P20Medium className="font-weight-600">Deskripsi Produk</P20Medium>
              </Card.Body>
            </CardDesc>
            <div className="px-3">
              <P14Medium style={{ lineHeight: '150%' }}>{item?.description}</P14Medium>
            </div>
          </DFlexColumn>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductListDetailFeatures

// ===== Styled Components =====
const CardDesc = styled(Card)`
  border-radius: 0.75rem;
  background: var(--black-50);
`

const Title = styled.p`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`

const Price = styled.p`
  color: var(--primary);
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin: 0;
`

const DiscLabel = styled.div`
  background-color: var(--primary-50);
  clip-path: polygon(0 0, 90% 0, 74% 50%, 90% 100%, 0 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  border-radius: 0.125rem 0 0 0.125rem;
  width: 3.5rem;
  padding: 0.125rem 0.375rem;

  p {
    margin-right: 0.8rem;
    color: var(--primary);
  }
`

const InputGroupText = styled(InputGroup.Text)`
  &.input-group-text {
    background-color: #fff;
    cursor: pointer;
    color: var(--black);
    user-select: none;
    transition: background 0.2s;

    &:hover {
      background-color: var(--primary-50);
      color: var(--primary);
    }
  }
`
