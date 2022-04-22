import AuthenticationAccordion from '@/client/components/accordions/authentication';
import SettingsAccordion from '@/client/components/accordions/settings';
import TimeAgo from '@/client/components/TimeAgo';
import { usePageDispatch, usePageState } from '@/client/contexts/page';
import { ssrAxiosConfig } from '@/client/lib/axiosConfig';
import { GetPageResponse, TriggerEventResponse } from '@/shared/http';
import { DateFormat } from '@/shared/models';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import axios from 'axios';
import { Request } from 'express';
import { NextPage } from 'next';
import React from 'react';

const Wrapper = styled.div`
  text-align: center;
`

const Heading = styled.h1`
  font-size: 2rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Props {
  error?: string;
}

const Page: NextPage<Props> = ({ error }) => {
  const pageState = usePageState()
  const pageDispatch = usePageDispatch()
  const [loading, setLoading] = React.useState(false)

  const page = pageState.pages[pageState.currentPage || ""]

  if (!page) {
    return <Wrapper>page not found</Wrapper>
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>
  }

  const { events, uuid, created } = page;
  const lastEvent = events.length ? events[events.length - 1].date : created

  const onTriggerEvent = async () => {
    setLoading(true)
    const res = await axios.post<TriggerEventResponse>(`/api/pages/${uuid}/event`)
    pageDispatch({ type: 'ADD_EVENT', uuid, event: res.data.event })
    setLoading(false)
  }

  const getButtonText = () => {
    switch (page.meta.dateFormat) {
      case DateFormat.FULL_MINUTES:
      case DateFormat.FULL_SECONDS:
        return `${page.name} just now`
      case DateFormat.DAYS_ONLY:
      default:
        return `${page.name} today`
    }
  }

  return (
    <Wrapper>
      <Heading>
        It's been&nbsp;
        <TimeAgo timestamp={lastEvent} dateFormat={page.meta.dateFormat} />
        &nbsp;since {page.name}
      </Heading>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={onTriggerEvent}
        sx={{ fontSize: '18px', marginTop: '24px' }}
      >
        {getButtonText()}
      </Button>
      <AuthenticationAccordion hasPassword={page.meta.hasPassword} />
      <SettingsAccordion />
    </Wrapper>
  )
}

Page.getInitialProps = async (ctx) => {
  if (!ctx.query.uuid) {
    return {}
  }
  
  const config = ctx.req ? ssrAxiosConfig(ctx.req as Request) : {}

  let res;
  try {
    res = await axios.get<GetPageResponse>(`/api/pages/${ctx.query.uuid}`, config)
  } catch (err: any) {
    if (err.response?.status === 404) {
      return { error: 'Page not found' }
    } else {
      return { error: 'Unknown error' }
    }
  }

  const page = res.data.page

  return {
    page,
    pageUuid: String(ctx.query.uuid),
  }
}

export default Page;
