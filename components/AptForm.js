import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const AptForm = ({ formId, aptForm, forNewApt = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
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

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/apts/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/apts/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update apt')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/apts', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
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
    if (!form.floor) err.floor = 'Sprat je obavezno polje'
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
        <label htmlFor="title">Naziv</label>
        <input
          type="text"
          maxLength="20"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Cena</label>
        <input
          type="number"
          maxLength="20"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="short_description">Kratak opis</label>
        <input
          type="text"
          maxLength="30"
          name="short_description"
          value={form.short_description}
          onChange={handleChange}
          required
        />

        <label htmlFor="sq_mt">Povrsina</label>
        <input
          type="number"
          name="sq_mt"
          value={form.sq_mt}
          onChange={handleChange}
        />

        <label htmlFor="rooms">Broj soba</label>
        <input
          type="number"
          name="rooms"
          checked={form.rooms}
          onChange={handleChange}
        />

        <label htmlFor="floor">Sprat</label>
        <input
          name="floor"
          type="number"
          value={form.floor}
          onChange={handleChange}
        />
        <label htmlFor="lat">Latituda</label>
        <input
          name="lat"
          type="number"
          value={form.lat}
          onChange={handleChange}
        />
        <label htmlFor="long">Longituda</label>
        <input
          name="long"
          type="number"
          value={form.long}
          onChange={handleChange}
        />

        <button type="submit" className="btn">
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
