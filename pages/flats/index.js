import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useSession, getSession } from 'next-auth/react'
import FlatCard from '../../components/FlatCard'

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Gost
      </h3>
      <div className='flex justify-center'>
        <Link href='/login' legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Prijavi se</a></Link>
      </div>
    </main>
  )
}

function User({ session }) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Dobro dosao!
      </h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Odjavi se</button>

      </div>
      <div className='flex justify-center'>
        <Link href='/profile' legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profil</a></Link>
      </div>
    </main>
  )
}


const Flats = ({ flats, session }) => {
  return (
    <div className="container mx-auto my-40 w-3/4" >
      <div className='grid grid-cols-1'>
        <div className={styles.container}>
          <h1 className='text-4xl font-bold'>Moje nekretnine</h1>
          {session ? User({ session }) : Guest()}
        </div>
        <h1 className="text-3xl text-center font-bold mb-5">
          Nekretnine Beograd
        </h1>
        {flats.map((flat) => (
          <FlatCard key={flat._id} flat={flat} />
        ))}
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
