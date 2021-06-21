import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { getAllUserLists } from '../../lib/api'
import SetUser from '../hooks/SetUser'
import SidebarRight from '../user/SidebarRight'
import CreateNewList from './CreateNewList'



function UserLists() {

  const [ userLists, setUserLists ] = React.useState(null)
  const [ createList, toggleCreateList ] = React.useState(false)


  const { user } = SetUser()
  const username = user?.username



  React.useEffect(() => {

    const getData = async () => {

      try {
        const res = await getAllUserLists()
        setUserLists(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  const setCreateList = () => {
    toggleCreateList(!createList)
    console.log(createList)

  }


  return (
    <>
      <div>
        <div className="homepage-container">
          <SidebarRight />

          <div id="growth" className="middle-container">
            <h1 className="uppercase">{username}'s Lists</h1>

            <div></div>

            <div>
              <button onClick={setCreateList} className="login-button">Create New List</button>
            </div>
            
            { createList && 
            <div className="trip-feed-div">
              < CreateNewList />
            </div>
            }

            { userLists ? userLists.filter(list => list.owner.username.includes(username)).map(list =>
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


export default UserLists