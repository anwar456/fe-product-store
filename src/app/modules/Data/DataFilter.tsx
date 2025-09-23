import CarretDownIcon from '@app/components/Icons/CarretDownIcon'
import PlusIcon from '@app/components/Icons/PlusIcon'
import SortAscendingIcon from '@app/components/Icons/SortAscendingIcon'
import FormInputSearch from '@app/components/Input/FormInputSearch'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

export default function DataFilter() {
  return (
    <WrapperStyled className="w-100">
      <DFlex>
        <FormInputSearch />
        <Dropdown>
          <Dropdown.Toggle variant="">
            <DFlex>
              <P14Medium>Semua Kategori</P14Medium>
              <CarretDownIcon />
            </DFlex>
          </Dropdown.Toggle>

          <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="">
            <DFlex>
              <P14Medium>Semua Status</P14Medium>
              <CarretDownIcon />
            </DFlex>
          </Dropdown.Toggle>

          <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
            <Dropdown.Item>Menipis</Dropdown.Item>
            <Dropdown.Item>Aktif</Dropdown.Item>
            <Dropdown.Item>Nonaktif</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </DFlex>
      <DFlex>
        <DFlex className="gap-2">
          <P14Medium className="font-weight-500">Urutkan:</P14Medium>
          <Dropdown>
            <Dropdown.Toggle variant="">
              <DFlex>
                <P14Medium>Nama Produk</P14Medium>
                <CarretDownIcon />
              </DFlex>
            </Dropdown.Toggle>

            <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster">
              <Dropdown.Item>Nama Produk</Dropdown.Item>
              <Dropdown.Item>Kategori</Dropdown.Item>
              <Dropdown.Item>Stok</Dropdown.Item>
              <Dropdown.Item>Harga</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </DFlex>
        <Button variant="secondary">
          <DFlex className="gap-1">
            <SortAscendingIcon />
            <P14Medium>Asc</P14Medium>
          </DFlex>
        </Button>
      </DFlex>
    </WrapperStyled>
  )
}

const WrapperStyled = styled.div`
  display: flex;
  width: 106.66667rem;
  padding: 1.33333rem 1.66667rem;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--black-100);
  border-left: 1px solid var(--black-100);
  border-right: 1px solid var(--black-100);
  border-bottom: none;
  border-radius: 1rem 1rem 0 0;
`
