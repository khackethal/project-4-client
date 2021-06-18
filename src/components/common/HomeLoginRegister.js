import React from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser, registerUser } from '../../lib/api'
import { setToken, setUserId } from '../../lib/auth'
import ImageUploadField from '../trips/ImageUploadField'

function Home(){
  const history = useHistory()

  //* Handle PopUps
  const [aboutPopUp, setAboutPopUp] = React.useState(false)
  const [registerPopUp, setRegisterPopUp] = React.useState(false)
 

  const handleAboutPopUp = (e) => {
    setAboutPopUp(!aboutPopUp)
  }

  const handleRegisterPopUp = (e) => {
    setRegisterPopUp(!registerPopUp)
  }

  //* Log in
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
      setUserId(req.data.userId)
      console.log(req.data.userId)
      console.log('logged in!')
      history.push('/home')
    } catch (err) {
      setLogInError(true)
    }
  }

  //* Register
  const [ registerFormData, setRegisterFormData] = React.useState({
    username: '',
    email: '',
    profileImage: '',
    userCity: '',
    userCountry: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleUpload = (file) => {
    handleRegisterChange({ target: { name: 'profileImage', value: file } })
  }

  const [isRegisterError, setIsRegisterError] = React.useState(registerFormData)

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.name]: e.target.value })
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()


    try {
      const req = await registerUser(registerFormData)
      setToken(req.data.token)
      console.log('success!')
      history.push('/')
    } catch (err) {
      setIsRegisterError(err.response.data)
    }
  }





  console.log(logInFormData)

  

  return (
    <>
      <div className="home-body"> 
        <div className="home-main">
          <div className="home-section">
            <h1 className="home-h1">tripbook</h1>
            <h2 className="home-h2">Helps you connect and share with the people in your life - through trips.</h2>
            
            {!aboutPopUp && <button className="home-about-button" onClick={handleAboutPopUp}>About</button>}
            { aboutPopUp && <p>Like Facebook but for Trips</p>}
            {aboutPopUp && <button onClick={handleAboutPopUp}>x</button>}
          </div>


          <div className="home-div">

            {!registerPopUp && <form>
              <input
                placeholder="Email address"
                name="email"
                onChange={handleLogInChange}>          
              </input>
              <br></br>
              <input
                placeholder="Password"
                name="password"
                onChange={handleLogInChange}>          
              </input>
              <br></br>
              <button onClick={handleLogInSubmit}> Log In</button>
              {isLogInError && <p>No match for provided details, please double check email and password</p>}
              <br></br>
              <button onClick={handleRegisterPopUp}> Create New Account</button>
              
            </form>}

            {registerPopUp && <form>
              <input
                placeholder="Username"
                name="username"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.username && <small>Username is required</small>}
              </p>
              <input
                placeholder="Email address"
                name="email"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.email && <small>Email is required</small>}
              </p>

              <div>
                <ImageUploadField onUpload={handleUpload} />
              </div>


              {/* {
                registerFormData.profileImage ? null : (
                  <input
                    placeholder="profile image"
                    name="profileImage"
                    onChange={handleRegisterChange}>          
                  </input>
                )
              } */}
              <p>
                {isRegisterError.profileImage && <small>Profile Image is required</small>}
              </p>
              <input
                placeholder="Your City"
                name="userCity"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.userCity && <small>User Citry is required</small>}
              </p>
              <input
                placeholder="Your Country"
                name="userCountry"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.userCountry && <small>User Country is required</small>}
              </p>
              <input
                placeholder="Password"
                name="password"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.password && <small>Password is required</small>}
              </p>
              <input
                placeholder="Password confirmation"
                name="passwordConfirmation"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.passwordConfirmation && <small>Passwords do not match</small>}
              </p>
              <button onClick={handleRegisterSubmit}> Register</button>
            </form>}



          </div>

        </div>
        <footer>
          <p>
            ©️ 2021 TripBook
          </p>
        </footer>
      </div>
    </>

  )

}

export default Home

