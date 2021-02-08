import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const style = {
  paddingRight: 5
}
const Users = () => {
  const users = useSelector(state => state.users)
  const blogTab = () => (users.map(user => (
    <tr key={user.id}>
      <td style={style}>
        <Link to={`/users/${user.id}`}>
          {user.username}
        </Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )))
  

  return(
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {blogTab()}
        </tbody>
      </table>
    </div>
  )
}

export default Users