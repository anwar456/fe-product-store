import LazyImage from '@app/components/Lazy/LazyImage'
import { calculateProgress, formatRupiah } from '@app/helpers/number.helper'
import { timeFormat } from '@app/helpers/time.helpers'
import { DFlex, DFlexColumn, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P12Medium, P14Medium, P16Medium } from '@app/styled/text.styled'
import React from 'react'
import { Card, ProgressBar } from 'react-bootstrap'

interface Props {
  item: any
}

export default function CardSavingSummary({ item }: Props) {
  return (
    <Card className="h-100">
      <Card.Header className="pb-2 pt-3 bg-transparent border-0">
        <DFlex className="gap-2">
          <LazyImage src={item?.image || '/static/male.svg'} defaultImage="/static/male.svg" />
          <P16Medium className="font-weight-500">{item?.name}</P16Medium>
        </DFlex>
      </Card.Header>
      <Card.Body>
        <DFlexColumn className="w-100 gap-2">
          {item?.amount !== 15000000 && (
            <DFlexJustifyBetween className="w-100">
              <P14Medium className="font-weight-500">{formatRupiah(item?.amount)}</P14Medium>
              <P14Medium className="font-weight-500">Rp.15.000.000</P14Medium>
            </DFlexJustifyBetween>
          )}
          {item?.amount === 15000000 && <P14Medium className="font-weight-500 text-success text-capitalize">Telah Tercapai</P14Medium>}
          <ProgressBar now={calculateProgress(item?.amount, 15000000)} label={`${calculateProgress(item?.amount, 15000000)}%`} className="w-100" />
        </DFlexColumn>
      </Card.Body>
      <Card.Footer className="bg-transparent border-0 pt-0">
        <P12Medium className="text-muted">Pembaruan Terakhir: {timeFormat(item?.lastUpdated, 'DD/MMM/YYYY HH:mm')}</P12Medium>
      </Card.Footer>
    </Card>
  )
}
