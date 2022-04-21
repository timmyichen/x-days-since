import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'

import '@/client/styles.css'
import Header from '@/client/components/Header'
import { PageContextProvider } from '@/client/contexts/page'
import { SnackContextProvider } from '@/client/contexts/snack'

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
          <Header />
          <Component {...rest} />
        </PageContextProvider>
      </SnackContextProvider>
    </>
  )
}

export default MyApp
