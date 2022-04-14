import React, { FormEvent } from 'react'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { CreatePageResponse } from '@/shared/http';

export const PLACEHOLDERS = [
  'example: Sherwin last played a board game',
  'example: Steven ate his age in McDonalds Chicken Nuggets',
  'example: Steph won a game in League of Legends',
  'example: Katherine bought something on sale',
  'example: Mason made flatbread for his friends',
]

const Wrapper = styled.div`
  text-align: center;
`

interface Props {
  randomPlaceholder: string;
}

const CreationForm: React.FC<Props> = ({ randomPlaceholder }) => {
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    const res = await axios.post<CreatePageResponse>('/api/pages', { name })
    if (res.data.uuid) {
      router.push(`/${res.data.uuid}`)
    }
    setLoading(false)
  }

  return (
    <Wrapper>
      <h1>It's Been X Days Since...</h1>
      <form onSubmit={onSubmit}>
        <TextField
          placeholder={randomPlaceholder}
          variant="outlined"
          fullWidth
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ fontSize: '18px', marginTop: '24px' }}
        >
          Track it
        </Button>
      </form>
    </Wrapper>
  )
}

export default CreationForm
