import PlusIcon from '@app/components/Icons/PlusIcon'
import FormInputSearch from '@app/components/Input/FormInputSearch'
import { DFlex, DFlexJustifyBetween, DFlexJustifyEnd } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Button } from 'react-bootstrap'

interface Props {
  onAdd: () => void
  onSearch?: (value: any) => void
}

export default function DataAction({ onAdd, onSearch }: Props) {
  const Wrapper = onSearch ? DFlexJustifyBetween : DFlexJustifyEnd

  return (
    <Wrapper className="w-100">
      {onSearch && <FormInputSearch />}
      <Button onClick={onAdd}>
        <DFlex className="gap-1">
          <PlusIcon /> <P14Medium>Tambah</P14Medium>
        </DFlex>
      </Button>
    </Wrapper>
  )
}
