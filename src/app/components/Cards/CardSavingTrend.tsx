import api from '@app/services/api-request.service'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium } from '@app/styled/text.styled'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import SavingTrendChart from '../Charts/SavingTrendChart'
import { CardSkeleton } from '../Skeleton/CardSkeleton'

export default function CardSavingTrend() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getSavingLast5Month = async () => {
    setLoading(true)
    try {
      const res = await api.post({
        url: '/statistic/saving/trend',
        data: { filters: [] },
      })
      setData(res?.data?.data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSavingLast5Month()
  }, [])

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card className="h-100">
          <Card.Header className="bg-transparent">
            <DFlexColumn className="gap-0">
              <P14Medium className="font-weight-500">Tren Tabungan (Per Bulan)</P14Medium>
              <P12Medium className="text-muted">Tren total tabungan bulanan dari seluruh pengguna.</P12Medium>
            </DFlexColumn>
          </Card.Header>
          <Card.Body>
            <SavingTrendChart data={data} />
          </Card.Body>
        </Card>
      )}
    </>
  )
}
