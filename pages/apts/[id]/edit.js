import { useRouter } from 'next/router'
import AptForm from '../../../components/AptComponents/AptForm'
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getApt } from '../../../lib/ApiCalls'



const EditApt = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: apt, error } = useQuery(['apts', id], () => getApt(id))


  if (error) return <p>Failed to load</p>
  if (!apt) return <p>Loading...</p>

  const aptForm = {
    title: apt.title,
    price: apt.price,
    short_description: apt.short_description,
    sq_mt: apt.sq_mt,
    floor: apt.floor,
    rooms: apt.rooms,
    lat: apt.lat,
    long: apt.long,
  }

  return (
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <AptForm formId="edit-apt-form" aptForm={aptForm} forNewApt={false} />
      </div>
    </div>
  )
}


export async function getServerSideProps({ params }) {

  const id = params.id;

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['apts', id], () => getApt(id))

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    },
  }
}


export default EditApt
