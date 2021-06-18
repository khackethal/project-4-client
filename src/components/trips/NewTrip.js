import React from 'react'
import { useHistory } from 'react-router-dom'

import MapboxSearch from '../mapbox/MapboxSearch'
import ImageUploadField from './ImageUploadField'
import { useForm } from '../hooks/useForm'
import { createTrip, allTripsPath } from '../../lib/api'

function NewTrip() {


  const history = useHistory()

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    name: '',
    image: '',
    description: '',
    location_string: '',
  })

  console.log(formData)

  const handleNestedChange = (e) => {

    const getBoundaryBox = (e) => {
      if (e.bbox) return e.bbox
    }

    handleChange(
      {
        target:
        {
          name: 'latitudeLongitude',
          value: e.center,
          
        },
      })
  }

  const handleUpload = (file) => {
    handleChange({ target: { name: 'image', value: file } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createTrip(formData)
      console.log(formData)
      console.log('created!')
      history.push(`${allTripsPath}${res.data._id}`)
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }





  return (
    <>
      <h1>New Trip- submit your own or get inspired</h1>

      <form onSubmit={handleSubmit}> 

        <div>
          Name
        </div>
        <input
          placeholder="add a title"
          name="name"
          onChange={handleChange} ></input>
        {formError.name && <p>{formError.name}</p>}

        <div>
          Description
        </div>
        <input
          placeholder="description"
          name="description"
          onChange={handleChange} ></input>
        {formError.description && <p>{formError.description}</p>}

        <div>
          <ImageUploadField onUpload={handleUpload} />
        </div>

        <div>Location</div>
      

        <input
          className={`input ${formError.location || formError.errMessage ? 'is-danger' : ''}`}
          type="text"
          placeholder="Find address on map"
          name="location"
          onChange={(e) => {
            handleNestedChange(e)
            setFormError({ ...formError, location: '' })
          }}
          value={formData.location_string.userInput || ''}
          required
          disabled
        />
        {formError.location_string && <p>{formError.location_string}</p>}

      </form>

      <div>
        {formError.errMessage && <p >{formError.errMessage}</p>}
        <MapboxSearch onResult={handleNestedChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

    </>
  )
}


export default NewTrip