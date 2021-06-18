import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AllTrips() {

  
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/trips/') // * <-- replace with your endpoint
      const data = await res.json()
      console.log(data)
    }
    getData()
  })

  return <h1>Hello World</h1>
}


export default AllTrips