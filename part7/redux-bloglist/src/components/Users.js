import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

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
      <Table striped hover>
        <tbody>
          <tr>
            <th>Users</th>
            <th>number of blogs created</th>
          </tr>
          {blogTab()}
        </tbody>
      </Table>
    </div>
  )
}

export default Users