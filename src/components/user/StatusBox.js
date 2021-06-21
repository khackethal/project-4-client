import React from 'react'
import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import { editUserProfile } from '../../lib/api'
import Loader from 'react-loader-spinner'




function StatusBox() {

  const { user, setUser } = useSetUser()
  const userId = user?.id
  const [ statusPlaceholder, setStatusPlaceholder ] = React.useState(null)

  const { formData, handleChange } = useForm({
    status: '',

  })

  const handleStatusSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await editUserProfile(userId, formData)
      console.log('res', res.data)
      setStatusPlaceholder(`What's on your mind, ${user.username}?`)
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
              placeholder= {statusPlaceholder ?  { statusPlaceholder } : `What's on your mind, ${user?.username}?`}></input>
          </div>
          <div className="status-button-div">
            <button onClick={handleStatusSubmit} className="status-button">Submit Status</button>
          </div>
        </div> : 
        <Loader
          type="ThreeDots"
          color="#1877F2"
          height={100}
          width={100}
          timeout={3000} 
        />}
    </>
  )
}

export default StatusBox