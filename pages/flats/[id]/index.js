import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Flat from '../../../models/Flat'
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

export async function getServerSideProps({ params }) {
  await dbConnect()

  const flat = await Flat.findById(params.id).lean()
  flat._id = flat._id.toString()
  if (flat.author) {
    flat.author = flat.author.toString()
  }

  return { props: { flat } }
}

export default FlatPage
