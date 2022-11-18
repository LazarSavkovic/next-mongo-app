import FlatForm from '../../components/FlatForm'
import { getSession } from 'next-auth/react'
import User from '../../models/User'
import dbConnect from '../../lib/dbConnect'

const NewFlat = ({userId}) => {
  const flatForm = {
    title: '',
    price: 0,
    short_description: '',
    sq_mt: 0,
    floor: 0,
    rooms: 0,
    lat: 0,
    long: 0,
  }




  return (
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <FlatForm formId="add-flat-form" flatForm={flatForm} userId={userId} />
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

  const email = session.user.email;

  await dbConnect();

  const user = await User.findOne({email})
  console.log(user)

  const userObject = user.toObject()
  userObject._id = userObject._id.toString()
  const userId = userObject._id;


  return {
    props: {
      session: session,
      userId: userId
    }
  }
}


export default NewFlat
