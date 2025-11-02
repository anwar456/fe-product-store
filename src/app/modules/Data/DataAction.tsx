import BreadCumbText from '@app/components/Breadcumb/BreadCumbText'
import PlusIcon from '@app/components/Icons/PlusIcon'
import { DFlex, DFlexJustifyBetween } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Button } from 'react-bootstrap'

interface Props {
  onAdd: () => void
  addLabel?: string
  isUpdateStock?: boolean
}

export default function DataAction({ onAdd, addLabel = 'Tambah Produk', isUpdateStock = true }: Props) {
  return (
    <DFlexJustifyBetween className="w-100 mb-4">
      <BreadCumbText />
      <DFlex>
        {isUpdateStock && (
          <Button onClick={onAdd} variant="secondary">
            <P14Medium>Perbarui Stok Produk</P14Medium>
          </Button>
        )}
        <Button onClick={onAdd}>
          <DFlex className="gap-1">
            <PlusIcon /> <P14Medium>{addLabel}</P14Medium>
          </DFlex>
        </Button>
      </DFlex>
    </DFlexJustifyBetween>
  )
}
