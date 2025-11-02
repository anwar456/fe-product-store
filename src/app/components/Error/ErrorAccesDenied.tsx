import { DFlexColumn } from '@app/styled/flex.styled'
import { P16Medium, P20Medium } from '@app/styled/text.styled'
import errorAnimation from '@assets/animations/access_denied.json'
import Lottie from 'lottie-react'
import React from 'react'
import { Button } from 'react-bootstrap'

const ErrorAccesDenied = () => {
  return (
    <DFlexColumn className="justify-content-center align-items-center gap-4" style={{ minHeight: '100vh' }}>
      <div style={{ width: 150, height: 150 }} className="animate__animated animate__zoomIn mb-4">
        <Lottie animationData={errorAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
      </div>
      <DFlexColumn className="justify-content-center align-items-center gap-2 text-center animate__animated animate__zoomInUp">
        <P20Medium className="font-weight-600">Access Denied</P20Medium>
        <P16Medium className="text-muted">You do not have permission to access this page</P16Medium>
      </DFlexColumn>
      <Button variant="primary" className="animate__animated animate__zoomInUp" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </DFlexColumn>
  )
}

export default ErrorAccesDenied
