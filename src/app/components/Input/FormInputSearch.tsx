import React from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

export default function FormInputSearch() {
  return (
    <>
      <InputSearch type="text" placeholder="Search..." />
    </>
  )
}

const InputSearch = styled(Form.Control)`
  width: 55%;

  @media (min-width: 576px) {
    width: 50%;
  }

  @media (min-width: 768px) {
    width: 20%;
  }
`
