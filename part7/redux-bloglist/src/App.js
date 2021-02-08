import React, { useEffect, useRef } from 'react'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogHeader from './components/BlogHeader'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { addNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser) 
  const users = useSelector(state => state.users) 

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  
  const blogFromRef = useRef() // blog form ref to the togglable component

  // handle logout request
  const handleLogout = () => {
    dispatch(addNotification(`${loginUser.name} log out`, false, 5))
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // togglable blog form with a ref to togglevisibility
  const blogForm = () => (
    <Togglable forwardButton={'create new blog'} backButton={'cancel'} ref={blogFromRef}>
      <BlogForm />
    </Togglable>
  )

  // router match for users id
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  return (
    <div>
      <Notification />
      {loginUser === null ?
        <LoginForm /> :
        <div>
          <BlogHeader user={loginUser} handleOnClick={handleLogout} />
          <Switch>
            {user
              ?
              <Route path='/users/:id'>
                <User user={user}/>
              </Route>
              : null
            }
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <div>
                {blogForm()}
                <BlogList user={loginUser} />
              </div>
            </Route>
          </Switch>
        </div>
      }
    </div>
  )
}

export default App