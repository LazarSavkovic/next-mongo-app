import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import {useSession, signOut } from 'next-auth/react'

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Guest Homepage
      </h3>
      <div className='flex justify-center'>
        <Link href='/login' legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Prijavi se</a></Link>
      </div>
    </main>
  )
}

function User({session, handleSignOut}) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Authorized user Homepage
      </h3>
      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50'>Odjavi se</button>

      </div>
      <div className='flex justify-center'>
        <Link href='/profile' legacyBehavior><a className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profil</a></Link>
      </div>
    </main>
  )
}


const Home = () => {

  const {data: session} = useSession();

  function handleSignOut() {
    signOut()
  }

return (
  <div className={styles.container}>
    {session ? User({session, handleSignOut }) : Guest()}
  </div>
)
}



export default Home
