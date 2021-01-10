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
  const [loggedin, setLoggedin] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [loggedin])


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
      setUser(user)
      setLoggedin(true)
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
      blogs.concat(returnedBlog)
      setMessage({
        content: `a new blog ${returnedBlog.title}. by ${returnedBlog.author} added`,
        error: false
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch(exception) {
      console.log(exception)
    }
  }

  // handle logout request
  const handleLogout = event => {
    setUser(null)
    setLoggedin(false)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // togglable blog form with a ref to togglevisibility 
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFromRef}>
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
        <BlogList blogs={blogs} createBlog={addBlog} /> 
       </div>
      }
    </div>
  )
}

export default App