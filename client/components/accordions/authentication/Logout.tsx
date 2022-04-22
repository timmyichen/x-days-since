import { usePageDispatch, usePageState } from '@/client/contexts/page'
import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react'

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`

const Logout: React.FC = () => {
  const { currentPage, auths } = usePageState()
  const pageDispatch = usePageDispatch()

  const onSubmit = async () => {
    localStorage.removeItem(`authtoken-${currentPage}`)
    pageDispatch({ type: 'UNAUTH_PAGE', uuid: currentPage! })
  }

  const expiryTs = auths[currentPage!]
  const date = expiryTs ? new Date(expiryTs).toTimeString() : 'at some point, maybe'

  return (
    <>
      <Typography>
        You'll be logged in until {date}.
      </Typography>
      <Wrapper>
        <Button onClick={onSubmit}>Log out</Button>
      </Wrapper>
    </>
  )
}

export default Logout
