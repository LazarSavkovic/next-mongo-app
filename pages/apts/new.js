import AptForm from '../../components/AptComponents/AptForm'
import AuthLayout from '../../components/AuthLayout'

const NewApt = () => {
  const aptForm = {
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


    <div className="flex bg-blue-400">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 min-h-[75%] mt-24 pt-16">
        <div className='grid grid-cols-1 px-32'>
          <h1 className="text-3xl text-center tracking-wider">
            Unesi Novu Nekretninu
          </h1>
          <AptForm formId="add-apt-form" aptForm={aptForm} />
        </div>
      </div>
    </div>
  )
}

export default NewApt
