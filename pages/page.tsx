import AuthenticationAccordion from '@/client/components/accordions/authentication';
import EventsAccordion from '@/client/components/accordions/events';
import SettingsAccordion from '@/client/components/accordions/settings';
import EventTrigger from '@/client/components/EventTrigger';
import PageHeading from '@/client/components/PageHeading';
import { usePageState } from '@/client/contexts/page';
import { ssrAxiosConfig } from '@/client/lib/axiosConfig';
import { GetPageResponse } from '@/shared/http';
import styled from '@emotion/styled';
import axios from 'axios';
import { Request } from 'express';
import { NextPage } from 'next';
import React from 'react';

const Wrapper = styled.div`
  text-align: center;
`

interface Props {
  error?: string;
}

const Page: NextPage<Props> = ({ error }) => {
  const pageState = usePageState()

  const page = pageState.pages[pageState.currentPage || ""]

  if (!page) {
    return <Wrapper>page not found</Wrapper>
  }

  if (error) {
    return <Wrapper>{error}</Wrapper>
  }

  const { events, created } = page;

  return (
    <Wrapper>
      <PageHeading />
      <EventTrigger />
      <AuthenticationAccordion hasPassword={page.meta.hasPassword} />
      <SettingsAccordion />
      <EventsAccordion />
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
