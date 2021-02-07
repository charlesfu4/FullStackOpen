import React, { useEffect, useRef } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogHeader from './components/BlogHeader'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { addNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const loginUser = useSelector(state => state.loginUser) 

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

  return (
    <div>
      <Notification />
      {loginUser === null ?
        <LoginForm /> :
        <div>
          <BlogHeader user={loginUser} handleOnClick={handleLogout} />
          <Router>
            <Switch>
              <Route path='/users'>
                <Users />
              </Route>
              <Route>
                <div>
                  {blogForm()}
                  <BlogList user={loginUser} />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      }
    </div>
  )
}

export default App