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
  const { events } = page
  const lastEvent = events[0]?.date

  let content: React.ReactNode = ""

  if (lastEvent) {
    content = (
      <>
        It's been&nbsp;
        <TimeAgo timestamp={lastEvent} dateFormat={page.meta.dateFormat} />
        &nbsp;since {page.name}
      </>
    )
  }

  if (!content) {
    return null
  }

  return (
    <Heading>
      {content}
    </Heading>
  )
}

export default PageHeading
