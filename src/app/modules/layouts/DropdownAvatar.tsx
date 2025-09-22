import ArrowOut from '@app/components/Icons/ArrowOut'
import HomeIcon from '@app/components/Icons/HomeIcon'
import PersonIcon from '@app/components/Icons/PersonIcon'
import WalletIcon from '@app/components/Icons/WalletIcon'
import LazyImage from '@app/components/Lazy/LazyImage'
import ModalConfirm from '@app/components/Modals/ModalConfirm'
import { logoutUser } from '@app/store/reducers/auth'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function DropdownAvatar() {
  const { authUser } = useSelector((state: any) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'far fa-trash',
    description: `Konfirmasi Keluar`,
    subDescriotion: `Apakah kamu yakin ingin keluar dari akun ini? Kamu harus login kembali untuk dapat mengakses aplikasi.`,
    textApproved: 'Keluar',
    classApproved: 'danger',
    textDecline: 'Batal',
  })

  const logout = () => {
    dispatch(logoutUser())
    navigate('/signin')
  }

  const callbackModalConfirm = (approved = false) => {
    if (approved) logout()
    else {
      setModalConfirm((prevState: any) => ({
        ...prevState,
        show: false,
      }))
    }
  }

  const handleLogout = () => {
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }))
  }

  return (
    <>
      <Dropdown>
        <StyledToggle variant="" id="dropdown-avatar">
          <LazyImage src={`/static/male.svg`} alt="Avatar" defaultImage={`/static/male.svg`} width={40} height={40} className="image-circle" />
        </StyledToggle>

        <Dropdown.Menu className="mt-3">
          <Dropdown.Item>
            <P14Medium>Hallo, {authUser?.name}</P14Medium>
          </Dropdown.Item>
          <Dropdown.Divider style={{ border: '1px solid var(--card-border-color) !important' }} />
          <Dropdown.Item className="mb-1" onClick={() => navigate('/home')}>
            <DFlex className="gap-2">
              <HomeIcon />
              <P14Medium>Home</P14Medium>
            </DFlex>
          </Dropdown.Item>
          <Dropdown.Item className="mb-1" onClick={() => navigate('/profile')}>
            <DFlex className="gap-2">
              <PersonIcon />
              <P14Medium>Profil</P14Medium>
            </DFlex>
          </Dropdown.Item>
          <Dropdown.Item className="mb-1" onClick={() => navigate('/saving')}>
            <DFlex className="gap-2">
              <WalletIcon width={20} />
              <P14Medium>Tabungan</P14Medium>
            </DFlex>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="mb-1" onClick={() => handleLogout()}>
            <DFlex className="gap-2">
              <ArrowOut />
              <P14Medium>Logout</P14Medium>
            </DFlex>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <ModalConfirm modalConfirmProps={modalConfirm} callbackModalConfirm={callbackModalConfirm} />
    </>
  )
}

const StyledToggle = styled(Dropdown.Toggle)`
  padding: 0;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;

  &::after {
    display: none !important;
  }
`
