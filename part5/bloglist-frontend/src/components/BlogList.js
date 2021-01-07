import React from 'react'
import Blog from './Blog'

const BlogList = ({user, blogs, handleLogout }) => (
  <div>
    <h1>blogs</h1>
    <p>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </p>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div> 
)

export default BlogList