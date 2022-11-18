import { useRouter } from 'next/router'
import useSWR from 'swr'
import AptForm from '../../../components/AptForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditApt = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: apt, error } = useSWR(id ? `/api/apts/${id}` : null, fetcher)

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

export default EditApt
