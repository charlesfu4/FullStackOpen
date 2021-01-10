import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <div>{blog.url}</div>
    <div>
      {blog.likes}
      <button>like</button>
    </div>
    <div>{blog.author}</div>
  </div>
)

export default Blog
