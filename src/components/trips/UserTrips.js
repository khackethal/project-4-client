import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { getAllTrips } from '../../lib/api'
import SetUser from '../hooks/SetUser'
import SidebarRight from '../user/SidebarRight'



function UserTrips() {


  const [ trips, setAllTrips ] = React.useState(null)

  const { user } = SetUser()
  const username = user?.username


  React.useEffect(() => {

    const getData = async () => {

      try {
        const res = await getAllTrips()
        setAllTrips(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])



  return (
    <>
      <div>
        <div className="homepage-container">
          <SidebarRight />

          <div id="growth" className="middle-container">

            { trips ? trips.filter(trip => trip.owner.username.includes(username)).map(trip =>
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


export default UserTrips