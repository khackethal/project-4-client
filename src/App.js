import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SecureRoute from './components/auth/SecureRoute'
import Error from './components/auth/Error'

import HomeLoginRegister from './components/common/HomeLoginRegister'
import Home from './components/user/Home'
import Navbar from './components/common/Navbar'
import Profile from './components/user/Profile'
import NewTrip from './components/trips/NewTrip'




function App() {



  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeLoginRegister} />x
        </Switch>
      
        <Navbar />
        <Switch>
          < SecureRoute path="/newtrip" component={NewTrip} />
          < SecureRoute path="/home" component={Home}/> 
          < SecureRoute path="/profile/" component={Profile}/> 
          < SecureRoute component={Error} />
    
        </Switch>
      </BrowserRouter>
    </div> 
  )
}

export default App

