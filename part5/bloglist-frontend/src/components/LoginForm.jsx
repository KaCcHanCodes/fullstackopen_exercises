import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ userDetails }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()

    userDetails({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }

  LoginForm.propTypes = {
    userDetails: PropTypes.func.isRequired
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input value={username} onChange={event => setUsername(event.target.value)} />
        </div>
        <div>
          password
          <input value={password} onChange={event => setPassword(event.target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm