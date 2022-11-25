import FlatForm from '../../components/FlatComponents/FlatForm'
import { getSession } from 'next-auth/react'
import Dashboard from '../../components/Dashboard'

const PredictNewFlat = () => {
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
          <FlatForm formId="add-flat-form" flatForm={flatForm} justPredict={true} />
      </div>
    </div>
  )
}


export async function getServerSideProps({ req }) {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: '/flats/new',
        permanent: false
      }
    }
  }



  return {
    props: {
    }
  }
}


export default PredictNewFlat
