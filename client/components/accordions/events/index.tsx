import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React from 'react'
import { usePageState } from '@/client/contexts/page'
import EventsTable from './EventsTable'

const EventsAccordion: React.FC = () => {
  const { pages, currentPage } = usePageState()
  const [expanded, setExpanded] = React.useState(false)

  const page = pages[currentPage!]
  const name = page.name

  const onToggle = (_event: React.SyntheticEvent, exp: boolean) => {
    setExpanded(exp)
  }

  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        Previous times when {name}
      </AccordionSummary>
      <AccordionDetails>
        <EventsTable />
      </AccordionDetails>
    </Accordion>
  )
}

export default EventsAccordion
