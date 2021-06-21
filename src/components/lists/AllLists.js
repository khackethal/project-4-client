import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { getAllUserLists } from '../../lib/api'
import SidebarRight from '../user/SidebarRight'



function AllLists() {


  const [ AllLists, setAllLists ] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState('')




  React.useEffect(() => {

    const getData = async () => {

      try {
        const res = await getAllUserLists()
        setAllLists(res.data)
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
  
  
  const filteredLists = AllLists?.filter((list) => {
    return (
      list.listName.toLowerCase().includes(searchTerm) ||
      list.owner.username.toLowerCase().includes(searchTerm) 
    )
  })



  return (
    <>
      <div>
        <div className="homepage-container">
          <SidebarRight />

          <div id="growth" className="middle-container">
            <h1 className="uppercase">All Lists</h1>

            <div className="trip-feed-div">
              <input
                placeholder="Search all lists ..."
                type="text"
                className="search-input" 
                onChange={handleInput}
                value={searchTerm}
              />
              <button className="search-button" onClick={handleClear}>Clear Search</button>
            </div>

            <div>
              
            </div>

            { filteredLists ? filteredLists.map(list =>
              <div className="trip-feed-div" key={list.id}>
                <Link className="list-link" to={`/home/triplists/${list.id}`} >
                  
                  <div className="trip-name">{list.listName}</div> </Link>
                <div className="card-bottom-div"> 
                  <div id="liked-by">
                    <p id="like-button">💙 </p>
                    {list.likedBy ? <p id="number-of-likes">{list.likedBy.length}</p> : <p id="number-of-likes"> 0</p>}
                    {list.comments ? <p>Comments: {list.comments.length} </p> : <p>No comments yet.</p>}
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


export default AllLists