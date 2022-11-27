import dateFormat from 'dateformat'

export const toDateString = (date: Date): string =>
  dateFormat(date, 'isoUtcDateTime')
