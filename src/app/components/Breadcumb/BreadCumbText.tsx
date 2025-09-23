import { DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium, P20Medium } from '@app/styled/text.styled'
import React from 'react'

export default function BreadCumbText() {
  return (
    <DFlexColumn className="gap-2">
      <P20Medium className="font-weight-600">Daftar Produk</P20Medium>
      <P14Medium className="text-muted">Lihat semua produk yang tersedia di inventaris.</P14Medium>
    </DFlexColumn>
  )
}
