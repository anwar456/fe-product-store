import { DFlex } from '@app/styled/flex.styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import DropdownAvatar from '../DropdownAvatar'
import AppsLogo from '../../../../assets/logo/AppsLogo'

export default function AppLayoutHeader() {
  const navigate = useNavigate()
  return (
    <>
      <HeaderStyled>
        <div className="cursor-pointer" onClick={() => navigate('/home')}>
          <AppsLogo />
        </div>
        <DFlex className="gap-2">
          {/* <ModeTheme /> */}
          <DropdownAvatar />
        </DFlex>
      </HeaderStyled>
    </>
  )
}

const HeaderStyled = styled.div`
  border-bottom: 1px solid var(--card-border-color);
  display: flex;
  height: 4rem;
  padding: 0 6.66667rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 576px) {
    padding: 0.6rem 0.8rem;
  }
`
