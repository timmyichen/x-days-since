import Head from 'next/head'
import React from 'react'
import { AppProps } from 'next/app'

import '@/client/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
