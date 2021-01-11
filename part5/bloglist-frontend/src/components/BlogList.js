import React, { useRef } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = ({ user, updateBlog, deleteBlog, blogs }) => {
  const removeRef = useRef()

  // change the blog likes by pressing the like button
  const updateLikes = async (id) => {
    const targetedBlog = blogs.find(blog => blog.id === id)
    console.log(targetedBlog)

    updateBlog({
      ...targetedBlog,
      likes: targetedBlog.likes+1
    }, id)
  }

  // delete the blog by pressing the delete button
  const removeBlog = async (id) => {
    const targetedBlog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove blog ${targetedBlog.title}. by ${targetedBlog.author}`)) {
      removeRef.current.toggleVisibility()
      deleteBlog(id)
    }
  }

  // determine if remove button will appear
  const removeButton = (targetedBlog) => {
    return user.username === targetedBlog.user.username ?
      <button onClick={() => removeBlog(targetedBlog.id)}>remove</button>:
      null
  }

  // sort blogs according to their likes, DESC
  const sortedBlogs = blogs.sort((a,b) => (
    b.likes - a.likes
  ))

  return(
    <div>
      {sortedBlogs.map((blog, i) =>
        <div key={i} className='blogBlock'>
          <Togglable succintInfo={`${blog.title} ${blog.author}`} forwardButton={'view'} backButton={'hide'} ref={removeRef}>
            <Blog
              blog={blog}
              handleUpdateOnClick={() => updateLikes(blog.id)}
            />
            {removeButton(blog)}
          </Togglable>
        </div>
      )}
    </div>

  )
}

export default BlogList