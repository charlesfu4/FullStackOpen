import React from 'react'
import { addNotification } from '../reducers/notificationReducer'
import { delBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const loginUser = useSelector(state => state.loginUser)
  const dispatch = useDispatch()

  // update like of the blog
  const updateLikes = async (id) => {
    dispatch(updateBlog({
      ...blog,
      likes: blog.likes+1
    }, id))
  }

  // delete the blog by pressing the delete button
  const removeBlog = async (id) => {
    if (window.confirm(`Remove blog ${blog.title}. by ${blog.author}`)) {
      dispatch(delBlog(id)).then(exception => {
        exception ?
        dispatch(addNotification(exception, true, 5))
        :
        dispatch(addNotification(`a blog ${blog.title}. by ${blog.author} deleted`, false, 5))
      })
    }
  }

  // determine if remove button will appear
  const removeButton = (targetedBlog) => {
    return loginUser.username === targetedBlog.user.username ?
      <button onClick={() => removeBlog(targetedBlog.id)} data-cy='remove-button'>remove</button>:
      null
  }

  return(
    <div className='singleBlog'>
        <div>
          <h3>{blog.title}</h3>
          <a href={`//${blog.url}`}>{blog.url}</a>
          <div data-cy='blog-likes'>
            {blog.likes} likes
            <button onClick={() => updateLikes(blog.id)} data-cy='like-button'>like</button>
          </div>
          {removeButton(blog)}
          <div>{`added by ${blog.user.username}`}</div>
        </div>
    </div>
  )
}

export default Blog