import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AptBigCard from '../../../components/AptComponents/AptBigCard'
import { getApt } from '../../../lib/ApiCalls'

import { dehydrate, QueryClient, useQuery } from 'react-query';


/* Allows you to view apt card info and delete apt card*/
const AptPage = ({id}) => {

  const router = useRouter()


  const { data: apt } = useQuery(['apts', id], () => getApt(id))


  const [message, setMessage] = useState('')


  const handleDelete = async () => {
    try {
      await fetch(`/api/apts/${id}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the apt.')
    }
  }

  return (

    <div className="flex bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 mt-24 pt-16 flex justify-center">

        <AptBigCard key={apt._id} apt={apt} handleDelete={handleDelete} />


        {message && <p>{message}</p>}
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
      dehydratedState: dehydrate(queryClient),
      id: id
    },
  }
}

export default AptPage
