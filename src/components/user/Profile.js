import React from 'react'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'

import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import SidebarLeft from './SidebarLeft'
import ImageUploadField from '../trips/ImageUploadField'
import { getAllTrips, getAllUserLists, editUserProfileImage  } from '../../lib/api'


function UserProfileView() {
  const { user, setUser } = useSetUser()

  const [ trips, setAllTrips ] = React.useState(null)
  const [ tripView, setTripView ] = React.useState(false)

  const [ userLists, setUserLists ] = React.useState(null)
  const [ listView, setListView ] = React.useState(false)

  const [ editProfileImage, setEditProfileImage ] = React.useState(false)

  const { formData, handleChange, formError, setFormError } = useForm({
    profileImage: '',
  })


  React.useEffect(() => {

    const getData = async () => {
      try {
        const res1 = await getAllTrips()
        setAllTrips(res1.data)
        const res2 = await getAllUserLists()
        setUserLists(res2.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])


  const handleSetTripView = () => {
    setTripView(!tripView)
    setListView(false)
  }

  const handleSetListView = () => {
    setListView(!listView)
    setTripView(false)
  }

  //* Edit profile image
  const handleProfileEdit = async() => {
    setEditProfileImage(!editProfileImage)
  }

  const handleUpload = (file) => {
    handleChange({ target: { name: 'profileImage', value: file } })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await editUserProfileImage(user.id, formData)
      console.log(res.data.profileImage)
      setUser( { ...user, profileImage: res.data.profileImage })
    } catch (err) {
      setFormError({ ...formError, errMessage: err.response.data.errMessage })
    }
  }


  return (
    <>
      <div>

        <div className="homepage-container">
          

          <SidebarLeft />

          <div id="growth" className="middle-container">

            { user ?  
              <div className="trip-feed-div" key={user.id}>
                <img className="trip-image" width="600px" src={user.profileImage} alt="profile image"/> 
                <button 
                  onClick={handleProfileEdit}
                  className="edit-delete-button" >Change Profile Image</button>
                { editProfileImage &&  
                <>              
                  <div>
                    <ImageUploadField onUpload={handleUpload} />
                  </div>
                  <button className="profile-image-button" onClick={handleSubmit}> Submit New Image </button>
                </>}
                <div className="trip-name">{user.usernamename}</div>
                <div id="description-div">
                  <h1 className="trip-name">{user.userCity}, {user.userCountry}</h1>
                  {user.status &&  <h1 className="trip-name">  {user.status}</h1>}
                </div>
                <div className="card-bottom-div"> 
                  <div id="user-card-link-divs">
                    <h1 className="trip-name">My Trips</h1>
                    <button onClick={handleSetTripView}>Show</button>
                  </div>
                  <div id="user-card-link-divs">
                    <h1 className="trip-name">My Lists</h1>
                    <button onClick={handleSetListView}>Show</button>
                  </div>
                </div>
              </div> : 
              <Loader
                type="ThreeDots"
                color="#1877F2"
                height={100}
                width={100}
                timeout={3000} 
              />}

            {tripView && 
              <>
                { trips ? trips.filter(trip => Number(trip.owner.id) === Number(user.id)).map(trip =>
                  <div className="trip-feed-div" key={trip.id}>
                    <Link to={`/home/${trip.id}`} >
                      <img className="trip-image" src={trip.image} alt="trip image"/> </Link>
                    <div className="trip-name">{trip.name}</div>
                    <div id="description-div">
                      <p>{trip.description}</p>
                    </div>
                    <div className="card-bottom-div"> 
                      <div id="liked-by">
                        <p id="like-button">💙 </p>
                        {trip.likedBy ? <p id="number-of-likes">{trip.likedBy.length}</p> : <p id="number-of-likes"> 0</p>}
                        {trip.comments ? <p>Comments: {trip.comments.length} </p> : <p>No comments yet.</p>}
                        <Link className="home-link" to={`/home/${trip.id}`} >
                          <button className="status-button">View More</button>
                        </Link>
                      </div>
                      <div id="posted-by"> 
                        <p>Posted by {trip.owner.username}</p>
                        <Link  to={`/profile/${trip.owner.id}`} >
                          <img id="posted-by-image" height="100px" src={trip.owner.profileImage} alt="owner profile image" /> 
                        </Link>
                      </div>
                    </div>

                  </div>) :
                  <Loader
                    type="ThreeDots"
                    color="#1877F2"
                    height={100}
                    width={100}
                    timeout={3000} 
                  /> }

              </>}

            {listView && 

            <>
              { userLists ? userLists.filter(list => Number(list.owner.id) === Number(user.id)).map(list =>
                <div className="trip-feed-div" key={list.id}>
                  <Link className="list-link" to={`/home/triplists/${list.id}`} >

                            
                    <div className="trip-name" id="black">{list.listName}</div> </Link>
                  <div className="card-bottom-div"> 
                    <div id="liked-by">
                      <Link className="home-link" to={`/home/triplists/${list.id}`} >
                        <button className="status-button">View More</button>
                      </Link>
                    </div>
                    <div id="posted-by"> 
                      <p>Posted by {list.owner.username}</p>
                      <Link  to={`/profile/${list.owner.id}`} >
                        <img id="posted-by-image" height="100px" src={list.owner.profileImage} alt="owner profile image" /> 
                      </Link>
                    </div>
                  </div>
          
                </div>) : 
                <Loader
                  type="ThreeDots"
                  color="#1877F2"
                  height={100}
                  width={100}
                  timeout={3000} 
                /> }
            </>}

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


export default UserProfileView

