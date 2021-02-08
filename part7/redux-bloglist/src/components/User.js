import React from 'react'

const User = ({ user }) => {
  const blogs = user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))
  console.log(user)

  return(
    <div>
      <h3>{user.name}</h3>
      <h4>Added blogs</h4>
      <ul>
        {blogs}
      </ul>
    </div>
  )
}

export default User