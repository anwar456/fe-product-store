import { goTo } from '@app/helpers/menu.helper'
import { DFlex } from '@app/styled/flex.styled'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AppsLogo from '../../../../assets/logo/AppsLogo'
import DropdownAvatar from '../DropdownAvatar'

export default function AppLayoutHeader() {
  const { authUser } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  return (
    <>
      <HeaderStyled>
        <div className="cursor-pointer" onClick={() => goTo(authUser, navigate)}>
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
