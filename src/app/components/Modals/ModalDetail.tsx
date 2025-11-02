import { DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { Title } from './ModalForm'

interface Props {
  modalProps: any
  onHide: () => void
  children: any
}

const ModalDetail = ({ modalProps, onHide, children }: Props) => {
  return (
    <Modal
      centered
      keyboard={false}
      size={modalProps?.size || 'lg'}
      show={modalProps?.show}
      onHide={onHide}
      scrollable={modalProps?.scrollable}
      dialogClassName={`${
        !modalProps?.show ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__zoomIn animate__faster'
      } custom-modal`}
    >
      <Modal.Header className="py-2" closeButton>
        <DFlexColumn className="gap-1">
          <Title className="m-0">{modalProps?.title}</Title>
          <P14Medium className="text-muted" style={{ fontSize: '0.875rem' }}>
            {modalProps?.description}
          </P14Medium>
        </DFlexColumn>
      </Modal.Header>
      {children}
    </Modal>
  )
}

export default ModalDetail
