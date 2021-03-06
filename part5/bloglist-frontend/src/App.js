import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogHeader from './components/BlogHeader'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

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
      setUsername('')
      setPassword('')
    } catch(exception) {
      setMessage({ content: 'Wrong username or password', error: true })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  // add new blog by blogservice create
  const addBlog = async (blogObj) => {
    try{
      blogFromRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(returnedBlog))
      setMessage({
        content: `a new blog ${returnedBlog.title}. by ${returnedBlog.author} added`,
        error: false
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch(exception) {
      setMessage({ content: exception, error: true })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  // update blog by blogservice update
  const updateBlog = async (blogObj, id) => {
    try{
      const returnedBlog = await blogService.update(blogObj, id)
      setBlogs(blogs.map(blog => blog.id !== id ?
        blog : returnedBlog))
    } catch(exception) {
      setMessage({ content: exception, error: true })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  // remove blog by blogservice delete
  const deleteBlog = async (id) => {
    try{
      const remainedBlogs = blogs.filter(blog => blog.id !== id)
      await blogService.remove(id)
      setBlogs(remainedBlogs)
    } catch(exception) {
      setMessage({ content: exception, error: true })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
      {message !== null &&  <Notification message={message} />}
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