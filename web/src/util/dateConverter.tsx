export const timeConv = function (str) {
  const d = new Date(str)
  return d
}

export function prettyDate(d) {
  const date = new Date(d)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    months[date.getUTCMonth()] +
    ' ' +
    date.getUTCDate() +
    ', ' +
    date.getUTCFullYear()
  )
}

export function prettyDateTime(d) {
  const date = new Date(d + 21600000 - 3600000)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dat =
    date.getUTCDate() < 10 ? `0${date.getUTCDate()} ` : date.getUTCDate()
  const hr =
    date.getUTCHours() < 10 ? `0${date.getUTCHours()} ` : date.getUTCHours()

  return (
    months[date.getUTCMonth()] +
    ' ' +
    dat +
    ', ' +
    date.getUTCFullYear() +
    '   ' +
    hr +
    ':' +
    String(date.getMinutes()).padStart(2, '0')
  )
}
export function getDifferenceInDays(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60 * 24))
}

export function getDifferenceInHours(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60))
}

export function getDifferenceInMinutes(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60))
}

export function getDifferenceInSeconds(date1, date2) {
  const x = new Date()

  const diffInMs = Math.abs(x - date1)
  return parseInt(diffInMs / 1000)
}

export function formatToPhone(no) {
  return no?.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}
