import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatComponents/FlatCard'

import Dashboard from '../../components/Dashboard'



const Flats = ({ flats, session }) => {
  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        <Dashboard session={session}>
        <div className={styles.container}>
        {flats.map((flat) => (
          <FlatCard key={flat._id} flat={flat} />
        ))}
        </div>
        </Dashboard>

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

  const url = `${process.env.API_URL}/flats?id=${session.user._id}`

  /* find all the data in our database */
  const response = await fetch(url);
  const result = await response.json();


  const flats = result.data;

  return {
    props: {
      session: session,
      flats: flats
    }
  }
}


export default Flats
