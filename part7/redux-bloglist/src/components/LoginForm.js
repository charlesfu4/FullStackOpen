import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer' 
import { addNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()

  // handle login
  const handleLogin = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(addNotification(`User ${user.name} logged in`, false, 5))
    } catch(exception) {
      dispatch(addNotification('Wrong username or password', true, 5))
    }
  }


  return(
    <form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <div>
        username
        <input
          type='text'
          name='username'
          data-cy='username'
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='password'
          data-cy='password'
        />
      </div>
      <button type='submit' data-cy='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm