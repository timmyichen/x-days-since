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
  let logoutTime = "at some point, I think"
  if (expiryTs) {
    const date = new Date(expiryTs)
    logoutTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  return (
    <>
      <Typography>
        You'll be logged in until {logoutTime}.
      </Typography>
      <Wrapper>
        <Button onClick={onSubmit}>Log out</Button>
      </Wrapper>
    </>
  )
}

export default Logout
