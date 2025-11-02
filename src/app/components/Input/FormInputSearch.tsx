import { debounce } from 'lodash'
import React, { ChangeEvent } from 'react'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'
import SearchIcon from '../Icons/SearchIcon'

interface IFormInputSearch {
  callbackSearch: (value: string) => void
}

export default function FormInputSearch({ callbackSearch }: IFormInputSearch) {
  const sendParams = (value: any) => {
    if (callbackSearch) callbackSearch(value || '')
  }

  const debouncedSendRequest = debounce(sendParams, 0)

  const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    debouncedSendRequest(value)
  }

  return (
    <div className="position-relative">
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
      <InputSearch type="text" placeholder="Cari" onChange={handleOnChangeSearch}/>
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
