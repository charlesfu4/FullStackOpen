import React from 'react'
const Blog = ({ blog, handleOnClick }) => {
  return(
  <div>
    <div>{blog.url}</div>
    <div>
      {blog.likes}
      <button onClick={handleOnClick}>like</button>
    </div>
    <div>{blog.author}</div>
  </div>
)
}

export default Blog
