import React from 'react'
import Blog from './Blog'
import Create from './Create'

const BlogList = ({ user, blogs, handleLogout, addBlog, setTitle, setAuthor, setUrl,
 title, author, url }) => (
  <div>
    <h1>blogs</h1>
    <p>
      <b>{user.name}</b> logged in  <button onClick={handleLogout}>logout</button>
    </p>
    <Create addBlog={addBlog} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}
      title={title} author={author} url={url}/>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div> 
)

export default BlogList