import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleUpdateOnClick }) => (
  <div className='singleBlog'>
    <Togglable
      succintInfo={`${blog.title} ${blog.author}`}
      forwardButton={'view'}
      backButton={'hide'}
    >
      <div>
        <div>{blog.url}</div>
        <div data-cy='blog-likes'>
          {blog.likes}
          <button onClick={handleUpdateOnClick} data-cy='like-button'>like</button>
        </div>
      </div>
    </Togglable>
  </div>
)

export default Blog