import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'

import '@/client/styles.css'
import Header from '@/client/components/Header'
import { PageContextProvider } from '@/client/contexts/page'

function MyApp({ Component, pageProps }: AppProps) {
  const { page, ...rest } = pageProps;
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <PageContextProvider page={page}>
        <Header />
        <Component {...rest} />
      </PageContextProvider>
    </>
  )
}

export default MyApp
