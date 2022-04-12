import React, { FormEvent } from 'react'
import { Button, TextField } from '@mui/material';
import axios from 'axios'
import styled from '@emotion/styled';

export const PLACEHOLDERS = [
  '...Sherwin last played a board game',
  '...Steven ate his age in McDonalds Chicken Nuggets',
  '...Steph won a game in League of Legends',
  '...Katherine bought something on sale',
]

const Wrapper = styled.div`
  
`

const Heading = styled.h1`
  text-align: center;
`

interface Props {
  randomPlaceholder: string;
}

const CreationForm: React.FC<Props> = ({ randomPlaceholder }) => {
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    console.log(input)
    setLoading(false)
  }

  return (
    <Wrapper>
      <Heading>It's Been X Days Since...</Heading>
      <form onSubmit={onSubmit}>
        <TextField
          placeholder={randomPlaceholder}
          variant="outlined"
          fullWidth
          value={input}
          onChange={e => setInput(e.currentTarget.value)}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          Track it
        </Button>
      </form>
    </Wrapper>
  )
}

export default CreationForm
