import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import SearchIcon from '../Icons/SearchIcon'

export default function FormInputSearch() {
  return (
    <div className="position-relative">
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <InputSearch type="text" placeholder="Cari produk" />
    </div>
  )
}

const InputSearch = styled(Form.Control)`
  width: 18.33333rem;
  padding: 0.5rem 2rem;
  /* height: 2rem; */
`

const IconWrapper = styled.div`
  position: absolute;
  top: 0.46rem;
  left: 0.5rem;
`
