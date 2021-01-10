import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = ({ blogs }) => {
  return(
    <div>
      {blogs.map(blog =>
        <div key={blog.id} className='blogBlock'>
          <Togglable succintInfo={blog.title} forwardButton={'view'} backButton={'hide'}>
            <Blog blog={blog} />
          </Togglable>
        </div>
      )}
    </div>

  )
}

export default BlogList