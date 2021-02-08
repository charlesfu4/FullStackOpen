import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ user, handleOnClick}) => {
  const style = {
    color: "orange",
    background: "lightgrey",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }
  const padding = {
    paddingRight: "12px"
  }

  return(
    <div style={style}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      <b>{user.name}</b> logged in  <button onClick={handleOnClick}>logout</button>
    </div>
  )
}
export default Navbar

