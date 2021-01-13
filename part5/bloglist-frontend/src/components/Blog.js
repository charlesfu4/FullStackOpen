import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdateOnClick, ref }) => (
  <div className='singleBlog'>
    <Togglable
      succintInfo={`${blog.title} ${blog.author}`}
      forwardButton={'view'}
      backButton={'hide'}
      ref={ref}
    >
      <div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={handleUpdateOnClick}>like</button>
        </div>
      </div>
    </Togglable>
  </div>
)

export default Blog