import { MENU } from '@app/config/menu.config'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P14Medium, P20Medium } from '@app/styled/text.styled'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function BreadCumbText() {
  const { pathname } = useLocation()
  const BREADCUMB_DATA = MENU?.find((item: any) => item?.path === pathname)

  return (
    <DFlexColumn className="gap-2">
      <P20Medium className="font-weight-600">{BREADCUMB_DATA?.display}</P20Medium>
      <P14Medium className="text-muted">{BREADCUMB_DATA?.seo?.description}</P14Medium>
    </DFlexColumn>
  )
}
