import React from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import useSetUser from '../hooks/SetUser'


function UserProfileView() {

  const user = useSetUser()





  return (
    <>
      {user.user?.username ? <div>
      
        <h1>Welcome back {user.user.username}!</h1>
        <p>City: {user.user.userCity}</p>
        <p>Country:  {user.user.userCountry}</p>
        <img height="150px" src={user.user.profileImage} alt="profile image" />
        <p></p>
        <button>Edit Profile</button>
      
      </div> : <p>...loading </p>}
    </>

  )
}

export default UserProfileView

