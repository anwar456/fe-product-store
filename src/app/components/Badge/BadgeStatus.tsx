import { DFlex } from '@app/styled/flex.styled'
import React from 'react'
import { Badge } from 'react-bootstrap'
import styled from 'styled-components'
import CheckCircleIcon from '../Icons/CheckCircleIcon'
import { P12Medium } from '@app/styled/text.styled'

interface Props {
  status: any
  bg: any
  color: any
  icon: any
}

const BadgeStatus = ({ status, bg, color, icon }: Props) => {
  return (
    <>
      <BadgeStyled $bg={bg} $color={color}>
        <DFlex className="gap-1">
          {icon}
          <P12Medium className="text-capitalize">{status}</P12Medium>
        </DFlex>
      </BadgeStyled>
    </>
  )
}

export default BadgeStatus

const BadgeStyled = styled(Badge)<{ $bg: string; $color: string }>`
  &.badge {
    border-radius: 6.1875rem;
    background: ${(props) => props.$bg} !important;
    color: ${(props) => props.$color};
    padding: 0.2rem 0.5rem;
  }
`
