import React from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

export const ToastNotification = () => {
  return <ToastStyled position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable theme="light" />
}

const ToastStyled = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 0.8rem !important;
    overflow: hidden !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .Toastify__progress-bar {
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
  }

  .Toastify__toast--enter,
  .Toastify__toast--exit {
    border-radius: 0.8rem !important;
  }

  .Toastify__toast-body {
    font-size: 0.95rem;
  }
`
