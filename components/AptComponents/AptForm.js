import { useState } from 'react'
import { useRouter } from 'next/router'
import { postApt, updateApt } from '../../lib/ApiCalls'
import { useMutation, QueryClient } from 'react-query'

const AptForm = ({ formId, aptForm, forNewApt = true }) => {
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    title: aptForm.title,
    price: aptForm.price,
    short_description: aptForm.short_description,
    sq_mt: aptForm.sq_mt,
    rooms: aptForm.rooms,
    floor: aptForm.floor,
    lat: aptForm.lat,
    long: aptForm.long,
  })

  const queryClient = new QueryClient()

  const postAptMutation = useMutation((someForm) => postApt(someForm), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apts'] })
    }
  })

  const putAptMutation = useMutation(({ form, id }) => updateApt({ form, id }), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apts'] })
    }
  })


  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {

      if (form.floor) {
        putAptMutation.mutate({ form, id })
      } else {
        const noFloorForm = form;
        delete noFloorForm.floor;
        putAptMutation.mutate({ form: noFloorForm, id })

      }


      // Throw error with status code in case Fetch API req failed
      if (putAptMutation.isError) {
        console.log('some error')
        throw new Error(putAptMutation.error.message)

      }

      console.log('about to reroute')

      router.push('/')
    } catch (error) {
      setMessage('Failed to update apt')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {

      postAptMutation.mutate(form)


      // Throw error with status code in case Fetch API req failed
      if (postAptMutation.isError) {
        throw new Error(postAptMutation.error.message)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add apt')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {}
    if (!form.title) err.title = 'Naziv je obavezno polje'
    if (!form.price) err.price = 'Cena je obavezno polje'
    if (!form.short_description) err.short_description = 'Opis je obavezno polje'
    if (!form.sq_mt) err.sq_mt = 'Povrsina je obavezno polje'
    if (!form.rooms) err.rooms = 'Broj soba je obavezno polje'
    if (aptForm.floor && !form.floor) err.floor = 'Sprat je obavezno polje'
    if (!form.lat) err.lat = 'Latituda je obavezno polje'
    if (!form.long) err.long = 'Longituda je obavezno polje'
    return err
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewApt ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Naziv</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength="40"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cena</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            maxLength="10"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="short_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kratak opis</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength="50"
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="sq_mt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Povrsina</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            name="sq_mt"
            value={form.sq_mt}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="rooms" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Broj soba</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="number"
            name="rooms"
            value={form.rooms}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          {form.floor && <><label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sprat</label>
            <input
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              name="floor"
              type="number"
              value={form.floor}
              onChange={handleChange}
            /></>}
        </div>
        <div className="mb-6">
          <label htmlFor="lat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Latituda</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="lat"
            type="number"
            value={form.lat}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="long" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Longituda</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="long"
            type="number"
            value={form.long}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default AptForm
