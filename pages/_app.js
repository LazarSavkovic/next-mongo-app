import Head from 'next/head'
import Script from 'next/script'
import Layout from '../components/Layout'
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react'



function MyApp({ Component, pageProps }) {

  return (

    <>
      <Head>
        <title>Procena Nekretnine</title>
        {/* <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" /> */}
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout {...pageProps}>

          <Component {...pageProps} />


        </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
