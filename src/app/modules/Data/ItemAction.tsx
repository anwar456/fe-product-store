import DotDotIcon from '@app/components/Icons/DotDotIcon'
import { P14Medium } from '@app/styled/text.styled'
import { nanoid } from 'nanoid'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const defaultActionTitle = {
  delete: 'Delete',
  detail: 'Detail',
  edit: 'Edit',
}

export default function ItemAction({ item, handleDetail, handleEdit, handleDelete, actionTitle, verticalToggler = false, onToggle }: IDropdownActionData) {
  return (
    <>
      <Dropdown className="hide-toogle hide-focus" drop="start" onToggle={onToggle}>
        <StyledToggle variant="" id={`dropdown-act-${nanoid()}`}>
          <RotateComponent value={verticalToggler ? '90' : '0'}>
            <DotDotIcon />
          </RotateComponent>
        </StyledToggle>
        <Dropdown.Menu>
          {handleDetail && (
            <Dropdown.Item onClick={() => handleDetail(item)}>
              <P14Medium>{actionTitle?.detail || defaultActionTitle?.detail}</P14Medium>
            </Dropdown.Item>
          )}
          {handleEdit && (
            <Dropdown.Item onClick={() => handleEdit(item)}>
              <P14Medium>{actionTitle?.edit || defaultActionTitle?.edit}</P14Medium>
            </Dropdown.Item>
          )}
          {handleDelete && (
            <Dropdown.Item onClick={() => handleDelete(item)}>
              {/* <TrashIcon /> */}
              <P14Medium style={{ color: 'var(--danger)' }}>{actionTitle?.delete || defaultActionTitle?.delete}</P14Medium>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

interface IDropdownActionData {
  item?: any
  handleDetail?: any
  handleEdit?: any
  handleDelete?: any
  actionTitle?: {
    detail?: string | React.ReactNode
    edit?: string | React.ReactNode
    delete?: string | React.ReactNode
  }
  verticalToggler?: boolean
  onToggle?: any
}

const RotateComponent = styled.div<{ value: string }>`
  transform: rotate(${(props) => props.value}deg);
  width: fit-content;
  height: fit-content;
`

const StyledToggle = styled(Dropdown.Toggle)`
  padding: 0;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  &.text-danger {
    color: var(--danger);
  }
  &::after,
  &::before {
    display: none !important;
  }
`
