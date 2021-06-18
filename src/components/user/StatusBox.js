import React from 'react'
import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import { editUserProfile } from '../../lib/api'
import { useHistory } from 'react-router-dom'



function StatusBox() {

  const history = useHistory()

  const [ userStatus, setUserStatus]= React.useState(null)

  const user = useSetUser()
  const userId = user.user?.id

  console.log(userId)

  const { formData, handleChange } = useForm({
    status: '',

  })

  console.log(formData)



  const handleStatusSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await editUserProfile(userId, formData)
      console.log('res',res.data)
      history.push('/home')
    } catch (err) {
      console.log(err)
    }
  }




  return (
    <>
      { user.user?.username ? 
        <div >
          <img className="status-image" height="100px" src={user.user.profileImage} alt="profile image" />
          <p>{user.user?.status}</p> 
          <input onChange={handleChange} className="status-input" width="100px" placeholder={`What's on your mind, ${user.user?.username}?`}></input>
          <div className="status-button-div">
            <button onClick={handleStatusSubmit} className="status-button">Submit Status</button>
          </div>
        </div> : <p>...loading</p>}
    </>
  )
}

export default StatusBox