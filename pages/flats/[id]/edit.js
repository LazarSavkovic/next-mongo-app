import FlatForm from '../../../components/FlatComponents/FlatForm'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getFlat } from '../../../lib/ApiCalls'
import { getSession,  } from 'next-auth/react'




const EditFlat = ({ userId, flatId}) => {  

  const { data: flat, error } = useQuery(['flats', flatId], () => getFlat({ userId, flatId}))


  if (error) return <p>Failed to load</p>
  if (!flat) return <p>Loading...</p>

  const flatForm = {
    title: flat.title,
    location: flat.location,
    short_description: flat.short_description,
    sq_mt: flat.sq_mt,
    floor: flat.floor,
    rooms: flat.rooms
  }

  return (
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <FlatForm formId="edit-flat-form" flatForm={flatForm} forNewFlat={false} />
      </div>
    </div>
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

  await queryClient.prefetchQuery(['flat', params.id], () => getFlat({ userId: session.user._id, flatId: params.id }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session: session,
      userId: session.user._id,
      flatId: params.id
    },
  }
}




export default EditFlat
