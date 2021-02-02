import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogHeader from './components/BlogHeader'
import { addNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getAllBlogs = async () => {
      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const blogFromRef = useRef() // blog form ref to the togglable component

  // handle login request
  const handleLogin = async event => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      dispatch(addNotification(`User ${user} logged in`, false, 5))
      setUsername('')
      setPassword('')
    } catch(exception) {
      dispatch(addNotification('Wrong username or password', true, 5))
    }
  }

  // add new blog by blogservice create
  const addBlog = async (blogObj) => {
    try{
      blogFromRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(addNotification(`a new blog ${returnedBlog.title}. by ${returnedBlog.author} added`, false, 5))
    } catch(exception) {
      dispatch(addNotification(exception, true, 5))
    }
  }

  // update blog by blogservice update
  const updateBlog = async (blogObj, id) => {
    try{
      const returnedBlog = await blogService.update(blogObj, id)
      setBlogs(blogs.map(blog => blog.id !== id ?
        blog : returnedBlog))
    } catch(exception) {
      dispatch(addNotification(exception, true, 5))
    }
  }

  // remove blog by blogservice delete
  const deleteBlog = async (id) => {
    try{
      const remainedBlogs = blogs.filter(blog => blog.id !== id)
      await blogService.remove(id)
      setBlogs(remainedBlogs)
    } catch(exception) {
      dispatch(addNotification(exception, true, 5))
    }
  }

  // handle logout request
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // togglable blog form with a ref to togglevisibility
  const blogForm = () => (
    <Togglable forwardButton={'create new blog'} backButton={'cancel'} ref={blogFromRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        /> :
        <div>
          <BlogHeader user={user} handleOnClick={handleLogout} />
          {blogForm()}
          <BlogList
            user={user}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            blogs={blogs}
          />
        </div>
      }
    </div>
  )
}

export default App