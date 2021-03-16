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

function parseDate(date) {
  const actualDate = new Date(date)
  const { day, month, year, hours, minutes } = toJSON(actualDate)

  return `${day}/${month}/${year} - ${hours}:${minutes}`
}

export default parseDate
