import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  // change the blog likes by pressing the like button
  const sortedBlogs = useSelector(state => state.blogs.sort((a,b) => b.likes - a.likes))

  return(
    <div className='listedBlogs' data-cy='blog-list'>
      <Table striped> 
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id} className='blogBlock'>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} 
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>

  )
}


export default BlogList