import { usePageState } from '@/client/contexts/page';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import React from 'react'
import CreatePassword from './CreatePassword'
import Login from './Login';
import Logout from './Logout';

interface Props {
  hasPassword: boolean;
}

const AuthenticationAccordion: React.FC<Props> = ({ hasPassword }) => {
  const { auths, currentPage, pages } = usePageState();
  const [expanded, setExpanded] = React.useState(false)

  const onToggle = (_event: React.SyntheticEvent, exp: boolean) => {
    setExpanded(exp)
  }

  if (pages[currentPage!].meta.noPassword) {
    return null
  }

  let content = null
  if (auths[currentPage!]) {
    content = <Logout />
  } else if (hasPassword) {
    content = <Login />
  } else {
    content = <CreatePassword />
  }

  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        Authentication
      </AccordionSummary>
      <AccordionDetails>
        {content}
      </AccordionDetails>
    </Accordion>
  )
}

export default AuthenticationAccordion
