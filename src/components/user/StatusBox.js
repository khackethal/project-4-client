import React from 'react'
import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import { editUserProfile } from '../../lib/api'




function StatusBox() {

  const { user, setUser } = useSetUser()
  const userId = user?.id

  const { formData, handleChange } = useForm({
    status: '',

  })

  const handleStatusSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await editUserProfile(userId, formData)
      console.log('res', res.data)
      setUser( { ...user, status: res.data.status })
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      { user?.username ? 
        <div >
          <img className="status-image" height="100px" src={user.profileImage} alt="profile image" />
          <p className="status-paragraph">{user?.status}</p> 
          <div className="input-div">
            <input 
              name="status" 
              onChange={handleChange}
              className="status-input" 
              width="100px"
              placeholder={`What's on your mind, ${user?.username}?`}></input>
          </div>
          <div className="status-button-div">
            <button onClick={handleStatusSubmit} className="status-button">Submit Status</button>
          </div>
        </div> : <p>...loading</p>}
    </>
  )
}

export default StatusBox