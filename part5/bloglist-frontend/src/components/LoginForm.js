import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername,
  setPassword, username, password }) => (
  <form onSubmit={handleLogin}>
    <h1>Log in to application</h1>
    <div>
      username
      <input
        type='text'
        value={username}
        name='Username'
        data-cy='username'
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type='password'
        value={password}
        name='Password'
        data-cy='password'
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type='submit' data-cy='login-button'>login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm