import { eachDayOfInterval, format, startOfMonth, endOfMonth } from 'date-fns'

export const generateLabels = () => {
  const now = new Date()
  const days = eachDayOfInterval({
    start: startOfMonth(now),
    end: endOfMonth(now),
  })
  return days.map((day) => format(day, 'dd/MM'))
}
