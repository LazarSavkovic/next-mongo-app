import Head from 'next/head'
import Layout from '../components/Layout'
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react'



function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Head>
        <title>Procena Nekretnine</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>

    </Layout>

  )
}

export default MyApp
