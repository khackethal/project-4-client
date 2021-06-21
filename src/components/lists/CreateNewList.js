import React from 'react'
import { useHistory } from 'react-router-dom'

import useSetUser from '../hooks/SetUser'
import { useForm } from '../hooks/useForm'
import { createNewList } from '../../lib/api'
import Loader from 'react-loader-spinner'






function CreateNewList() {

  const { user } = useSetUser()
  const history = useHistory()

  // const [ isPublic, setIsPublic ] = React.useState(true)

  const { formData, handleChange } = useForm({
    listName: '',
    isPublic: 'true',

  })

  console.log(formData)

  const handleListSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createNewList(formData)
      console.log('res', res.data)
      history.push(`home/triplists/${res.data.id}`)

    } catch (err) {
      console.log(err)
    }
  }




  return (
    <>
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
            {/* <p> Set to Private : </p>
            
            <label>
              <input type="checkbox"
                name="isPublic"
                value={isPublic}
                // onChange={handleChange}
                // onChange={() => value="false"}
              />
            </label> */}
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