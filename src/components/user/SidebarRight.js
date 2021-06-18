import React from 'react'
import useSetUser from '../hooks/SetUser'
import { NavLink } from 'react-router-dom'



function SidebarRight () {

  const user = useSetUser()

  return (
    <>

      { user.user?.username ? 
          
    
        <div id="growth" className="side-container">
          <NavLink className="side-link" to="/profile">
            <div className="first-container">
              <img className="side-image" height="100px" src={user.user.profileImage} alt="profile image" />
              <p className="username">{user.user.username}</p>
            </div> 
          </NavLink>



          <NavLink className="side-link" to="/profile">
            <div className="first-container">
              <p className="username">{user.user.username}'s Trips</p>
            </div> 
          </NavLink>

          <NavLink className="side-link" to="/profile">
            <div className="first-container">
              <p className="username">{user.user.username}'s Lists</p>
            </div> 
          </NavLink>

          <NavLink className="side-link" to="/newtrip">
            <div className="first-container">
              <p className="username">Create Trip</p>
            </div> 
          </NavLink>

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 

          <div className="first-container">
            <p className="username"></p>
          </div> 



        </div>

        
        : <p>...loading</p>
      }
    </>
  )


}

export default SidebarRight