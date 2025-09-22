import moment from 'moment'

export function dateFormat(time: any, format: string = 'DD/MMM/YYYY') {
  const result = moment(time).format(format) || ''
  return result != 'Invalid date' ? result : '-'
}

export function timeFormat(time: any, format: string = 'DD/MMM/YYYY HH:mm') {
  const result = moment(time).format(format) || ''
  if (!time) return 'Invalid date'
  return result != 'Invalid date' ? result : '-'
}

export function timeAgo(time: any) {
  if (!time) return '-'
  const result = moment(time).fromNow()
  return result
}
