import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = ({ user, updateBlog, deleteBlog }) => {
  // change the blog likes by pressing the like button
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))

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
      deleteBlog(id)
    }
  }

  // determine if remove button will appear
  const removeButton = (targetedBlog) => {
    return user.username === targetedBlog.user.username ?
      <button onClick={() => removeBlog(targetedBlog.id)} data-cy='remove-button'>remove</button>:
      null
  }



  return(
    <div className='listedBlogs' data-cy='blog-list'>
      {sortedBlogs.map((blog, i) =>
        <div key={i} className='blogBlock'>
          <Blog
            blog={blog}
            handleUpdateOnClick={() => updateLikes(blog.id)}
          />
          <div>{blog.user.username}</div>
          {removeButton(blog)}
        </div>
      )}
    </div>

  )
}


export default BlogList