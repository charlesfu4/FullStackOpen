import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogHeader from './components/BlogHeader'
import { addNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user) 

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  const blogFromRef = useRef() // blog form ref to the togglable component

  // handle logout request
  const handleLogout = () => {
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
      {user === null ?
        <LoginForm /> :
        <div>
          <BlogHeader user={user} handleOnClick={handleLogout} />
          {blogForm()}
          <BlogList user={user} />
        </div>
      }
    </div>
  )
}

export default App