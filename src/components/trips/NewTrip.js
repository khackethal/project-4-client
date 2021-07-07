import React from 'react'
import { useHistory } from 'react-router-dom'

import MapboxSearch from '../mapbox/MapboxSearch'
import ImageUploadField from './ImageUploadField'
import { useForm } from '../hooks/useForm'
import { createTrip } from '../../lib/api'
import SidebarLeft from '../user/SidebarLeft'

function NewTrip() {


  const history = useHistory()

  const { formData, handleChange, formError, setFormError } = useForm({
    name: '',
    image: '',
    description: '',
    location_string: '',
  })


  const handleNestedChange = (e) => {

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
      history.push(`home/${res.data.id}`)
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }



  return (
    <>
      <div className="homepage-container">

        <SidebarLeft />

        <div id="growth" className="middle-container">
          <h1 className="uppercase">Create Your Trip</h1>

          <div className="trip-feed-div">
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

            <div className="mapbox-div">
              
              {formError.errMessage && <p >{formError.errMessage}</p>}
              <MapboxSearch onResult={handleNestedChange} />
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          
        </div>


        <div id="growth"  className="right-container">
          <div className="message-div">Messages</div>
          <div className="message-div">Contacts</div>
        </div>
      </div>
    </>
  )
}


export default NewTrip