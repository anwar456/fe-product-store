import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import AppProductListHeader from './AppProductListHeader'

export default function AppProductListLayout() {
  return (
    <>
      <ContainerWrapper>
        <AppProductListHeader />
        <Outlet />
      </ContainerWrapper>
    </>
  )
}

const ContainerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`
