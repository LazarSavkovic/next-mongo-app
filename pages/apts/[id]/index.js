import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Apt from '../../../models/Apt'
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
  await dbConnect()

  const apt = await Apt.findById(params.id).lean()
  apt._id = apt._id.toString()

  return { props: { apt } }
}

export default AptPage
