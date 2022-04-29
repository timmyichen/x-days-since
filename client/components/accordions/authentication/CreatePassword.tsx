import React from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { Button, TextField, Typography } from '@mui/material'
import { usePageDispatch, usePageState } from '@/client/contexts/page'
import { SetPasswordResponse } from '@/shared/http'

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CreatePassword: React.FC = () => {
  const { currentPage } = usePageState()
  const pageDispatch = usePageDispatch()
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const onSave = async () => {
    setLoading(true)
    try {
      const res = await axios.post<SetPasswordResponse>(`/api/pages/${currentPage}/password`, { password })
      pageDispatch({ type: 'SET_PAGE', page: res.data.page })
    } catch (err) {
      
    } finally {
      setLoading(false)
    }
  }

  const onNoPassword = async () => {
    setLoading(true)
    try {
      const res = await axios.post<SetPasswordResponse>(`/api/pages/${currentPage}/no-password`, { password })
      pageDispatch({ type: 'SET_PAGE', page: res.data.page })
    } catch (err) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Typography>
        Set a password on this page so that only you and your loved ones can use it.
      </Typography>
      <PasswordWrapper>
        <TextField
          type="password"
          label="Create a password"
          placeholder="Something you'll remember"
          sx={{ flexGrow: 1 }}
          value={password}
          disabled={loading}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <Button disabled={loading} onClick={onSave}>Save</Button>
      </PasswordWrapper>
      <Button disabled={loading} onClick={onNoPassword}>I want everyone to have access</Button>
    </>
  )
}

export default CreatePassword
