import moment from 'moment'

export const isToday = (date) => moment().isSame(date, 'day')
