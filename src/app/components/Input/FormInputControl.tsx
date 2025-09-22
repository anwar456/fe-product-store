import { TInput } from '@app/interface/input.interface'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import CloseEyeIcon from '../Icons/CloseEyeIcon'
import EyeIcon from '../Icons/EyeIcon'
import RequiredInfo from '../Info/RequiredInfo'

interface Props {
  label: string
  placeholder: string
  isInvalid: any
  register: any
  message?: any
  as?: 'textarea' | any
  rows?: any
  type?: TInput
  labelShow?: boolean
  errorDiv?: boolean
  required?: boolean
}

export default function FormInputControl({
  isInvalid,
  register,
  message,
  errorDiv = true,
  label,
  as,
  rows,
  type = 'text',
  placeholder = 'Input',
  labelShow = true,
  required = false,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      {type === 'password' ? (
        <Form.Group className="position-relative">
          {labelShow && (
            <Form.Label>
              {label} {required && <RequiredInfo />}
            </Form.Label>
          )}
          <Form.Control {...(register || {})} isInvalid={isInvalid} type={showPassword ? 'text' : 'password'} placeholder={placeholder} />
          <div
            style={{ top: labelShow ? '2.6rem' : '.7rem' }}
            className="eye-password"
            onClick={(e: any) => {
              e.stopPropagation()
              setShowPassword((prev: any) => !prev)
            }}
          >
            {showPassword ? <EyeIcon /> : <CloseEyeIcon />}
          </div>
          {errorDiv && <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>}
        </Form.Group>
      ) : (
        <Form.Group>
          {labelShow && (
            <Form.Label>
              {label} {required && <RequiredInfo />}
            </Form.Label>
          )}
          <Form.Control {...(register || {})} isInvalid={isInvalid} type={type} placeholder={placeholder} as={as} rows={rows} />
          {errorDiv && <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>}
        </Form.Group>
      )}
    </>
  )
}
