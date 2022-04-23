import { TriggerEventResponse } from '@/shared/http'
import { DateFormat, MAX_NOTE_LENGTH } from '@/shared/models'
import styled from '@emotion/styled'
import { Button, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios'
import React from 'react'
import { usePageDispatch, usePageState } from '../contexts/page'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const NoteWrapper = styled.div`
  margin: 1rem 0;
`

const EventTrigger: React.FC = () => {
  const { pages, currentPage, auths } = usePageState()
  const pageDispatch = usePageDispatch()
  const [loading, setLoading] = React.useState(false)
  const [ hasNote, setHasNote ] = React.useState(false)
  const [ note, setNote ] = React.useState('')

  const page = pages[currentPage!]
  const { uuid, name, meta } = page

  const disableButton = !!(page.meta.hasPassword && !auths[currentPage!])

  const onTriggerEvent = async () => {
    setLoading(true)
    const res = await axios.post<TriggerEventResponse>(`/api/pages/${uuid}/event`, { note })
    pageDispatch({ type: 'ADD_EVENT', uuid, event: res.data.event })
    setLoading(false)
    setNote('')
    setHasNote(false)
  }

  const getButtonText = () => {
    switch (meta.dateFormat) {
      case DateFormat.FULL_MINUTES:
      case DateFormat.FULL_SECONDS:
        return `${name} just now`
      case DateFormat.DAYS_ONLY:
      default:
        return `${name} today`
    }
  }

  const closeNoteButton = (
    <> 
      <Typography sx={{ whiteSpace: 'nowrap', opacity: '.5' }}>{note.length} / {MAX_NOTE_LENGTH}</Typography>
      <CloseIcon
        sx={{ ":hover": { cursor: 'pointer' }}}
        onClick={() => {
          setNote('')
          setHasNote(false)
        }}
      />
    </>
  )

  return (
    <Wrapper>
      <Button
        type="submit"
        variant="contained"
        disabled={disableButton || loading}
        onClick={onTriggerEvent}
        sx={{ fontSize: '18px', marginTop: '24px' }}
      >
        {getButtonText()}
      </Button>
      <NoteWrapper>
        {hasNote ? (
          <TextField
            label={`More details about how ${name}`}
            value={note}
            onChange={e => setNote(e.target.value)}
            InputProps={{
              endAdornment: closeNoteButton,
            }}
            fullWidth
          />
        ) : (
          <Button
            onClick={() => setHasNote(true)}
          >
            Add note
          </Button>
        )}
      </NoteWrapper>
    </Wrapper>
  )
}

export default EventTrigger
