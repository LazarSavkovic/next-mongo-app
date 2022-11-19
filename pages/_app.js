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
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"/>
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"/>
      <Script src='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js' />

      <SessionProvider session={pageProps.session}>
        <Layout {...pageProps}>

          <Component {...pageProps} />


        </Layout>
      </SessionProvider>
    </>
  )
}

export default MyApp
