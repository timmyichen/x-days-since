import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'

import '@/client/lib/axios'
import '@/client/styles.css'
import Header from '@/client/components/Header'
import { PageContextProvider } from '@/client/contexts/page'
import { SnackContextProvider } from '@/client/contexts/snack'
import AuthController from '@/client/components/AuthController'
import styled from '@emotion/styled'

const Wrapper = styled.main`
  max-width: 640px;
  margin: 0 auto;
`

function MyApp({ Component, pageProps }: AppProps) {
  const { page, pageUuid, ...rest } = pageProps;

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <SnackContextProvider>
        <PageContextProvider page={page} pageUuid={pageUuid}>
          <AuthController />
          <Header />
          <Wrapper>
            <Component {...rest} />
          </Wrapper>
        </PageContextProvider>
      </SnackContextProvider>
    </>
  )
}

export default MyApp
