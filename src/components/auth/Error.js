import { useHistory } from 'react-router-dom'

function Error() {
  const history = useHistory()

  const handleRedirect = () => {
    history.push('/home/')
  }

  return (
    <>
      <h1>
        Sorry, something went wrong! Go back home? 
      </h1>
      <button onClick={handleRedirect}>Take me home</button>
    </>
  )
}

export default Error