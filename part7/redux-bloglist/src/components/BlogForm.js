import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog} data-cy='blog-form'>
      <h3>create new</h3>
      <div>
        title:
        <input
          type='text'
          id='title'
          value={title}
          data-cy='title-input'
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          id='author'
          value={author}
          data-cy='author-input'
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          id='url'
          value={url}
          data-cy='url-input'
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit' data-cy='create-blog-button'>create</button>
    </form>
  )
}

export default BlogForm