import React from 'react'

const Blog = ({ blog, handleUpdateOnClick }) => (
  <div>
    <div>{blog.url}</div>
    <div>
      {blog.likes}
      <button onClick={handleUpdateOnClick}>like</button>
    </div>
  </div>
)

export default Blog