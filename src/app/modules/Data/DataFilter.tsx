import SortAscendingIcon from '@app/components/Icons/SortAscendingIcon'
import FormInputSearch from '@app/components/Input/FormInputSearch'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

interface IDataFileter {
  leftFilterComponents?: any
  rightFilterComponents?: any
  callbackSearch?: any
  callbackOrder?: (order: 'asc' | 'desc') => void
}

export default function DataFilter({ leftFilterComponents, rightFilterComponents, callbackSearch, callbackOrder }: IDataFileter) {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handleOrder = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc'
    setOrder(newOrder)
    if (callbackOrder) callbackOrder(newOrder)
  }

  return (
    <WrapperStyled className="w-100">
      <DFlex>
        <FormInputSearch callbackSearch={callbackSearch} />
        {leftFilterComponents}
      </DFlex>
      <DFlex>
        {rightFilterComponents}
        <Button variant="secondary" onClick={handleOrder}>
          <DFlex className="gap-1">
            <motion.div animate={{ rotate: order === 'asc' ? 0 : 180 }} transition={{ duration: 0.3, ease: 'easeInOut' }} style={{ display: 'flex' }}>
              <SortAscendingIcon />
            </motion.div>
            <P14Medium>{order === 'asc' ? 'Asc' : 'Desc'}</P14Medium>
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
