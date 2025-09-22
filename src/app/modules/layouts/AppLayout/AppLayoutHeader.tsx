import { DFlex, DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { P20Medium } from '@app/styled/text.styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DropdownAvatar from '../DropdownAvatar'
import ModeTheme from '../ModeTheme'

export default function AppLayoutHeader() {
  const navigate = useNavigate()
  return (
    <>
      <HeaderStyled>
        <DFlexJustifyBetween>
          <div className="cursor-pointer" onClick={() => navigate('/home')}>
            <P20Medium className="font-weight-700 text-primary">TABUNGAN</P20Medium>
          </div>
          <DFlexJustifyEnd>
            <DFlex className="gap-2">
              <ModeTheme />
              <DropdownAvatar />
            </DFlex>
          </DFlexJustifyEnd>
        </DFlexJustifyBetween>
      </HeaderStyled>
    </>
  )
}

const HeaderStyled = styled.div`
  padding: 0.6rem 1.6rem;
  border-bottom: 1px solid var(--card-border-color);
  background-color: var(--surface);
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;

  @media (max-width: 576px) {
    padding: 0.6rem 0.8rem;
  }
`
