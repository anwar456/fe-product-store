import MoonIcon from '@app/components/Icons/MoonIcon'
import SunIcon from '@app/components/Icons/SunIcon'
import { P16Medium } from '@app/styled/text.styled'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  isLabel?: boolean
}

export default function ModeTheme({ isLabel = false }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Ambil dari localStorage saat pertama kali render
    const stored = localStorage.getItem('theme')
    return stored === 'dark'
  })
  

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme) // Simpan ke localStorage
  }, [isDarkMode])

  return (
    <>
      {isLabel && <P16Medium className="font-weight-600">{isDarkMode ? 'Dark' : 'Light'}</P16Medium>}
      <IconWrapper onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle theme">
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </IconWrapper>
    </>
  )
}

const fadeIn = keyframes`
  from { opacity: 0; transform: rotate(-90deg) scale(0.8); }
  to { opacity: 1; transform: rotate(0deg) scale(1); }
`

const IconWrapper = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  svg {
    width: 35px;
    height: 35px;
    animation: ${fadeIn} 0.3s ease;
    transition: all 0.3s ease;
  }
`
