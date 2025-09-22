import React from 'react'
import { Card } from 'react-bootstrap'
import Skeleton from 'react-loading-skeleton'

export const CardSkeleton = () => {
  return (
    <Card className="p-3">
      <Skeleton width={'100%'} height={250} />
    </Card>
  )
}
