import { DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium, P16Medium } from '@app/styled/text.styled'
import errorAnimation from '@assets/animations/no_data.json'
import Lottie from 'lottie-react'
import React from 'react'

export default function ErrorNoData() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '25rem' }}>
      <DFlexColumn className="align-items-center gap-0">
        <div style={{ width: 300, height: 300 }} className="animate__animated animate__zoomIn">
          <Lottie animationData={errorAnimation} loop autoplay style={{ width: '100%', height: '100%' }} />
        </div>
        <DFlexColumn className="align-items-center gap-1 animate__animated animate__zoomIn" style={{marginTop: '-1rem'}}>
          <P16Medium className="font-weight-600" style={{ color: 'var(--black-700)' }}>
            No Data Found
          </P16Medium>
          <P14Medium className="text-muted">Looks like there’s nothing here yet. Start by adding new data.</P14Medium>
        </DFlexColumn>
      </DFlexColumn>
    </div>
  )
}
