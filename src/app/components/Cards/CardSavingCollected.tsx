import { formatRupiah } from '@app/helpers/number.helper'
import { BadgeIcon } from '@app/styled/badge-icon.styled'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P16Medium, P20Medium } from '@app/styled/text.styled'
import React from 'react'
import { Card } from 'react-bootstrap'
import WalletIcon from '../Icons/WalletIcon'

interface Props {
  total: number
}
export default function CardSavingCollected({ total }: Props) {
  return (
    <>
      <Card className="p-4 h-100">
        <DFlexColumn className="justify-content-center align-items-center gap-4">
          <P16Medium className="font-weight-500">Tabungan Terkumpul</P16Medium>
          <BadgeIcon>
            <WalletIcon width={40} />
          </BadgeIcon>
          <P20Medium className="font-weight-600 text-primary">{formatRupiah(total)}</P20Medium>
        </DFlexColumn>
      </Card>
    </>
  )
}
