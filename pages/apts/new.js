import AptForm from '../../components/AptForm'

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

  return <AptForm formId="add-apt-form" aptForm={aptForm} />
}

export default NewApt
