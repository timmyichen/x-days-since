const ONE_DAY = 60 * 60 * 1000 * 24

export function getDaysDifference(then: Date, now: Date) {
  return Math.floor((now.getTime() - then.getTime()) / ONE_DAY)
}
