import React from 'react'
import useSetUser from '../hooks/SetUser'
import SidebarRight from './SidebarRight'
import StatusBox from './StatusBox'
import AllTrips from '../trips/AllTrips'




function Home() {


  const user = useSetUser()



  return (    
    <>
      <div>

        <div className="homepage-container">

          <SidebarRight />

          <div id="growth" className="middle-container">

            <div className="status-div"> 
              <StatusBox />
            </div>


            <AllTrips />
 

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

export default Home