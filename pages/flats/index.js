import { getSession, useSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Dashboard from '../../components/Dashboard'
import { getFlats } from '../../lib/ApiCalls'



const Flats = () => {

  const { data: session } = useSession();

  const { data: flats } = useQuery('flats', () => getFlat(session.user._id))

  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        {session && <Dashboard session={session}>
          <div className='flex flex-col items-center'>
            {flats.map((flat) => (
              <FlatCard key={flat._id} flat={flat} />
            ))}
          </div>
        </Dashboard>}

      </div>
    </div>

  )
}

export async function getServerSideProps({ req }) {
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

  await queryClient.prefetchQuery('flats', () => getFlats(session.user._id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  }
}


export default Flats
