import { DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Card } from 'react-bootstrap'
import ProgressRingChart from '../Charts/ProgressRingChart'

interface Props {
  total: any
}

export default function CardProgressGlobal({ total }: Props) {
  return (
    <>
      <Card className="h-100">
        <Card.Header className="bg-transparent">
          <DFlexColumn className="gap-0">
            <P14Medium className="font-weight-500">Total Progress</P14Medium>
            <P12Medium className="text-muted">Total tabungan dibandingkan dengan target keseluruhan.</P12Medium>
          </DFlexColumn>
        </Card.Header>
        <Card.Body>
          <ProgressRingChart totalSaved={total} target={60000000} />
        </Card.Body>
      </Card>
    </>
  )
}
