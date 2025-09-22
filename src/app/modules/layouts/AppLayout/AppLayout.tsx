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
        <Container className="py-3">
          <Outlet />
        </Container>
      </ContainerWrapper>
    </>
  )
}

const ContainerWrapper = styled.div`
  position: relative;
  margin: 0px;
  padding-top: 4rem;
  overflow-y: auto;
`
