import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Clubee Articles Test</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Clubee Article Test" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
