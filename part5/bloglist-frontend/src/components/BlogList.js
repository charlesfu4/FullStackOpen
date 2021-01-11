import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = ({ updateBlog, blogs }) => {
  
  // change the blog likes by blogservice update
  const updateLikes = async (id) => {
    const targetBlog = blogs.find(blog => blog.id === id)
    updateBlog({
      ...targetBlog,
      likes: targetBlog.likes+1 
    }, id)
  }

  const sortedBlogs = blogs.sort((a,b) => (
    b.likes - a.likes
  ))

  return(
    <div>
      {sortedBlogs.map((blog, i) =>
        <div key={i} className='blogBlock'>
          <Togglable succintInfo={blog.title} forwardButton={'view'} backButton={'hide'}>
            <Blog blog={blog} handleOnClick={()=> updateLikes(blog.id)} />
          </Togglable>
        </div>
      )}
    </div>

  )
}

export default BlogList