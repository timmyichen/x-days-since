import { ssrAxiosConfig } from '@/client/lib/axiosConfig';
import { getDaysDifference } from '@/client/lib/date';
import { GetPageResponse, TriggerEventResponse } from '@/shared/http';
import { Event, Page } from '@/shared/models';
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
  page?: Maybe<Page>,
  error?: string;
}

const Page: NextPage<Props> = ({ page, error }) => {
  const [loading, setLoading] = React.useState(false)
  const [events, setEvents] = React.useState<Event[]>(page?.events || [])
  console.log(page, events)

  if (!page) {
    return <div>page not found</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  const lastEvent = events.length ? events[events.length - 1].date : page.created
  const days = getDaysDifference(new Date(lastEvent), new Date())

  const onTriggerEvent = async () => {
    setLoading(true)
    const res = await axios.post<TriggerEventResponse>(`/api/pages/${page.uuid}/event`)
    setEvents([...events, res.data.event])
    setLoading(false)
  }

  return (
    <Wrapper>
      <Heading>It's been {days} days since {page.name}</Heading>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        onClick={onTriggerEvent}
        sx={{ fontSize: '18px', marginTop: '24px' }}
      >
        {page.name} today
      </Button>
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
  }
}

export default Page;
