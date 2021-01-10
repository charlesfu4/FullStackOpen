import React from 'react'

const BlogHeader = ({user, handleOnClick}) => (
  <div>
    <h1>blogs</h1>
    <p>
      <b>{user.name}</b> logged in  <button onClick={handleOnClick}>logout</button>
    </p>
  </div>
)

export default BlogHeader