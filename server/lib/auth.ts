import { RememberOptions } from '@/shared/time'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { log } from './log'

if (!process.env.PASSWORD_SECRET) {
  throw new Error('Missing process.env.PASSWORD_SECRET')
}

const rememberOptionToJwtExpiry: { [r in RememberOptions]: string | undefined } = {
  [RememberOptions.FOREVER]: undefined,
  [RememberOptions.ONE_DAY]: "1 day",
  [RememberOptions.ONE_MONTH]: "30 days",
  [RememberOptions.ONE_WEEK]: "1 week",
  [RememberOptions.THIRTY_MINUTES]: "30 minutes",
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hash(password, salt)
  return hash;
}

export function generatePageAuthToken({ uuid, remember }: { uuid: string, remember?: RememberOptions }) {
  const expiresIn = rememberOptionToJwtExpiry[remember || RememberOptions.ONE_DAY]

  return jwt.sign(
    { uuid },
    process.env.PASSWORD_SECRET!,
    { algorithm: "RS256", expiresIn }
  )
}

export function verifyPageAuthToken({ expectedUuid, token }: { expectedUuid: string, token: string }) {
  try {
    const payload = jwt.verify(token, process.env.PASSWORD_SECRET!) as any
    return payload.uuid === expectedUuid
  } catch (err: any) {
    log(`Failed to verify jwt for uuid=${expectedUuid}, reason=${err.message}`)
    return false
  }
}
