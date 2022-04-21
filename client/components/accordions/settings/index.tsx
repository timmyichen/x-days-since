import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import DateFormatSelect from './DateFormatSelect'

const SettingsAccordion: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false)

  const onToggle = (_event: React.SyntheticEvent, exp: boolean) => {
    setExpanded(exp)
  }

  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Settings
      </AccordionSummary>
      <AccordionDetails>
        <DateFormatSelect />
      </AccordionDetails>
    </Accordion>
  )
}

export default SettingsAccordion
