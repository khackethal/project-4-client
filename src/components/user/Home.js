import React from 'react'
import SidebarLeft from './SidebarLeft'
import StatusBox from './StatusBox'
import AllTrips from '../trips/AllTrips'




function Home() {



  return (    
    <>
      <div>

        <div className="homepage-container">

          <SidebarLeft />

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