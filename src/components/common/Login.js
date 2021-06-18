import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Login({ onSubmit}) {

  const [isLogInError, setLogInError] = React.useState(false)
  const [ logInFormData, setLogInFormData] = React.useState({
    email: '',
    password: '',
  })

  const handleLogInChange = (e) => {
    setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value })
  }

  const handleLogInSubmit = async (e) => {
    e.preventDefault()


    try {
      const req = await loginUser(logInFormData)
      console.log(req.data)
      setToken(req.data.token)
      consolel(req.data.)
      console.log('logged in!')
      // history.push('/profile/')
    } catch (err) {
      setLogInError(true)
    }
  }








return (

)
}

export default Login