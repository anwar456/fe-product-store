import { goTo } from '@app/helpers/menu.helper'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P16Medium, P20Medium } from '@app/styled/text.styled'
import errorAnimation from '@assets/animations/404.json'
import Lottie from 'lottie-react'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Error404 = () => {
  const { authUser } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '95vh' }}>
      <DFlexColumn className="justify-content-center align-items-center">
        <div style={{ width: 400, height: 400 }} className="animate__animated animate__zoomIn">
          <Lottie animationData={errorAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
        </div>
        <DFlexColumn className="gap-1 justify-content-center align-items-center animate__animated animate__zoomInUp">
          <P20Medium className="font-weight-600">Page Not Found</P20Medium>
          <P16Medium className="text-muted">Sorry, the page you are looking for is not available.</P16Medium>
        </DFlexColumn>
        <Button variant="primary" className="animate__animated animate__zoomInUp" onClick={() => goTo(authUser, navigate)}>
          Go Back
        </Button>
      </DFlexColumn>
    </Container>
  )
}

export default Error404
