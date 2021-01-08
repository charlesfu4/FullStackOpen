import React from 'react'

const Create = ({addBlog, setTitle, setAuthor, setUrl,
  title, author, url}) => (
  <form onSubmit={addBlog}>
    <h3>create new</h3>
    <div>
      title: 
      <input
       type='text'
       value={title}
       name='Title'
       onChange={({target}) => setTitle(target.value)}
      />
    </div>
    <div>
      author: 
      <input
       type='text'
       value={author}
       name='Author'
       onChange={({target}) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:  
      <input
       type='text'
       value={url}
       name='Url'
       onChange={({target}) => setUrl(target.value)}
      />
    </div>
    <button type='submit'>create</button>
  </form>
)

export default Create