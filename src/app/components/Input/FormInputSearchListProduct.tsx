import { DFlex } from '@app/styled/flex.styled'
import { debounce } from 'lodash'
import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import SearchIcon from '../Icons/SearchIcon'

interface IFormInputSearchListProduct {
  callbackSearch: (value: string) => void
}

const FormInputSearchListProduct = ({ callbackSearch }: IFormInputSearchListProduct) => {
  const sendParams = (value: any) => {
    if (callbackSearch) callbackSearch(value || '')
  }

  const debouncedSendRequest = debounce(sendParams, 0)

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    debouncedSendRequest(value)
  }
  
  return (
    <DFlex className="gap-3">
      <InputSearch type="text" placeholder="Cari produk" onChange={handleOnChangeSearch}/>
      <StyledButton>
        <SearchIcon />
      </StyledButton>
    </DFlex>
  )
}

export default FormInputSearchListProduct

const InputSearch = styled(Form.Control)`
  background-color: #fff;
  width: 55vw;
  border-radius: 10rem;
  height: 3.46667rem;
  &:focus,
  &:focus-visible {
    outline: none !important;
    box-shadow: none !important;
    border: 1px solid #e0e0e0; 
  }
`

const StyledButton = styled.div`
  background-color: var(--primary);
  border-radius: 10rem;
  height: 3.46667rem;
  width: 3.46667rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
