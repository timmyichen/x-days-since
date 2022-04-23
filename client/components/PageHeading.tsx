import styled from '@emotion/styled'
import React from 'react'
import { usePageState } from '../contexts/page'
import TimeAgo from './TimeAgo'


const Heading = styled.h1`
  font-size: 2rem;
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PageHeading: React.FC = () => {
  const { pages, currentPage } = usePageState()
  const page = pages[currentPage!]
  const { events, created } = page
  const lastEvent = events[0]?.date || created

  return (
    <Heading>
      It's been&nbsp;
      <TimeAgo timestamp={lastEvent} dateFormat={page.meta.dateFormat} />
      &nbsp;since {page.name}
    </Heading>
  )
}

export default PageHeading
