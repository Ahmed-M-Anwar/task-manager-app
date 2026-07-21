export function randomFutureDate(minDays = 1, maxDays = 14) {
  const days = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0] // YYYY-MM-DD
}

export function isFutureDate(dateString) {
  const inputDate = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return inputDate >= today
}
