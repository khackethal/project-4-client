import React from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser, registerUser } from '../../lib/api'
import { setToken, setUserId } from '../../lib/auth'
import ImageUploadField from '../trips/ImageUploadField'
import AboutPopup from './AboutPopup'

function Home(){
  const history = useHistory()

  //* Handle PopUps
  const [aboutPopUp, setAboutPopUp] = React.useState(false)
  const [registerPopUp, setRegisterPopUp] = React.useState(false)
  const [ isRegistered, setIsRegistered ] = React.useState(false)
 
  const handleAboutPopUp = () => {
    setAboutPopUp(!aboutPopUp)
  }

  const handleRegisterPopUp = () => {
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
      setToken(req.data.token)
      setUserId(req.data.userId)
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
      setIsRegistered(true)
      setRegisterPopUp(false)
    } catch (err) {
      setIsRegisterError(err.response.data)
    }
  }

  return (
    <>
      <div className="home-body"> 
        <div className="home-main">
          <div className="home-section">
            {!aboutPopUp ? <h1 className="home-h1">tripbook</h1> : <h1></h1>}
            {/* <div>
              {aboutPopUp && <button className="login-button" onClick={handleAboutPopUp}>Close PopUp</button>}
            </div> */}
            {!aboutPopUp && <h2 className="home-h2">Helps you connect and share with the people in your life - through trips.</h2>}
            
            <div className="popup-div">
              {!aboutPopUp && <button className="about-button" onClick={handleAboutPopUp}>About</button>}
              { aboutPopUp && <div className="popup">
                <button className="login-button" onClick={handleAboutPopUp}>Close PopUp</button>
                < AboutPopup /> 
              </div>}
            </div>
          </div>

          {!aboutPopUp && <div className="home-div">

            {!registerPopUp && isRegistered && <p>Registration succesful! Please log in.</p>}

            {!registerPopUp && <form>
              <input
                className="register-input"
                id="top-space"
                placeholder="Email address"
                name="email"
                onChange={handleLogInChange}>          
              </input>
              <br></br>
              <input
                className="register-input"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleLogInChange}>          
              </input>
              <br></br>
              <button className="login-button" onClick={handleLogInSubmit}> Log In</button>
              {isLogInError && <p>No match for provided details, please double check email and password</p>}
              <br></br>
              <button className="btn-grad" onClick={handleRegisterPopUp}> Create New Account</button>
            </form>}

            {registerPopUp && <form>
              <input
                id="top-space"
                className="register-input"
                placeholder="Username"
                name="username"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.username && <small>Username is required</small>}
              </p>
              <input
                className="register-input"
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

              <p>
                {isRegisterError.profileImage && <small>Profile Image is required</small>}
              </p>
              <input
                className="register-input"
                placeholder="Your City"
                name="userCity"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.userCity && <small color="darkred">User Citry is required</small>}
              </p>
              <input
                className="register-input"
                placeholder="Your Country"
                name="userCountry"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.userCountry && <small>User Country is required</small>}
              </p>
              <input
                className="register-input"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.password && <small>Password is required</small>}
              </p>
              <input
                className="register-input"
                placeholder="Password confirmation"
                name="passwordConfirmation"
                type="password"
                onChange={handleRegisterChange}>          
              </input>
              <p>
                {isRegisterError.passwordConfirmation && <small>Passwords do not match</small>}
              </p>
              <button className="btn-grad"  onClick={handleRegisterSubmit}> Sign Up</button>
              <div ><button className="about-button" onClick={handleRegisterPopUp}>x</button></div>
            </form>}
          </div>}

        </div>
        <footer className="register-footer">
          {!aboutPopUp && <p>
            ©️ 2021 TripBook
          </p>}
        </footer>
      </div>
    </>
  )
}

export default Home

