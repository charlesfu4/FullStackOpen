import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loggedin, setLoggedin] = useState(false)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try{
      const returnedBlog = await blogService.create(newBlog)
      console.log(returnedBlog)
      blogs.concat(returnedBlog)
      setMessage({
        content: `a new blog ${returnedBlog.title}. by ${returnedBlog.author} added`,
        error: false
      })
      setTitle('')
      setAuthor('')
      setUrl('')
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

  return (
    <div>
      {message !== null &&  <Notification message={message} />}
            {user === null ?
       <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}
       username={username} password={password} /> : 
       <div>
        <BlogList user={user} blogs={blogs} handleLogout={handleLogout} addBlog={addBlog} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
          title={title} author={author} url={url}/> 
       </div>
      }
    </div>
  )
}

export default App