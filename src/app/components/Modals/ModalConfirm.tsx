import { DFlex } from '@app/styled/flex.styled'
import { P16Medium } from '@app/styled/text.styled'
import React, { FC, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import styled from 'styled-components'

const Icon = styled.div`
  font-size: 2rem;
`
const Desc = styled.p`
  line-height: 1.5;
`

type Props = {
  modalConfirmProps: any
  callbackModalConfirm: any
}

const ModalConfirm: FC<Props> = ({ modalConfirmProps, callbackModalConfirm }) => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-solid fa-triangle-exclamation',
    description: `Delete Confirmation`,
    subDescriotion: `If you delete this data you can't undone. Are you sure?`,
    textApproved: 'Yes',
    classApproved: 'primary',
    textDecline: 'No',
  })

  useEffect(() => {
    if (modalConfirmProps?.show) setClicked(false)
    setModalConfirm({ ...modalConfirmProps })
  }, [modalConfirmProps])

  const modalConfirmDecline = () => {
    setModalConfirm({ ...modalConfirm, show: false })
    callbackModalConfirm(false)
  }

  const modalConfirmAccept = () => {
    setClicked(true)
    setModalConfirm({
      ...modalConfirm,
      show: false,
      approved: true,
    })
    callbackModalConfirm(true)
  }

  return (
    <Modal
      className="confirm-delete"
      backdrop="static"
      keyboard={false}
      style={{ maxWidth: modalConfirm.size || '500px' }}
      show={modalConfirm.show}
      onHide={modalConfirmDecline}
      centered
      dialogClassName={`${
        !modalConfirm?.show ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__zoomIn animate__faster'
      } custom-modal`}
    >
      <Modal.Body className="p-3">
        <DFlex className="mb-1">
          <P16Medium className="my-2 font-weight-600">{modalConfirm.description}</P16Medium>
        </DFlex>
        {modalConfirm.subDescriotion && (
          <Desc
            className="text-muted"
            dangerouslySetInnerHTML={{
              __html: modalConfirm.subDescriotion,
            }}
          ></Desc>
        )}
      </Modal.Body>
      <Modal.Footer className="py-2">
        <div className="d-flex justify-content-between gap-2 w-100">
          <Button variant="secondary" className="w-50" onClick={modalConfirmDecline}>
            {modalConfirm.textDecline || 'No'}
          </Button>
          <Button variant="danger" className={`w-50 text-white`} onClick={modalConfirmAccept} disabled={clicked}>
            {modalConfirm.textApproved || 'Yes'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm
