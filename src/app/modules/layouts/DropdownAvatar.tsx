import ArrowOut from '@app/components/Icons/ArrowOut'
import CarretDownIcon from '@app/components/Icons/CarretDownIcon'
import HomeIcon from '@app/components/Icons/HomeIcon'
import PersonIcon from '@app/components/Icons/PersonIcon'
import LazyImage from '@app/components/Lazy/LazyImage'
import ModalConfirm from '@app/components/Modals/ModalConfirm'
import { usePermission } from '@app/hook/permission.hook'
import api from '@app/services/api-request.service'
import { logoutUser } from '@app/store/reducers/auth'
import { DFlex } from '@app/styled/flex.styled'
import { P14Medium } from '@app/styled/text.styled'
import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  isUser?: boolean
}
export default function DropdownAvatar({ isUser = false }: Props) {
  const { authUser } = useSelector((state: any) => state.auth)
  const { checkingPermissionAccess } = usePermission()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const allowProduct = checkingPermissionAccess({ permissionId: authUser?.permissionId, access: 'view', id: 'vgoif' })
  const allowProductList = checkingPermissionAccess({ permissionId: authUser?.permissionId, access: 'view', id: 'qkcmw' })
  const allowuser = checkingPermissionAccess({ permissionId: authUser?.permissionId, access: 'view', id: 'qeuln' })

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

  const logout = async () => {
    try {
      await api.post({
        url: '/auth/logout',
      })
      dispatch(logoutUser())
      navigate('/signin')
    } catch (error) {
      console.log(error)
    }
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

  const handleLogout = async () => {
    setModalConfirm((prevState: any) => ({
      ...prevState,
      show: true,
    }))
  }

  return (
    <>
      <Dropdown>
        <StyledToggle variant="" id="dropdown-avatar">
          <DFlex className={`${isUser ? 'text-white' : ''}`}>
            <CarretDownIcon />
            <P14Medium>{authUser?.name}</P14Medium>
            <LazyImage src={`/static/male.svg`} alt="Avatar" defaultImage={`/static/male.svg`} width={40} height={40} className="image-circle" />
          </DFlex>
        </StyledToggle>

        <Dropdown.Menu className="animate__animated animate__zoomIn animate__faster mt-3">
          <Dropdown.Item>
            <P14Medium>Hallo, {authUser?.name}</P14Medium>
          </Dropdown.Item>
          {(allowProduct || allowuser || allowProductList) && <Dropdown.Divider style={{ border: '1px solid var(--card-border-color) !important' }} />}
          {allowProduct && (
            <Dropdown.Item className="mb-1" onClick={() => navigate('/product')}>
              <DFlex className="gap-2">
                <HomeIcon />
                <P14Medium>Product</P14Medium>
              </DFlex>
            </Dropdown.Item>
          )}
          {allowProductList && (
            <Dropdown.Item className="mb-1" onClick={() => navigate('/product-list')}>
              <DFlex className="gap-2">
                <HomeIcon />
                <P14Medium>Product List</P14Medium>
              </DFlex>
            </Dropdown.Item>
          )}
          {allowuser && (
            <Dropdown.Item className="mb-1" onClick={() => navigate('/management-user')}>
              <DFlex className="gap-2">
                <PersonIcon />
                <P14Medium>User Management</P14Medium>
              </DFlex>
            </Dropdown.Item>
          )}
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
