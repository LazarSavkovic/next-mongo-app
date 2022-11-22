import AptForm from '../../components/AptComponents/AptForm'

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
    <div className="container mx-auto my-40 w-2/4" >
      <div className='grid grid-cols-1'>
        <AptForm formId="add-apt-form" aptForm={aptForm} />
      </div>
    </div>
  )
}

export default NewApt
