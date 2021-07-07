import React from 'react'
import { useHistory } from 'react-router-dom'

import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import { createNewList } from '../../lib/api'
// eslint-disable-next-line
import Error from '../auth/Error'
import Loader from 'react-loader-spinner'




function CreateNewList() {

  const { user } = useSetUser()
  const [ Error, setIsError ] = React.useState(false)
  const history = useHistory()

  const { formData, handleChange } = useForm({
    listName: '',
    isPublic: 'true',

  })

  console.log(formData)

  const handleListSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createNewList(formData)
      history.push(`home/triplists/${res.data.id}`)
    } catch (err) {
      setIsError(true)
    }
  }




  return (
    <>
      { Error &&
      < Error />  }
      { user?.username ? 
        <div >
          <div className="input-div">
            <input 
              name="listName" 
              onChange={handleChange}
              className="status-input" 
              width="100px"
              placeholder= {'New List Name'}></input>
          </div>
          <div>
            <p> Set to Private : </p>
            <label>
              <input type="checkbox"
                name="isPublic"
                value={false}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="status-button-div">
            <button onClick={handleListSubmit} className="status-button">Create List</button>
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

export default CreateNewList