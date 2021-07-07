import React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

import MapboxSearch from '../mapbox/MapboxSearch'
import ReactMapGl, { Marker } from 'react-map-gl'
import { publicToken } from '../../lib/mapbox'
import ImageUploadField from './ImageUploadField'
import { useForm } from '../hooks/useForm'
import { getSingleTrip, EditTrip } from '../../lib/api'
import SidebarLeft from '../user/SidebarLeft'


function EditATrip() {

  const history = useHistory()
  const { tripId } = useParams()

  const { formData, setFormData, handleChange, formError, setFormError } = useForm({
    name: '',
    image: '',
    description: '',
    location_string: '',
    latitudeLongitude: '',
  })
  

  React.useEffect(() => {

    const getData = async () => {
      try {
        const res = await getSingleTrip(tripId)
        setFormData(res.data)
        //* set map
        setViewport({
          ...viewport,
          longitude: res.data.latitudeLongitude[0],
          latitude: res.data.latitudeLongitude[1],
          zoom: 10,
        })
      } catch (err) {
        setFormError({ ...formError, errMessage: err.response.data.errMessage })
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //* For map content-------------------
  const [viewport, setViewport] = React.useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px', 
    zoom: 14,
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
      const res = await EditTrip(tripId, formData)
      history.push(`/home/${res.data.id}`)
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }



  return (
    <>
      
      <div className="homepage-container">

        <SidebarLeft />
    
        <div id="growth" className="middle-container">
          <h1 className="uppercase">Edit Your Trip</h1>

          <div className="trip-feed-div">
            <Link to={`/home/${formData.id}`} >
              <img className="trip-image" src={formData.image} alt="trip image"/> 
            </Link>
            <div className="trip-name">{formData.name}</div>
          </div>

          <div className="trip-feed-div">
            <div className="center-div">
              <div className="mapbox-div">
                <ReactMapGl {...viewport}
                  mapboxApiAccessToken={publicToken}
                  onViewportChange={viewport => {
                    setViewport(viewport)
                  }}
                > { formData.latitudeLongitude && 
                  <Marker
                    latitude={formData.latitudeLongitude[1]}
                    longitude={formData.latitudeLongitude[0]}
                  >
                    
                    <div>
                      <img
                        height="40px"
                        width="40px"
                        src="https://i.imgur.com/6IzPeVa.png"
                      />
                    </div>
                  </Marker> }
                </ReactMapGl>                     
              </div>
            </div>
            <div className="trip-name">Current Location</div>
          </div>

          <div className="trip-feed-div">
            <form onSubmit={handleSubmit}> 
              <div>
                Name
              </div>
              <input
                placeholder="add a title"
                name="name"
                value={formData.name}
                onChange={handleChange} ></input>
              {formError.name && <p>{formError.name}</p>}

              <div>
                Description
              </div>
              <input
                placeholder="description"
                name="description"
                type="textfield"
                value={formData.description}
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
                name="location_string"
                onChange={(e) => {
                  handleNestedChange(e)
                  setFormError({ ...formError, location: '' })
                }}
                value={formData.location || ''}
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


export default EditATrip