import { useRouter } from 'next/router'
import React from 'react'
import jwt from 'jsonwebtoken'
import { usePageDispatch } from '@/client/contexts/page'

function useLocalStorageTokens() {
  const router = useRouter()
  const pageDispatch = usePageDispatch()
  const path = router.asPath

  React.useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('authtoken-'))
    keys.forEach(key => {
      const payload = jwt.decode(localStorage.getItem(key) || '') as jwt.JwtPayload
      if (!payload?.exp || Date.now() > payload.exp * 1000) {
        localStorage.removeItem(key)
      }
    })
  }, [path])

  React.useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('authtoken-'))
    keys.forEach(key => {
      const payload = jwt.decode(localStorage.getItem(key) || '') as jwt.JwtPayload
      if (payload?.exp && Date.now() < payload.exp * 1000) {
        pageDispatch({
          type: 'AUTH_PAGE',
          uuid: key.replace('authtoken-', ''),
          expiry: payload.exp * 1000
        })
      }
    })
  }, [])
}

export default useLocalStorageTokens
