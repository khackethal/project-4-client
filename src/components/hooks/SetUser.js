import React from 'react'
import { getUserId } from '../../lib/auth'
import { userProfileView } from '../../lib/api'

function useSetUser() {

  const userId = getUserId()

  const [user, setUser] = React.useState(null)


  React.useEffect(() => {
    const getData = async () => {
      try {
        const result = await userProfileView(userId)
        setUser(result.data)
        console.log(result.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  },[userId])


  return {
    user,
  }

}

export default useSetUser

