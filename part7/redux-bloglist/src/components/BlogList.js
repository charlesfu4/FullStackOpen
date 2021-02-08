import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  // change the blog likes by pressing the like button
  const sortedBlogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))

  return(
    <div className='listedBlogs' data-cy='blog-list'>
      {sortedBlogs.map((blog, i) =>
        <div key={i} className='blogBlock'>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} 
          </Link>
        </div>
      )}
    </div>

  )
}


export default BlogList