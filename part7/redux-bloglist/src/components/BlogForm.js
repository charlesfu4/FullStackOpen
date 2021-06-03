import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title : event.target.title.value,
      author : event.target.author.value,
      url : event.target.url.value,
      comments: []
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(createBlog(blogObj)).then(exception => 
      exception ? 
      dispatch(addNotification(exception, true, 5))
      :
      dispatch(addNotification(`a new blog ${blogObj.title}. by ${blogObj.author} added`, false, 5))
    )
  }

  return(
    <div>
      <h3>create new</h3>
      <Form onSubmit={addBlog} data-cy='blog-form'>
        <Form.Group>
          <Form.Label>title:</Form.Label>
            <Form.Control
              type='text'
              name='title'
              data-cy='title-input'
            />
          <Form.Label>author:</Form.Label>
            <Form.Control
              type='text'
              name='author'
              data-cy='author-input'
            />
          <Form.Label>url:</Form.Label>
            <Form.Control
              type='text'
              name='url'
              data-cy='url-input'
            />
          <Button variant="primary" type='submit' data-cy='create-blog-button'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm