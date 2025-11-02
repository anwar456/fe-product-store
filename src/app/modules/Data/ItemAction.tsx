import DotDotIcon from '@app/components/Icons/DotDotIcon'
import { EditIconV2 } from '@app/components/Icons/EditIcon'
import LockIcon from '@app/components/Icons/LockIcon'
import { TrashIconV2 } from '@app/components/Icons/TrashIcon'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import { nanoid } from 'nanoid'
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

const defaultActionTitle = {
  delete: 'Delete',
  detail: 'Detail',
  edit: 'Edit',
  reset: 'Reset Password',
}

export default function ItemAction({
  item,
  handleDetail,
  hanldeResetPw,
  handleEdit,
  handleDelete,
  actionTitle,
  verticalToggler = false,
  onToggle,
  onDetail,
}: IDropdownActionData) {
  return (
    <>
      <DFlex>
        {onDetail && (
          <div role="button" onClick={onDetail}>
            <P14Medium className="text-primary font-weight-600">Lihat Detail</P14Medium>
          </div>
        )}
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
                <DFlex className="gap-3">
                  <EditIconV2 />
                  <P14Medium>{actionTitle?.edit || defaultActionTitle?.edit}</P14Medium>
                </DFlex>
              </Dropdown.Item>
            )}
            {hanldeResetPw && (
              <Dropdown.Item onClick={() => hanldeResetPw(item)}>
                <DFlex className="gap-3">
                  <LockIcon />
                  <P14Medium>{defaultActionTitle?.reset}</P14Medium>
                </DFlex>
              </Dropdown.Item>
            )}
            {handleDelete && (
              <Dropdown.Item onClick={() => handleDelete(item)}>
                <DFlex className="gap-3">
                  <TrashIconV2 />
                  <P14Medium style={{ color: 'var(--danger)' }}>{actionTitle?.delete || defaultActionTitle?.delete}</P14Medium>
                </DFlex>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </DFlex>
    </>
  )
}

interface IDropdownActionData {
  item?: any
  handleDetail?: any
  handleEdit?: any
  handleDelete?: any
  hanldeResetPw?: any
  actionTitle?: {
    detail?: string | React.ReactNode
    edit?: string | React.ReactNode
    delete?: string | React.ReactNode
  }
  verticalToggler?: boolean
  onToggle?: any
  onDetail?: any
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
