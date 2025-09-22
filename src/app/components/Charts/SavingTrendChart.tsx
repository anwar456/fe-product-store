import { formatRupiah } from '@app/helpers/number.helper'
import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'

interface SavingTrend {
  month: string
  total: number
}

interface Props {
  data: SavingTrend[]
}

export default function SavingTrendChart({ data = [] }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const point = params[0]
          return `<strong>${point.name}</strong><br/>Total: ${formatRupiah(point.value)}`
        },
      },
      grid: {
        left: '1%',
        right: '5%',
        bottom: '3%',
        top: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => item.month),
        axisLabel: {
          rotate: 10,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: 'Rp{value}',
        },
      },
      series: [
        {
          name: 'Total Tabungan',
          type: 'line',
          smooth: true,
          data: data.map((item) => item.total),
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(99, 102, 241, 0.4)' },
              { offset: 1, color: 'rgba(99, 102, 241, 0.05)' },
            ]),
          },
          lineStyle: {
            color: '#6366f1',
            width: 2,
          },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: {
            color: '#6366f1',
          },
        },
      ],
    }

    chart.setOption(option)

    const resize = () => chart.resize()
    window.addEventListener('resize', resize)

    return () => {
      chart.dispose()
      window.removeEventListener('resize', resize)
    }
  }, [data])

  return <div ref={chartRef} style={{ width: '100%', height: 300 }} />
}
