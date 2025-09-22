import { IICon } from '@app/interface/icon.interface'
import React from 'react'

export default function PlusIcon({ width = 16 }: IICon) {
  return (
    <svg width={width} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 3.33331V12.6666" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.3335 8H12.6668" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
