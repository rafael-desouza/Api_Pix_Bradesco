import moment from 'moment'

export const databaseFormat = 'YYYY-MM-DD HH:mm:ss'

export function formatDate(date: Date, format: string) {
  return moment(date).format(format)
}
