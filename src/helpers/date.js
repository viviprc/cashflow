function withZero(number) {
  return number < 10 ? `0${number}` : number
}

function toJSON(date) {
  return {
    month: withZero(date.getMonth() + 1),
    day: withZero(date.getDate()),
    hours: withZero(date.getHours()),
    minutes: withZero(date.getMinutes()),
    year: date.getFullYear(),
  }
}

// Retorna un string en formato internacional AAAA-MM-DD
export function toInternationalFormat(date) {
  const { year, month, day } = toJSON(date)
  return `${year}-${month}-${day}`
}

// Transforma una fecha AAAA-MM-DD en sus MS de inicio y término
export function getDayTimeRange(intFormatDate) {
  const floor = new Date(`${intFormatDate} 00:00`)
  const ceil = new Date(`${intFormatDate} 23:59`)

  return [floor.getTime(), ceil.getTime()]
}

function parseDate(dateInMs) {
  const actualDate = new Date(dateInMs)
  const { day, month, year, hours, minutes } = toJSON(actualDate)

  return `${day}/${month}/${year} - ${hours}:${minutes}`
}

export default parseDate
