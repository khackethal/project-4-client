import React from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import Loader from 'react-loader-spinner'

import { isOwner } from '../../lib/auth'


import SidebarRight from '../user/SidebarRight'
import { 
  getSingleUserList, 
  deleteUserList,
  addOrRemoveTripFromList } from '../../lib/api'




function SingleList() {

  const [ list, setSingleList ] = React.useState(null)
  const { listId } = useParams()
  const history = useHistory()


  React.useEffect(() => {

    const getData = async () => {
      try {
        const res = await getSingleUserList(listId)
        setSingleList(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])



  //* delete list
  const handleDeleteList = () => {
    confirmAlert({
      title: 'Are you sure you would like to delete this list? ',
      message: 'Click yes to confirm the delete request.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {

            await deleteUserList(listId)
            history.push('/usertriplists')
            
          },
        },
        {
          label: 'No',
          onClick: () =>  { 
            return 
          },
        }
      ],
    })
  }

  //* delete trip on list
  const handleDeleteTripOnList = (e) => {
    confirmAlert({
      title: 'Are you sure you would like to delete this list? ',
      message: 'Click yes to confirm the delete request.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            await addOrRemoveTripFromList( e.target.value, listId)
            console.log(e.target.value, listId)
            const res = await getSingleUserList(listId)
            setSingleList(res.data)
                
          },
        },
        {
          label: 'No',
          onClick: () =>  { 
            return 
          },
        }
      ],
    })
  }

  




  return (
    <>
      <div>
        <div className="homepage-container">
          <SidebarRight />

          <div id="growth" className="middle-container">

            {list ? 
              <>
                <div className="trip-feed-div" key={listId.id}>
                  <div className="trip-name">{list.listName}</div>


                  <div className="center-div">

                  </div>
              

                  <div className="card-bottom-div"> 


                    <div id="posted-by"> 
                      <p>Posted by {list.owner.username}</p>
                      <Link to={`/profile/${list.owner.id}`} >
                        <img id="posted-by-image" height="100px" src={list.owner.profileImage} alt="owner profile image" /> 
                      </Link>
                      {isOwner(list.owner.id) &&
                      <>
                        <button 
                          onClick={handleDeleteList} className="edit-delete-button" >Delete List</button>
                      </>
                      }
                    </div>
                  </div>
                </div>

  
                { list?.trips && list.trips.map(trip =>
                  <div className="trip-feed-div" key={trip.id}>
                    <Link to={`/home/${trip.id}`} >
                      <img className="trip-image" src={trip.image} alt="trip image"/> </Link>
                    <div className="trip-name">{trip.name}</div>
                    <div className="card-bottom-div"> 
                      <div id="liked-by">
                        <p id="like-button">💙 </p>
                        {trip.likedBy ? <p id="number-of-likes">{trip.likedBy.length}</p> : <p id="number-of-likes"> 0</p>}
                        {trip.comments ? <p>Comments: {trip.comments.length} </p> : <p>No comments yet.</p>}
                        <Link className="home-link" to={`/home/${trip.id}`} >
                          <button className="status-button">View More</button>
                        </Link>
                      </div>
                      <div id="posted-by"> 
                        <p>Posted by {trip.owner.username}</p>
                        <Link  to={`/profile/${trip.owner.id}`} >
                          <img id="posted-by-image" height="100px" src={trip.owner.profileImage} alt="owner profile image" /> 
                        </Link>
                      </div>
                    </div>
                    {isOwner(list.owner.id) &&
                      <>
                        <button 
                          value={trip.id}
                          onClick={handleDeleteTripOnList} className="edit-delete-button" >Remove from List</button>
                      </>
                    }

                  </div> ) }


                                    
              </> : 
              <Loader
                type="ThreeDots"
                color="#1877F2"
                height={100}
                width={100}
                timeout={3000} 
              /> }


          </div> 

          <div id="growth"  className="right-container">
            <div className="message-div">Messages</div>
            <div className="message-div">Contacts</div>
          </div>
        </div>
      </div>
    </>
  )
}


export default SingleList