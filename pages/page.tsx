import AuthenticationAccordion from '@/client/components/accordions/authentication';
import { usePageDispatch, usePageState } from '@/client/contexts/page';
import { ssrAxiosConfig } from '@/client/lib/axiosConfig';
import { getDaysDifference } from '@/client/lib/date';
import { GetPageResponse, TriggerEventResponse } from '@/shared/http';
import { Maybe } from '@/shared/types';
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
  font-size: 28px;
`

interface Props {
  error?: string;
}

const Page: NextPage<Props> = ({ error }) => {
  const pageState = usePageState()
  const pageDispatch = usePageDispatch()
  console.log('state', pageState)
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
  const days = getDaysDifference(new Date(lastEvent), new Date())

  const onTriggerEvent = async () => {
    setLoading(true)
    const res = await axios.post<TriggerEventResponse>(`/api/pages/${uuid}/event`)
    pageDispatch({ type: 'ADD_EVENT', uuid, event: res.data.event })
    setLoading(false)
  }

  return (
    <Wrapper>
      <Heading>It's been {days} {days === 1 ? 'day' : 'days'} since {page.name}</Heading>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={onTriggerEvent}
        sx={{ fontSize: '18px', marginTop: '24px' }}
      >
        {page.name} today
      </Button>
      <AuthenticationAccordion hasPassword={page.meta.hasPassword} />
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
