import moment from 'moment'

export const isExpired = (time) => {
  const now = moment.utc()
  const timeUTC = moment.unix(time).utc()
  return timeUTC.diff(now, 'seconds') < 0.0
}
