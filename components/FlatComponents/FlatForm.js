import { useState } from 'react'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import { useMutation , QueryClient} from 'react-query'
import { postFlat, updateFlat } from '../../lib/ApiCalls'


const FlatForm = ({ userId, formId, flatForm, forNewFlat = true, justPredict = false }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    title: flatForm.title,
    location: flatForm.location,
    short_description: flatForm.short_description,
    sq_mt: flatForm.sq_mt,
    rooms: flatForm.rooms,
    floor: flatForm.floor
  })


  const queryClient = new QueryClient()

  
  const postFlatMutation = useMutation((someForm) => postFlat(someForm), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flats'] })
    }
  })

  const putFlatMutation = useMutation(({form, id}) => updateFlat({form, id}), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flats'] })
    }
  })


  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      putFlatMutation.mutate({id, form})

      // Throw error with status code in case Fetch API req failed
      if (putFlatMutation.isError) {
        throw new Error(putFlatMutation.error.message)
      }

      router.push(`/flats/${id}`)
    } catch (error) {
      setMessage('Failed to update flat')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {

    if (justPredict) {
      try {
        const res = await fetch('/api/flats/predict', {
          method: 'POST',
          headers: {
            Accept: contentType,
            'Content-Type': contentType,
          },
          body: JSON.stringify(form),
        })

        const result = await res.json()

        const flat = result.data;

        var oldFlats = JSON.parse(localStorage.getItem('flatsArray')) || [];

        oldFlats.push(flat);

        localStorage.setItem('flatsArray', JSON.stringify(oldFlats));

        // Throw error with status code in case Fetch API req failed
        if (!res.ok) {
          throw new Error(res.status)
        }


        router.push('/flats/predicted')
      } catch (error) {
        setMessage('Failed to add flat')
      }

    } else {

      const formWithAuthor = form;
      formWithAuthor.author = mongoose.Types.ObjectId(userId)

      try {
        postFlatMutation.mutate(formWithAuthor)

        // Throw error with status code in case Fetch API req failed
        if (postFlatMutation.isError) {
          throw new Error(postFlatMutation.error.message)
        }

        router.push('/flats')
      } catch (error) {
        setMessage('Failed to add flat')
      }
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
    if (!form.location) err.location = 'Adresa je obavezno polje'
    if (!form.short_description) err.short_description = 'Opis je obavezno polje'
    if (!form.sq_mt) err.sq_mt = 'Povrsina je obavezno polje'
    if (!form.rooms) err.rooms = 'Broj soba je obavezno polje'
    if (!form.floor) err.floor = 'Sprat je obavezno polje'
    return err
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewFlat ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form className='w-[100%] md:w-3/4 lg:w-[65%] xl:w-[60%]' id={formId} onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Naziv</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength="35"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Adresa</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength="50"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="short_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Kratak opis</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            type="text"
            maxLength="30"
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
          <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sprat</label>
          <input
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            name="floor"
            type="number"
            value={form.floor}
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

export default FlatForm
