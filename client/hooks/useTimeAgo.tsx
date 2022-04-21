import { DateFormat } from '@/shared/models'
import React from 'react'

const formatToIntervalMap: { [f in DateFormat]: number } = {
  [DateFormat.DAYS_ONLY]: 1000 * 60 * 30, // 30min
  [DateFormat.FULL_MINUTES]: 1000 * 15, // 15 seconds
  [DateFormat.FULL_SECONDS]: 1000, // 1 second
} as const

const ONE_DAY_MS = 1000 * 60 * 60 * 24
const ONE_HOUR_MS = 1000 * 60 * 60
const ONE_MIN_MS = 1000 * 60
const ONE_SEC_MS = 1000

const labelOrder = ['day', 'hour', 'minute', 'second']

function plural(num: number, word: string) {
  return num === 1 ? word : word + 's'
}

function msToTimeAgo(format: DateFormat, ms: number) {
  const days = Math.floor(ms / ONE_DAY_MS)
  const values = [days]
  if (format === DateFormat.DAYS_ONLY) {
    return values
  }
  let remaining = ms % ONE_DAY_MS

  const hours = Math.floor(remaining / ONE_HOUR_MS)
  values.push(hours)
  remaining = ms % ONE_HOUR_MS
  const minutes = Math.floor(remaining / ONE_MIN_MS)
  values.push(minutes)
  if (format === DateFormat.FULL_MINUTES) {
    return values
  }
  remaining = ms % ONE_MIN_MS

  const seconds = Math.floor(remaining / ONE_SEC_MS)
  values.push(seconds)
  return values
}

function timeAgoToString(values: number[]) {
  const parts: string[] = []

  if (values.length === 1) {
    return `${values[0]} ${plural(values[0], 'day')}`
  }

  let started = false
  values.forEach((value, i) => {
    if (value === 0 && !started) {
      return
    }
    parts.push(`${value} ${plural(value, labelOrder[i])}`)
  })

  if (parts.length === 0) {
    return '0 seconds'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  return [...parts.slice(0, parts.length - 1), `and ${parts[parts.length - 1]}`].join(', ')
}

const useTimeAgo = (interval: DateFormat, timestamp: number) => {
  const [intervalId, setIntervalId] = React.useState<NodeJS.Timer | null>(null)
  const initialTimeAgo = timeAgoToString(msToTimeAgo(interval, Date.now() - timestamp))
  const [timeAgo, setTimeAgo] = React.useState(initialTimeAgo)

  React.useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    
    const callback = () => {
      const diff = Date.now() - timestamp
      const str = timeAgoToString(msToTimeAgo(interval, diff))
      setTimeAgo(str)
    }
    
    const ms = formatToIntervalMap[interval]
    callback()
    const id = setInterval(callback, ms)
    setIntervalId(id)

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
        setIntervalId(null)
      }
    }
  }, [interval, setTimeAgo, timestamp])

  return timeAgo
}

export default useTimeAgo
