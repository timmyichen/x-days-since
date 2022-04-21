import React from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import { Button, TextField } from '@mui/material'
import { usePageState } from '@/client/contexts/page'

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const CreatePassword: React.FC = () => {
  const pageState = usePageState()
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')

  const onSave = async () => {
    setLoading(true)
    try {
      await axios.post(`/api/pages/${pageState.currentPage}/password`)
    } catch (err) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}

export default CreatePassword
