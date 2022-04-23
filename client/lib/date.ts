import { DateFormat } from "@/shared/models"

const ONE_DAY = 60 * 60 * 1000 * 24

export function getDaysDifference(then: Date, now: Date) {
  return Math.floor((now.getTime() - then.getTime()) / ONE_DAY)
}

export function getFormattedDate(timestamp: number, format: DateFormat = DateFormat.FULL_SECONDS) {
  const date = new Date(timestamp)
  switch (format) {
    case DateFormat.FULL_MINUTES:
    case DateFormat.FULL_SECONDS:
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    case DateFormat.DAYS_ONLY:
    default:
      return date.toLocaleDateString()
  }
}
