import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SecureRoute from './components/auth/SecureRoute'
import Error from './components/auth/Error'

import HomeLoginRegister from './components/common/HomeLoginRegister'
import Home from './components/user/Home'
import Navbar from './components/common/Navbar'
import Profile from './components/user/Profile'
import OtherProfile from './components/user/OtherProfile'
import NewTrip from './components/trips/NewTrip'
import SingleTrip from './components/trips/SingleTrip'
import EditATrip from './components/trips/EditTrip'
import UserTrips from './components/trips/UserTrips'
import UserLists from './components/lists/UserLists'
import AllLists from './components/lists/AllLists'
import SingleList from './components/lists/SingleList'

// import { isAuthenticated } from './lib/auth'

function App() {

  // const isLoggedIn = isAuthenticated()

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeLoginRegister} />
        </Switch>


        
        <Navbar />
        <Switch>
          < SecureRoute path="/newtrip" component={NewTrip} />
          < SecureRoute exact path="/usertrips" component={UserTrips} />
          < SecureRoute exact path="/usertriplists" component={UserLists} />
          < SecureRoute exact path="/home/triplists/:listId" component={SingleList} />
          < SecureRoute exact path="/triplists" component={AllLists} />
          < SecureRoute path="/home/:tripId/edit/" component={EditATrip} />
          < SecureRoute path="/home/:tripId" component={SingleTrip} />
          < SecureRoute path="/home" component={Home}/> 
          < SecureRoute path="/profile/:userId" component={OtherProfile}/>
          < SecureRoute exact path="/profile/" component={Profile}/> 
          < SecureRoute path="*" component={Error} /> 
    
        </Switch> 
      </BrowserRouter>
    </div> 
  )
}

export default App

