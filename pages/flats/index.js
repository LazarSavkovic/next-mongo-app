import { getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import Dashboard from '../../components/Dashboard'
import { getFlats } from '../../lib/ApiCalls'
import { useEffect, useState } from 'react';



const Flats = ({ session }) => {


  const { data: flats } = useQuery('flats', () => getFlats(session.user._id))
  const [searchInput, setSearchInput] = useState('')
  const [filteredFlats, setFilteredFlats] = useState([])

  useEffect(() => {
    const newFlats = flats.filter((flat) => {
      if (flat.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return flat
      }
    })

    setFilteredFlats(newFlats)
  }, [searchInput])


  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        {session && <Dashboard session={session} setSearchInput={setSearchInput} searchInput={searchInput}>
          <div className='flex flex-col items-center'>
            {filteredFlats && filteredFlats.map((flat, i) => (
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
      dehydratedState: dehydrate(queryClient),
      session: session
    },
  }
}


export default Flats
