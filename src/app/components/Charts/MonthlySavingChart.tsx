import { formatRupiah } from '@app/helpers/number.helper'
import * as echarts from 'echarts'
import React, { useEffect, useRef } from 'react'

interface SavingData {
  name: string
  total: number
}

interface Props {
  data: SavingData[]
}

export default function MonthlySavingChart({ data = [] }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)

  const sortedData = [...data].sort((a, b) => b.total - a.total)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = echarts.init(chartRef.current)

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: any) {
          const value = params[0]?.value || 0
          const label = params[0]?.name
          return `<strong>${label}</strong>: ${formatRupiah(value)}`
        },
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '3%',
        top: '6%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: 'Rp{value}',
          rotate: 10,
        },
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: sortedData.map((item) => item.name),
        axisTick: {
          alignWithLabel: true,
        },
      },
      series: [
        {
          name: 'Savings',
          type: 'bar',
          barWidth: '45%',
          data: sortedData.map((item) => item.total),
          itemStyle: {
            color: '#6366f1',
            borderRadius: [0, 4, 4, 0],
          },
          label: {
            show: true,
            position: 'insideRight', // atau bisa 'inside'
            fontWeight: 'bold',
            color: '#fff', // supaya teks terlihat di dalam bar berwarna gelap
            formatter: (params: any) => formatRupiah(params.value),
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
