import { Request } from "express"

export const ssrAxiosConfig = (req?: Request) => {
  const baseURL = req ? req.protocol + '://' + req.get('host') : undefined
  console.log(baseURL)
  return { baseURL }
}
