import { useState } from 'react'
import { useRouter } from 'next/router'
import FlatBigCard from '../../../components/FlatComponents/FlatBigCard'
import { getSession } from 'next-auth/react'
import Dashboard from '../../../components/Dashboard'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getFlat, getApts } from '../../../lib/ApiCalls'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


/* Allows you to view apt card info and delete apt card*/
const FlatPage = ({session, userId, flatId}) => {

  const router = useRouter()
  const [message, setMessage] = useState('')
  const [apts, setApts] = useState([]);

  const { data: apartments } = useQuery('apts', () => getApts())

  const showApts = () => {
  setApts(apartments)
  }

  const removeApts = () => {
      setApts([])
  }


  const { data: flat } = useQuery(['flats', flatId], () => getFlat({ userId, flatId}))

  const handleDelete = async () => {

    try {
      await fetch(`/api/flats/${flatID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the flat.')
    }
  }

  return (

    <div className='container mx-auto my-28 w-3/4' >
      <div className='grid grid-cols-1'>

        {session && flat && <Dashboard session={session}>
        <div className='flex pb-3 w-[100%] justify-self-end'>
        {!apts[0] && <button onClick={showApts} className='button'>Prikaži nekretnine na tržištu</button>}
        {apts[0] && <button onClick={removeApts} className='button'>Skloni nekretnine na tržištu</button>}
        </div>
          <FlatBigCard key={flat._id} flat={flat} handleDelete={handleDelete} apts={apts} />
        </ Dashboard>}

        {message && <p>{message}</p>}

      </div>
    </div >
  )
}




export async function getServerSideProps({ params, req, locale }) {

  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['flats', params.id], () => getFlat({ userId: session.user._id, flatId: params.id }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session: session,
      userId: session.user._id,
      flatId: params.id,
      ...(await serverSideTranslations(locale, ['dashboard', 'common', 'flats'])),
      // Will be passed to the page component as props
    },
  }
}

export default FlatPage
