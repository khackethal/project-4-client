import React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import ReactMapGl, { Marker } from 'react-map-gl'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loader from 'react-loader-spinner'

import { publicToken } from '../../lib/mapbox'
import { isOwner } from '../../lib/auth'



import SidebarRight from '../user/SidebarRight'
import AddToList from '../lists/AddToList'
import { 
  getSingleTrip, 
  // EditTrip ,
  deleteTrip, 
  commentOnTrip, 
  deleteCommentOnTrip, 
  likeAndUnlikeTrip,
  headers } from '../../lib/api'




function SingleTrip() {

  const [ trip, setSingleTrip ] = React.useState(null)
  const { tripId } = useParams()
  const [hasComments, setHasComments] = React.useState(false)
  const history = useHistory()



  React.useEffect(() => {

    const getData = async () => {
      try {
        const res = await getSingleTrip(tripId)
        setSingleTrip(res.data)
        //* set map
        setViewport({
          ...viewport,
          longitude: res.data.latitudeLongitude[0],
          latitude: res.data.latitudeLongitude[1],
          zoom: 10,
        })
      } catch (e) {
        console.log(e)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ hasComments ])

  //* For map content-------------------
  const [viewport, setViewport] = React.useState({
    latitude: 51.51106,
    longitude: -0.13519,
    width: '500px',
    height: '500px',
    zoom: 14,
  })

  //* Like function
  const setLikes = async (e) => {
    e.preventDefault()
    try {
      await likeAndUnlikeTrip(tripId)
      const res = await getSingleTrip(tripId)
      setSingleTrip(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  //* for comments/error state
  const [formComment, setFormComment] = React.useState({
    content: '',
  })

  const [formError, setFormError] = React.useState(formComment)

  const handleChange = (e) => {
    setFormComment({ ...formComment,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formComment.content) {
      try {
        await commentOnTrip(tripId, formComment)
        e.target.value = ''
        setHasComments(!hasComments)
        setFormComment({ ...formComment, content: '' })
        setFormError('')
      } catch (err) {
        setFormError({ ...formError, text: err.response.data.errMessage })
      }
    } else {
      return
    }
  }

  //* delete a comment
  const handleDelete = async (e) => {
    e.preventDefault()
    console.log(e.target.name)

    try {

      await deleteCommentOnTrip(tripId, e.target.name),
      headers()
      setHasComments(!hasComments)
      setFormError({ ...formComment, text: '' })

    } catch (err) {
      console.log(err)
    }
  }

  //* delete trip
  const handleDeleteTrip = () => {
    confirmAlert({
      title: 'Are you sure you would like to delete this trip? ',
      message: 'Click yes to confirm the delete request.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {

            await deleteTrip(tripId)
            history.push('/home')
            
          },
        },
        {
          label: 'No',
          onClick: () =>  { 
            return 
          },
        }
      ],
    })
  }


  //* Edit a trip
  const handleTripEdit = async() => {
    history.push(`/home/${tripId}/edit/`)
  }





  return (
    <>
      <div>
        <div className="homepage-container">
          <SidebarRight />

          <div id="growth" className="middle-container">

            {trip ? 
              <>
                <div className="trip-feed-div" key={trip.id}>
                  <img className="trip-image" src={trip.image} alt="trip image"/> 
                  <div className="trip-name">{trip.name}</div>
                  <div id="description-div">
                    <p>{trip.description}</p>
                    <p>{trip.description}</p>
                    <p>{trip.description}</p>
                  </div>


                  <div className="center-div">
                    <div className="mapbox-div">
                      <ReactMapGl {...viewport}
                        mapboxApiAccessToken={publicToken}
                        // mapStyle={mapboxStyleUrl}
                        onViewportChange={viewport => {
                          setViewport(viewport)
                        }}
                      >
                        <Marker
                          latitude={trip.latitudeLongitude[1]}
                          longitude={trip.latitudeLongitude[0]}
                        >
                          <div>
                            <img
                              height="40px"
                              width="40px"
                              src="https://i.imgur.com/6IzPeVa.png"
                            />
                          </div>
                        </Marker>
                      </ReactMapGl>                     
                    </div>
                  </div>
              

                  <div className="card-bottom-div"> 
                    <div id="liked-by">
                      <button onClick={setLikes}><p id="like-button">💙 </p></button>
                      {trip.likedBy ? <p id="number-of-likes">{trip.likedBy.length}</p> : <p id="number-of-likes"> </p>}
                      {trip.comments ? <p>Comments: {trip.comments.length} </p> : <p>No comments yet.</p>}
                    </div>


                    <div id="posted-by"> 
                      <p>Posted by {trip.owner.username}</p>
                      <Link to={`/profile/${trip.owner.id}`} >
                        <img id="posted-by-image" height="100px" src={trip.owner.profileImage} alt="owner profile image" /> 
                      </Link>
                      {isOwner(trip.owner.id) &&
                      <>
                        <button 
                          onClick={handleTripEdit}
                          className="edit-delete-button" >Edit Trip</button>
                        <button 
                          onClick={handleDeleteTrip} className="edit-delete-button" >Delete Trip</button>
                      </>
                      }
                    </div>
                  </div>
                </div>

                < AddToList />



                <div className="comment-div" >
                  
                  <h3 className="uppercase">Add a Comment</h3>
                  <input
                    className="comment-input"
                    placeholder="Type your comment here.."
                    name="content"
                    value={formComment.content || ''}
                    onChange={handleChange}
                  />
                  <button className="comment-button" onClick={handleSubmit}>Submit Comment</button>
                </div>

                <div className="comment-div" >
                  <h3 className="uppercase">Comments</h3>
                  {trip?.comments ? trip.comments.map(comment => {
                    
                    return (
                      <div className="comment-display-div"  key={comment.id}>
                        <p>{comment.content}</p>
                        <div className="comment-owner-div">
                          <p className="inline"> Posted by {comment.owner.username}</p>
                          <Link  to={`/profile/${comment.owner.id}`} >
                            <img className="inline" id="posted-by-image" height="30px" src={comment.owner.profileImage} alt="post owner profile image" />
                          </Link>
                          {isOwner(comment.owner.id) &&
                          <button
                            name={comment.id}
                            onClick={handleDelete}
                            className="comment-button"
                          >
                            Delete comment
                          </button>
                          }
                        </div>
                      </div>
                    )

                  })                              
                    : <p>No comments to show</p>}
                </div>
        
              </> : 
              <Loader
                type="ThreeDots"
                color="#1877F2"
                height={100}
                width={100}
                timeout={3000} 
              /> }
          </div> 

          <div id="growth"  className="right-container">
            <div className="message-div">Messages</div>
            <div className="message-div">Contacts</div>
          </div>
        </div>
      </div>
    </>
  )
}


export default SingleTrip