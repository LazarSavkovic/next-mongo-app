import { useState } from 'react'
import { useRouter } from 'next/router'
import FlatBigCard from '../../../components/FlatComponents/FlatBigCard'
import { getSession, useSession } from 'next-auth/react'
import Dashboard from '../../../components/Dashboard'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getFlat } from '../../../lib/ApiCalls'


/* Allows you to view apt card info and delete apt card*/
const FlatPage = () => {
  const router = useRouter()
  const flatId = router.query.id
  const [message, setMessage] = useState('')
  const { data: session } = useSession();

  console.log(session)


  const { data: flat } = useQuery(['flats', flatId], () => getFlat({ userId: session.user._id, flatId: flatId }))



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
          <FlatBigCard key={flat._id} flat={flat} handleDelete={handleDelete} />
        </ Dashboard>}

        {message && <p>{message}</p>}
      </div>
    </div >
  )
}




export async function getServerSideProps({ params, req }) {

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
      dehydratedState: dehydrate(queryClient)
    },
  }
}

export default FlatPage
