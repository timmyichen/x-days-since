import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary,Typography } from '@mui/material'
import React from 'react'
import CreatePassword from './CreatePassword'
import Login from './Login';

interface Props {
  hasPassword: boolean;
}

const AuthenticationAccordion: React.FC<Props> = ({ hasPassword }) => {
  const [expanded, setExpanded] = React.useState(false)

  const onToggle = (_event: React.SyntheticEvent, exp: boolean) => {
    setExpanded(exp)
  }

  return (
    <Accordion expanded={expanded} onChange={onToggle}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        Authentication
      </AccordionSummary>
      <AccordionDetails>
        {hasPassword ? (
          <>
            <Typography>
              Log in with your password to change anything.
            </Typography>
            <Login />
          </>
        ) : (
          <>
            <Typography>
              Set a password on this page so that only you and your loved ones can use it.
            </Typography>
            <CreatePassword />
          </>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

export default AuthenticationAccordion
