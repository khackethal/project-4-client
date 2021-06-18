import React from 'react'
import useSetUser from '../hooks/SetUser'
import { NavLink } from 'react-router-dom'
import SidebarRight from './SidebarRight'
import StatusBox from './StatusBox'




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

            <div className="middle-div"> Placeholder for trips feed.</div>


          </div>

          <div id="growth" className="right-container"> 
          Content</div>

        </div>
      </div>
    </>
  )
}

export default Home