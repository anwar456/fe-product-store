import { DFlexColumn } from '@app/styled/flex.styled'
import React from 'react'
import styled from 'styled-components'
import FormInputSearchListProduct from '../Input/FormInputSearchListProduct'

interface IProductListBanner {
  callbackSearch: any
}

const ProductListBanner = ({ callbackSearch }: IProductListBanner) => {
  return (
    <ImageBanner>
      <Overlay />
      <DFlexColumn className="align-items-center justify-content-center" style={{ zIndex: 2, position: 'relative', marginTop: '5.5rem' }}>
        <Content className="animate__animated animate__fadeInDown">
          <h2>Cari Furnitur Impian</h2>
          <p>Cari furnitur mulai dari meja, lemari, hingga rak disini</p>
        </Content>
        <SearchWrapper className="animate__animated animate__fadeInUp">
          <FormInputSearchListProduct callbackSearch={callbackSearch} />
        </SearchWrapper>
      </DFlexColumn>
    </ImageBanner>
  )
}

export default ProductListBanner

const ImageBanner = styled.div`
  background-image: url('/static/background.png');
  width: 100%;
  height: 30rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  overflow: hidden;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`

const Content = styled.div`
  text-align: center;
  max-width: 800px;

  h2 {
    color: #fff;
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1rem;
  }
`

const SearchWrapper = styled.div`
  position: relative;
  z-index: 2;
`
