import React from 'react'
import { useHistory } from 'react-router-dom'

import MapboxSearch from '../mapbox/MapboxSearch'
import ImageUploadField from './imageUploadField'
import { useForm } from '../../hooks/useForm'
import { createTrip, allTripsPath } from '../../lib/api'

function NewTrip() {


  const history = useHistory()

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    name: '',
    image: '',
    latitude: '',
    longitude: '',
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
          name: 'location_string',
          value: {
            ...formData.location,
            userInput: e.place_name,
            coordinates: e.center,
            boundaryBox: getBoundaryBox(e),
            placeType: e.place_type[0],
          },
        },
      })
  }

  // const handleUpload = (file) => {
  //   handleChange({ target: { name: 'image', value: file } })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createTrip(formData)
      console.log(formData)
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
          name="title"
          onChange={handleChange} ></input>
        {formError.title && <p>{formError.title}</p>}

        <div>
          Description
        </div>
        <input
          placeholder="description"
          name="description"
          onChange={handleChange} ></input>
        {formError.description && <p>{formError.description}</p>}

        <div>
          Image
        </div>
        <input
          placeholder="image"
          name="image"
          onChange={handleChange} ></input>
        {formError.image && <p>{formError.image}</p>}

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
{/* 
      <div>
        <ImageUploadField onUpload={handleUpload} />
      </div> */}


      <div>
        {formError.errMessage && <p >{formError.errMessage}</p>}
        <MapboxSearch onResult={handleNestedChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>

    </>
  )
}


export default NewTrip