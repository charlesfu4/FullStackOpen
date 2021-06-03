import React from 'react'
import { addNotification } from '../reducers/notificationReducer'
import { delBlog } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { Table, Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const loginUser = useSelector(state => state.loginUser)
  const dispatch = useDispatch()
  const id = blog.id

  // update like of the blog
  const updateLikes = async (id) => {
    dispatch(updateBlog({
      ...blog,
      likes: blog.likes+1
    }, id))
  }

  // add comments to the blog 
  const addComment = (event) => {
    event.preventDefault()
    dispatch(updateBlog({
      ...blog,
      comments: [...blog.comments, event.target.comment.value]
    }, id))
    event.target.comment.value = ''
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
    console.log(targetedBlog)
    return loginUser.username === targetedBlog.user.username ?
      <Button variant="danger" onClick={() => removeBlog(targetedBlog.id)} data-cy='remove-button'>remove</Button>:
      null
  }

  const paddingTop = {
    paddingTop: "1em"
  }

  return(
    <div className='singleBlog' data-cy='single-blog'>
        <div>
          <h3>{blog.title}</h3>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Url</td>
                <td>
                  <a href={`//${blog.url}`}>{blog.url}</a>
                </td>
              </tr> 
              <tr>
                <td>
                  Added by 
                </td>
                <td>
                  {`${blog.user.username}`}
                </td>
              </tr> 
            </tbody>
          </Table>
          <div data-cy='blog-likes'>
            {blog.likes} likes <Button onClick={() => updateLikes(id)} variant="success" data-cy='like-button'>like</Button>
          </div>
          <div style={paddingTop}>
            {removeButton(blog)}
          </div>
          <h4 style={paddingTop}>Comments</h4>
          <Form onSubmit={addComment}>
            <Form.Group>
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type='text'
                name='comment'
              />
              <Button variant="primary" type='submit'>Comment</Button>
            </Form.Group>
          </Form>
          <Table striped bordered hover size="sm">
            <tbody>
              {
                blog.comments ? 
                blog.comments.map((comment, i) => (
                  <tr key={i}>
                    <td>{comment}</td>
                  </tr>
                ))
                :
                null
              }
            </tbody>
          </Table>
        </div>
    </div>
  )
}

export default Blog