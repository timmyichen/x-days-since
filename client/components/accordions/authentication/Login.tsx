import { usePageDispatch, usePageState } from '@/client/contexts/page'
import { SubmitPasswordResponse } from '@/shared/http'
import { RememberOptions } from '@/shared/time'
import styled from '@emotion/styled'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import jwt from 'jsonwebtoken'

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const rememberOptionToStringMap: { [r in RememberOptions]: string } = {
  [RememberOptions.FOREVER]: 'Forever',
  [RememberOptions.ONE_DAY]: 'One day',
  [RememberOptions.ONE_MONTH]: 'One month',
  [RememberOptions.ONE_WEEK]: 'One week',
  [RememberOptions.THIRTY_MINUTES]: '30 minutes'
}

const Login: React.FC = () => {
  const { currentPage } = usePageState()
  const pageDispatch = usePageDispatch()
  const [loading, setLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [remember, setRemember] = React.useState<RememberOptions>(RememberOptions.ONE_WEEK)

  const onSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post<SubmitPasswordResponse>(`/api/pages/${currentPage}/auth`, { password, remember })
      localStorage.setItem(`authtoken-${currentPage}`, res.data.token)
      const payload = jwt.decode(res.data.token) as jwt.JwtPayload
      pageDispatch({
        type: 'AUTH_PAGE',
        uuid: currentPage!,
        expiry: payload.exp! * 1000,
      })
    } catch (err) {
      
    } finally {
      setLoading(false)
    }
  }

  const onChange = (e: SelectChangeEvent) => {
    setRemember(e.target!.value as RememberOptions)
  }

  return (
    <>
      <Typography>
        Log in with your password to change anything.
      </Typography>
      <PasswordWrapper>
        <TextField
          type="password"
          label="Enter the password"
          placeholder="Hopefully you remember!"
          sx={{ flexGrow: 1 }}
          value={password}
          disabled={loading}
          onChange={e => setPassword(e.currentTarget.value)}
        />
        <FormControl>
          <InputLabel id="remember-period-label">Remember me for</InputLabel>
          <Select
            labelId="remember-period-label"
            id="remember-period"
            value={remember}
            label="Remember me for"
            sx={{ minWidth: '9rem' }}
            onChange={onChange}
          >
            {Object.keys(RememberOptions).map(option => (
              <MenuItem key={option} value={option}>
                {rememberOptionToStringMap[option as RememberOptions]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button disabled={loading} onClick={onSubmit}>Submit</Button>
      </PasswordWrapper>
    </>
  )
}

export default Login
