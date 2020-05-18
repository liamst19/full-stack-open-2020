import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import LoggedIn from './LoggedIn'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to='/' >blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to='/users' >users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <LoggedIn  />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
