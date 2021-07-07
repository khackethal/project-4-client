import { useHistory } from 'react-router-dom'

function Error() {
  const history = useHistory()

  const handleRedirect = () => {
    history.push('/home/')
  }

  return (
    <>
      <div className="homepage-container">
        <div id="growth" className="side-container">
        </div>

        <div className="trip-feed-div">
          <h1>
            404 - Sorry, something went wrong! Go back home? 
          </h1>
          <button className="status-button" onClick={handleRedirect}>Take me home</button>
        </div>

        <div id="growth"  className="right-container">
        </div>
      </div>
    </>
  )
}

export default Error