import Button from '@app/components/Buttons/Button'
import LazyImage from '@app/components/Lazy/LazyImage'
import { DFlex, DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium, P16Medium } from '@app/styled/text.styled'
import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

export default function ProfileImage() {
  const { authUser } = useSelector((state: any) => state.auth)

  return (
    <>
      <Card>
        <Card.Body className="d-flex justify-content-between align-items-center flex-wrap gap-4">
          <DFlex>
            <LazyImage src={`/static/male.svg`} alt="Avatar" defaultImage={`/static/male.svg`} width={80} height={80} className="image-circle" />
            <DFlexColumn className="gap-1">
              <P16Medium className="font-weight-600">{authUser?.name}</P16Medium>
              <P14Medium className="text-muted">PNG, JPG, JPEG dibawah 15MB</P14Medium>
            </DFlexColumn>
          </DFlex>
          <Button text="Change Picture" />
        </Card.Body>
      </Card>
    </>
  )
}
