import { usePageDispatch, usePageState } from '@/client/contexts/page'
import { UpdatePageResponse } from '@/shared/http'
import { DateFormat } from '@/shared/models'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import axios from 'axios'
import React from 'react'

const formatToStringMap: { [f in DateFormat]: string } = {
  [DateFormat.DAYS_ONLY]: 'Days only (e.g. "3 days")',
  [DateFormat.FULL_MINUTES]: 'Days, Hours, Minutes',
  [DateFormat.FULL_SECONDS]: 'Days, Hours, Minutes, Seconds',
} as const

const DateFormatSelect: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const { pages, currentPage } = usePageState()
  const pageDispatch = usePageDispatch()
  const page = pages[currentPage!]
  
  const onChange = async (e: SelectChangeEvent) => {
    setLoading(true)
    const res = await axios.post<UpdatePageResponse>(`/api/pages/${page.uuid}/settings`, { dateFormat: e.target!.value })
    pageDispatch({
      type: 'SET_PAGE',
      page: res.data.page,
    })
    setLoading(false)
  }

  return (
    <FormControl>
      <InputLabel id="date-format-select-label">Time Format</InputLabel>
      <Select
        labelId="date-format-select-label"
        id="date-format-select"
        value={page.meta.dateFormat}
        label="Time Format"
        onChange={onChange}
        disabled={loading}
      >
        {Object.keys(DateFormat).map(format => (
          <MenuItem key={format} value={format}>{formatToStringMap[format as DateFormat]}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default DateFormatSelect
