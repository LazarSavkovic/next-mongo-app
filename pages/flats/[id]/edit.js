import { useRouter } from 'next/router'
import useSWR from 'swr'
import FlatForm from '../../../components/FlatComponents/FlatForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditFlat = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: flat, error } = useSWR(id ? `/api/flats/${id}` : null, fetcher)

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

export default EditFlat
