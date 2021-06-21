import React from 'react'
import useSetUser from '../hooks/SetUser'
import { NavLink } from 'react-router-dom'
import Loader from 'react-loader-spinner'



function SidebarRight () {

  const { user } = useSetUser()

  return (
    <>

      { user?.username ? 
          
    
        <div id="growth" className="side-container">
          <NavLink className="side-link" to="/profile">
            <div className="first-container">
              <img className="side-image" height="100px" src={user.profileImage} alt="profile image" />
              <p className="username">{user.username}</p>
            </div> 
          </NavLink>

          <NavLink className="side-link" to="/usertrips">
            <div className="first-container">
              <p className="side-text">My Trips</p>
            </div> 
          </NavLink>

          <NavLink className="side-link" to="/usertriplists">
            <div className="first-container">
              <p className="side-text">My Lists</p>
            </div> 
          </NavLink>

          <NavLink className="side-link" to="/newtrip">
            <div className="first-container">
              <p className="side-text">Create Trip</p>
            </div> 
          </NavLink>

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 
          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 

          <div className="empty-container">
            <p className="username"></p>
          </div> 



        </div>

        
        :       <Loader
          type="ThreeDots"
          color="#1877F2"
          height={100}
          width={100}
          timeout={3000} 
        />
      }
    </>
  )


}

export default SidebarRight