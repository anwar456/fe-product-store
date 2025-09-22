import { IModalData } from '@app/interface/modal.interface'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  modalProps: IModalData
  onHide?: any
  children?: any
  ids?: any
  declineSubmited?: boolean
  callbackTrigger?: boolean
  backdrop?: any
  title?: string
}

export default function ModalForm({ modalProps, onHide, children, ids = 'id', backdrop = 'static', callbackTrigger, ...props }: Props) {
  let [searchParams, setSearchParams] = useSearchParams()
  const { callbackForm } = useSelector((state: any) => state.ui)

  const id = searchParams.get(ids)

  const [modal, setModal] = useState<IModalData>({
    show: id ? true : false,
    approved: false,
    size: modalProps?.size || 'lg',
    scrollable: modalProps?.scrollable || true,
  })

  useEffect(() => {
    setModal({ ...modal, ...modalProps })
  }, [modalProps])

  const modalDecline = () => {
    searchParams.delete(ids)
    setSearchParams(searchParams)
    handleClose()
  }

  const handleClose = () => {
    setTimeout(() => {
      setModal({ ...modal, show: false })
      if (onHide) onHide(false)
    }, 250) // Wait for the animation to finish before hiding
  }

  useEffect(() => {
    if (id) {
      setModal({ ...modal, show: true })
    }
  }, [id])

  useEffect(() => {
    if (callbackForm) {
      // || (modal?.show==false) && searchParams.get(ids)
      modalDecline()
    }
  }, [callbackForm])

  useEffect(() => {
    if (modal?.show == false && searchParams.get(ids)) {
      // || (modal?.show==false) && searchParams.get(ids)
      modalDecline()
    }
  }, [modal?.show])

  return (
    <>
      <Modal
        // className={screenSize?.width <= 765 ? 'modal-data' : ''}
        centered
        backdrop={backdrop}
        keyboard={false}
        size={modal?.size || 'lg'}
        show={modal?.show}
        onHide={modalDecline}
        scrollable={modal?.scrollable}
        dialogClassName={`${
          !modal?.show ? 'animate__animated animate__zoomOut animate__faster' : 'animate__animated animate__zoomIn animate__faster'
        } custom-modal`}
        {...props}
      >
        <Modal.Header className="py-2" closeButton>
          <DFlexColumn className="gap-0">
            <Title className="m-0">{modalProps?.title}</Title>
            <P14Medium className="text-muted">{modalProps?.description}</P14Medium>
          </DFlexColumn>
        </Modal.Header>
        {children}
      </Modal>
    </>
  )
}

export const Title = styled.h4`
  font-size: 1.46rem;
  font-weight: 600;
  width: 57%;
  line-height: 1.5;
`
