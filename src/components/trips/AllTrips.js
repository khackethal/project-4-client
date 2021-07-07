import React from 'react'
import { Link } from 'react-router-dom'
import { getAllTrips } from '../../lib/api'



function AllTrips() {


  const [ trips, setAllTrips ] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')


  React.useEffect(() => {

    const getData = async () => {

      try {
        const res = await getAllTrips()
        setAllTrips(res.data)
        console.log(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])


  //* search functions
  const handleInput = (e) => {
    setSearchTerm(e.target.value)
  }
  
  const handleClear = () => {
    setSearchTerm('')
  }
  
  const filteredTrips = trips?.filter((trip) => {
    return (
      trip.name.toLowerCase().includes(searchTerm) ||
      trip.owner.username.toLowerCase().includes(searchTerm) ||
      trip.description.toLowerCase().includes(searchTerm)
    )
  })




  return (
    <>
      <div className="trip-feed-div">
        <input
          placeholder="Search your Trip feed ..."
          type="text"
          className="search-input" 
          onChange={handleInput}
          value={searchTerm}
        />
        <button className="search-button" onClick={handleClear}>Clear Search</button>

      </div>

      { filteredTrips && filteredTrips.map(trip =>
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

        </div>) }
    </>



  )
}


export default AllTrips