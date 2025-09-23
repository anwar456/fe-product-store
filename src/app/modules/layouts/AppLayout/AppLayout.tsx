import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import AppLayoutHeader from './AppLayoutHeader'

export default function AppLayout() {
  return (
    <>
      <AppLayoutHeader />
      <ContainerWrapper>
        <Outlet />
      </ContainerWrapper>
    </>
  )
}

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0px;
  overflow-y: auto;
  padding: 4rem 6.66667rem;
`
