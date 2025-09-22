import CardMonthlySaving from '@app/components/Cards/CardMonthlySaving'
import CardProgressGlobal from '@app/components/Cards/CardProgressGlobal'
import CardSavingCollected from '@app/components/Cards/CardSavingCollected'
import CardSavingSummary from '@app/components/Cards/CardSavingSummary'
import CardSavingTrend from '@app/components/Cards/CardSavingTrend'
import CardTimeAchived from '@app/components/Cards/CardTimeAchieved'
import { CardSkeleton } from '@app/components/Skeleton/CardSkeleton'
import api from '@app/services/api-request.service'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

export default function HomeFeatures() {
  const [summary, setSummary] = useState<any[]>([])
  const [total, setTotal] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingTotal, setLoadingTotal] = useState<boolean>(false)

  const getSummary = async () => {
    setLoading(true)
    const params = { filters: [] }
    try {
      const res = await api.post({
        url: '/statistic/saving/summary',
        data: params,
      })
      setSummary(res?.data)
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getTotal = async () => {
    setLoadingTotal(true)
    try {
      const res = await api.post({
        url: '/statistic/saving/total',
        data: { filters: [] },
      })
      setTotal(res?.data?.total)
    } catch (error) {
      console.log(error)
      setLoadingTotal(false)
    } finally {
      setLoadingTotal(false)
    }
  }

  useEffect(() => {
    getTotal()
  }, [])

  useEffect(() => {
    getSummary()
  }, [])

  const getColSize = (count: number) => {
    switch (count) {
      case 1:
        return 12
      case 2:
        return 6
      case 3:
        return 4
      case 4:
        return 3
      default:
        return 3
    }
  }

  const colSize = getColSize(summary.length)

  return (
    <>
      <Row className="g-4">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Col md={3} key={index}>
                <CardSkeleton />
              </Col>
            ))
          : summary?.map((item: any, index: number) => (
              <Col md={colSize} key={index}>
                <CardSavingSummary item={item} />
              </Col>
            ))}

        {loadingTotal ? (
          <Col md={4}>
            <CardSkeleton />
          </Col>
        ) : (
          <Col md={4}>
            <CardSavingCollected total={total} />
          </Col>
        )}
        <Col md={4}>
          <CardTimeAchived total={total} />
        </Col>

        {loadingTotal ? (
          <Col md={4}>
            <CardSkeleton />
          </Col>
        ) : (
          <Col md={4}>
            <CardProgressGlobal total={total} />
          </Col>
        )}
        <Col md={6}>
          <CardMonthlySaving />
        </Col>
        <Col md={6}>
          <CardSavingTrend />
        </Col>
      </Row>
    </>
  )
}
