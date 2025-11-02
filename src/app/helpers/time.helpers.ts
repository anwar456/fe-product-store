import moment from 'moment-timezone'

export function dateFormat(time: any, format: string = 'DD/MMM/YYYY') {
  const result = moment.tz(time, 'Asia/Jakarta').format(format)
  return result !== 'Invalid date' ? result : '-'
}

export function timeFormat(time: any, format: string = 'DD MMM YYYY, HH:mm:ss') {
  if (!time) return '-'

  const result = moment.utc(time).tz('Asia/Jakarta').format(format)
  return result !== 'Invalid date' ? result : '-'
}

export function timeAgo(time: any) {
  if (!time) return '-'
  return moment.utc(time).tz('Asia/Jakarta').fromNow()
}
