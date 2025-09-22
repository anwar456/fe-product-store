import { getSavingEstimation } from '@app/helpers/predict.helper'
import api from '@app/services/api-request.service'
import { BadgeIcon } from '@app/styled/badge-icon.styled'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium, P16Medium } from '@app/styled/text.styled'
import React, { useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import styled from 'styled-components'
import CalendarIcon from '../Icons/CalendarIcon'
import { CardSkeleton } from '../Skeleton/CardSkeleton'

interface Props {
  total: number
}

export default function CardTimeAchieved({ total }: Props) {
  const [monthlAverage, setMonthlyAverage] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const getTotal = async () => {
    setLoading(true)
    try {
      const res = await api.post({
        url: '/statistic/saving/monthly-average',
        data: { filters: [] },
      })
      setMonthlyAverage(res?.data?.monthlyAverage)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!total) getTotal()
  }, [total])

  const { estimatedDate, status } = getSavingEstimation(total, 60000000, monthlAverage)

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card className="p-4 h-100">
          <DFlexColumn className="align-items-center gap-2">
            <P16Medium className="font-weight-500">Estimasi Waktu Tercapai</P16Medium>
            <BadgeIcon>
              <CalendarIcon width={40} />
            </BadgeIcon>
            <DFlexColumn className="gap-2 mt-2 align-items-center">
              <P14Medium>{estimatedDate}</P14Medium>
              <EstimationBadge>{status}</EstimationBadge>
            </DFlexColumn>
            <P12 className="text-muted">(Berdasarkan rata-rata penambahan per bulan)</P12>
          </DFlexColumn>
        </Card>
      )}
    </>
  )
}

const EstimationBadge = styled(Badge)`
  background-color: var(--danger-light) !important;
  color: var(--danger) !important;
  padding: 0.4rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
`

const P12 = styled(P12Medium)`
  font-style: italic !important;
  color: var(--black);
`
