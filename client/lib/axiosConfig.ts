import { Request } from "express"

export const ssrAxiosConfig = (req?: Request) => {
  const baseURL = req ? req.protocol + '://' + req.get('host') : undefined
  return { baseURL }
}
