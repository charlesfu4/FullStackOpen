import React from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/loginReducer' 
import { addNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin}>
      <h1>Log in to application</h1>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type='text'
          name='username'
          data-cy='username'
        />
        <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            data-cy='password'
          />
        <Button variant="success" type='submit' data-cy='login-button'>login</Button>
        <Notification/>
      </Form.Group>
    </Form>
  )
}

export default LoginForm