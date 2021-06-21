import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useSetUser from '../hooks/SetUser'
import { getAllUserLists } from '../../lib/api'


import { addOrRemoveTripFromList } from '../../lib/api'


function AddToList() {

  const { user } = useSetUser()
  const username = user?.username
  const [userLists, setUserLists ] = React.useState(null)
  // const [ userFilteredLists, setUserFilteredLists ] = React.userState(null)
  const [ listId, setListId ] = React.useState(null)

  const { tripId } = useParams()
  const history = useHistory()




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

  const handleChange = (e) => {
    setListId(e.target.value)
    console.log(listId)
  }


  const handleListAddSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await addOrRemoveTripFromList(tripId, listId)
      console.log('res', res.data)
      history.push(`triplists/${listId}`)

    } catch (err) {
      console.log(err)
    }
  }




  return (
    <>
      <div className="comment-div">
        <h3 className="uppercase">To add Trip to list- Select A List</h3>
        { userLists ? userLists.filter(list => (list.owner.username.includes(username) && !list.trips.includes(tripId))).map(list =>
          <p key={list.id}>
            <label>
              <input type="checkbox"
                name="isPublic"
                value={list.id}
                onChange={handleChange}
              />
            </label> {list.listName}
          
          </p> ) : <p>None</p>}
        <button onClick={handleListAddSubmit} className="comment-button">Add To List</button>
      </div>
    </>
  )
}

export default AddToList