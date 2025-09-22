import ApexCharts from 'apexcharts'
import React, { useEffect, useRef } from 'react'

interface Props {
  totalSaved: number
  target: number
}

export default function ProgressRingChart({ totalSaved = 20000000, target = 60000000 }: Props) {
  const chartRef = useRef<HTMLDivElement>(null)
  const percentage = Math.round((totalSaved / target) * 100)

  useEffect(() => {
    const options = {
      series: [percentage],
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '65%',
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 400,
              color: '#888',
              offsetY: -10, // geser ke atas
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 600,
              color: '#6366f1',
              offsetY: 5, // geser ke atas atau bawah
            },
            total: {
              show: false,
            },
          },
        },
      },
      fill: {
        colors: ['#6366f1'],
      },
      labels: ['Progress'],
      tooltip: {
        enabled: false,
        fillSeriesColor: false,
        theme: 'light',
      },
    }

    const chart = new ApexCharts(chartRef.current, options)
    chart.render()

    return () => {
      chart.destroy()
    }
  }, [percentage])

  return <div ref={chartRef} />
}
