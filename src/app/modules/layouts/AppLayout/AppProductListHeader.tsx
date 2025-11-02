import { DFlex } from '@app/styled/flex.styled'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AppLogoWhite } from '../../../../assets/logo/AppsLogo'
import DropdownAvatar from '../DropdownAvatar'

export default function AppProductListHeader() {
  const navigate = useNavigate()
  return (
    <>
      <HeaderStyled>
        <div className="cursor-pointer" onClick={() => navigate('/home')}>
          <AppLogoWhite />
        </div>
        <DFlex className="gap-2">
          {/* <ModeTheme /> */}
          <DropdownAvatar isUser />
        </DFlex>
      </HeaderStyled>
    </>
  )
}

const HeaderStyled = styled.div`
  position: absolute;
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: 0;
  z-index: 10;
  @media (max-width: 576px) {
    padding: 0.6rem 0.8rem;
  }
`
