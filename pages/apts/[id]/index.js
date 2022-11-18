import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AptBigCard from '../../../components/AptBigCard'


/* Allows you to view apt card info and delete apt card*/
const AptPage = ({ apt }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const aptID = router.query.id

    try {
      await fetch(`/api/apts/${aptID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the apt.')
    }
  }

  return (

    <div className="container mx-auto my-40 w-3/4" >
      <div className='grid grid-cols-1'>

          <AptBigCard key={apt._id} apt={apt} handleDelete={handleDelete}/>
          

          {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {

  const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

  const url = `http://localhost:3000/api/apts/${params.id}`

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();

  const apt = result.data;

  return { props: { apt } }
}

export default AptPage
