import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken, removeUserId } from '../../lib/auth'
import useSetUser from '../hooks/SetUser'

function Navbar() {

  useLocation()
  const history = useHistory()
  // const location = useLocation()
  const { user } = useSetUser()

  // const [isOpen, setIsOpen] = React.useState(false)
  const isLoggedIn = isAuthenticated()

  // React.useEffect(() => {
  //   setIsOpen(false)
  // }, [location.pathname])

  // const handleToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  const handleLogout = () => {
    removeToken()
    removeUserId()
    history.push('/')
  }

  return (

    <nav className="navbar">
      {isLoggedIn &&  
        <>

          <NavLink activeClassName="active" className="navbar-link" to="/home"> Home</NavLink>
          <NavLink activeClassName="active"className="navbar-link" to="/profile"> Profile</NavLink>
          <NavLink activeClassName="active"className="navbar-link" to="/newtrip"> New Trip</NavLink>
          <NavLink activeClassName="active"className="navbar-link" id="navbar-space" to="/triplists"> Browse User Lists</NavLink>
          {/* <NavLink activeClassName="active"className="navbar-link" id="navbar-space" to="/explore"> Trip Inspiration</NavLink> */}
          { user?.id && <img className="profile-image" height="50px" src={user.profileImage} alt="profile image" /> } 
          { user?.id && <p className="navbar-username">Welcome, {user?.username}</p>} 
          <button className="navbar-button" onClick={handleLogout}>Log out</button>
        </>}
    </nav>
  )
}
export default Navbar
