import Head from 'next/head'
import Script from 'next/script'
import Layout from '../components/Layout'
import "../styles/globals.css";
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'



function MyApp({ Component, pageProps }) {

  const router = useRouter()

  return (

    <>
      <Head>
        <title>Procena Nekretnine</title>
      </Head>
      <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
      <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      <Script src='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js' />
      <SessionProvider session={pageProps.session}>
        {/* <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial='initialState'
            animate='animateState'
            exit='exitState'
            className='base-page-size'
            transition={{
              duration: 0.75
            }}

            variants={{
              initialState: {
                opacity: 0,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
              },
              animateState: {
                opacity: 1,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
              },
              exitState: {
                clipPath: 'polygon(50% 0, 50% 0, 50% 100%, 50% 100%)'
              }
            }}> */}


            <Layout {...pageProps}>

              <Component {...pageProps} />


            </Layout>
        {/* </AnimatePresence> */}
      </SessionProvider>
    </>
  )
}

export default MyApp
