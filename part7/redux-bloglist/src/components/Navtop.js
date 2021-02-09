import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navtop = ({ user, handleOnClick}) => {
  const style = {
    color: "orange",
    background: "dark",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "5px",
    marginBottom: "10px",
  }
  const padding = {
    paddingRight: "12px",
    color: "pink",
  }

  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
          </Nav>
          <div style={style}>
            <b>{user.name}</b> logged in  <Button variant="warning" onClick={handleOnClick}>logout</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
export default Navtop 

