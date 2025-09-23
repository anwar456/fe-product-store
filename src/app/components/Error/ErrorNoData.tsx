import { DFlexColumn } from '@app/styled/flex.styled'
import React from 'react'
import { P16Medium, P20Medium } from '@app/styled/text.styled'

export default function ErrorNoData() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '25rem' }}>
      <DFlexColumn className="align-items-center gap-0">
        <iframe
          src="https://lottie.host/embed/7e522e62-12d6-47be-b5bb-440ebe0390fe/1F4zrRdriy.lottie"
          className="animate__animated animate__zoomIn"
          style={{
            width: '15rem',
            height: '15rem',
            border: 'none',
            marginBottom: '-1rem',
            marginTop: '-3rem',
            animationDelay: '0.1s',
          }}
        />
        <P20Medium className="font-weight-600 mb-2 animate__animated animate__fadeInUp" style={{ color: 'var(--black-700)', animationDelay: '0.4s' }}>
          No Data Found
        </P20Medium>
        <P16Medium className="animate__animated animate__fadeInUp" style={{ color: 'var(--black-500)', animationDelay: '0.7s' }}>
          Looks like there’s nothing here yet. Start by adding new data.
        </P16Medium>
      </DFlexColumn>
    </div>
  )
}
