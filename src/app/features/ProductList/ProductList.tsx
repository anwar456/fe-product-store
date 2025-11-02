import ImageIcon from '@app/components/Icons/ImageIcon'
import StarIcon from '@app/components/Icons/StarIcon'
import { formatRupiah } from '@app/helpers/number.helper'
import DataListScroll from '@app/modules/DataList/DataListScroll'
import { DFlex, DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium, P16Medium } from '@app/styled/text.styled'
import { motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import { Card, Col } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface IProductList {
  paramsFilters: any
}

const ProductList = ({ paramsFilters }: IProductList) => {
  const navigate = useNavigate()
  const [dataSelected, setDataSelected] = useState<any>()
  const [respData, setRespData] = useState<any[]>([])

  const dataResult = useMemo(() => {
    return respData?.map((item: any, i: number) => (
      <Col md={3} key={item.id}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (i % 12) * 0.05 }}
          viewport={{ once: true, amount: 0.2 }}
          className="h-100"
        >
          <CardCustom className="h-100" onClick={() => navigate(`/product-list/detail/${item?.id}`)}>
            <div className="image-wrapper">
              <Card.Img variant="top" src={item.images?.[0]?.url} alt={item.name} />
            </div>
            <Card.Body className="mt-3">
              <P16Medium className="font-weight-500 text-capitalize">{item.name}</P16Medium>
              <DFlex className="mt-4 gap-2">
                <Price>{formatRupiah(item?.price)}</Price>
                <DiscLabel>
                  <P12Medium className="font-weight-500">-12%</P12Medium>
                </DiscLabel>
              </DFlex>
              <DFlex className="mt-3 gap-2">
                <StarIcon />
                <P14Medium>4.9</P14Medium>
                <Dot />
                <P14Medium>121 Terjual</P14Medium>
              </DFlex>
            </Card.Body>
          </CardCustom>
        </motion.div>
      </Col>
    ))
  }, [respData])

  return (
    <Container>
      <DFlexColumn className="gap-0">
        <Title>Rekomendasi</Title>
        <P14Medium className="text-muted">Produk - produk pilihan terbaik dari kami</P14Medium>
      </DFlexColumn>

      <DataWrapper>
        <DataListScroll filterParams={paramsFilters} selected={dataSelected} path={'/product'} respDataApi={setRespData} skeleton={<DataSkeleton />}>
          {dataResult}
        </DataListScroll>
      </DataWrapper>
    </Container>
  )
}

export default ProductList

const DataSkeleton = () => {
  return (
    <Col md={3}>
      <CardCustom className="h-100">
        <Card.Header className="p-0 border-0 bg-transparent position-relative">
          <ImageDefault>
            <ImageIcon width={80} fill={'#c9c9c9'} />
          </ImageDefault>
          <div style={{ marginTop: '-.25rem' }}>
            <Skeleton height={180} style={{ borderRadius: '.70rem .70rem 0 0' }} />
          </div>
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-2 mt-3">
          <Skeleton height={30} width={'100%'} />
          <Skeleton height={30} width={'100%'} />
          <Skeleton height={30} width={'100%'} />
        </Card.Body>
      </CardCustom>
    </Col>
  )
}

const Container = styled.div`
  padding: 2rem 4rem;
`

const Title = styled.h1`
  color: var(--black);
  font-size: 1.66667rem;
  font-weight: 600;
  line-height: 120%;
`

const DataWrapper = styled.div`
  margin-top: 1.5rem;
`

const CardCustom = styled(Card)`
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;

  .image-wrapper {
    overflow: hidden;
    background: var(--black-50);
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
      transition: transform 0.5s ease;
    }
  }

  &:hover {
    img {
      transform: scale(1.08);
    }
  }
`

const Price = styled.p`
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 140%;
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

export const Dot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #e6e9f0;
  border-radius: 10rem;
`

const ImageDefault = styled.div`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
