import { usePageDispatch, usePageState } from "@/client/contexts/page"
import React from "react"

function useLogoutTimeout() {
  const { currentPage, auths } = usePageState()
  const pageDispatch = usePageDispatch()
  const timeoutId = React.useRef<NodeJS.Timer | null>(null)

  const expiry = auths[currentPage || '']

  React.useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }

    if (!expiry || !currentPage) {
      return
    }

    const diff = expiry - Date.now()
    
    timeoutId.current = setTimeout(() => {
      pageDispatch({ type: 'UNAUTH_PAGE', uuid: currentPage })
    }, diff)

    return () => timeoutId.current ? clearTimeout(timeoutId.current) : undefined
  }, [expiry, currentPage])
}

export default useLogoutTimeout
