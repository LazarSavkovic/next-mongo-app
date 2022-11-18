import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import FlatBigCard from '../../../components/FlatBigCard'
import { getSession } from 'next-auth/react'


/* Allows you to view apt card info and delete apt card*/
const FlatPage = ({ flat }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const flatID = router.query.id

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

    <div className="container mx-auto my-40 w-3/4" >
      <div className='grid grid-cols-1'>

          <FlatBigCard key={flat._id} flat={flat} handleDelete={handleDelete}/>
          

          {message && <p>{message}</p>}
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
  const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

  const url = `${process.env.API_URL}/flats/${params.id}?userid=${session.user._id}`

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();

  const flat = result.data;

  return { props: { flat } }
}

export default FlatPage
