import { Loader } from '@app/styled/loader.styled'
import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

interface Props {
  loading?: boolean
  text: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({ loading, text = 'Button', onClick, variant = 'primary', type = 'button', className }: Props) {
  return (
    <BootstrapButton onClick={onClick} variant={variant} type={type} className={className}>
      {text} {loading && <Loader color="#fff" size={23} />}
    </BootstrapButton>
  )
}
