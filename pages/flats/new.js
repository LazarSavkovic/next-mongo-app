import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'

const NewFlat = ({ userId, session }) => {
  const flatForm = {
    title: '',
    location: '',
    price: 0,
    short_description: '',
    sq_mt: 0,
    floor: 0,
    rooms: 0,
    lat: 0,
    long: 0,
  }




  return (
    <div className="container mx-auto my-28 w-3/4" >
      <div className='grid grid-cols-1'>
        <Dashboard session={session} >
          <div className='flex items-center justify-center'>
            <FlatForm formId="add-flat-form" flatForm={flatForm} userId={userId} />
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

  const userId = session.user._id;


  return {
    props: {
      session: session,
      userId: userId
    }
  }
}


export default NewFlat
