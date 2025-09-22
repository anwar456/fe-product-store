import api from '@app/services/api-request.service'
import { DFlexColumn } from '@app/styled/flex.styled'
import { P12Medium, P14Medium } from '@app/styled/text.styled'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import MonthlySavingChart from '../Charts/MonthlySavingChart'
import { CardSkeleton } from '../Skeleton/CardSkeleton'

export default function CardMonthlySaving() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const getSavingPerUser = async () => {
    setLoading(true)
    try {
      const res = await api.post({
        url: '/statistic/saving/monthly-user',
        data: { filters: [] },
      })
      setData(res?.data?.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSavingPerUser()
  }, [])

  return (
    <>
      {loading ? (
        <CardSkeleton />
      ) : (
        <Card className="h-100">
          <Card.Header className="bg-transparent">
            <DFlexColumn className="gap-0">
              <P14Medium className="font-weight-500">Tabungan Bulan Ini (Per Orang)</P14Medium>
              <P12Medium className="text-muted">Perkembangan tabungan masing-masing individu di bulan ini.</P12Medium>
            </DFlexColumn>
          </Card.Header>
          <Card.Body>
            {data?.length > 0 ? (
              <MonthlySavingChart data={data} />
            ) : (
              <div className='d-flex justify-content-center align-items-center h-100'>
                <p className="text-muted m-0">No Data</p>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  )
}
