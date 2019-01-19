import React from 'react'
import NavBar from '../furniture/NavBar'
import NavItem from '../furniture/NavItem'

function TopNav() {
  return (
    <NavBar>
      <NavItem to="#">Home</NavItem>
      &nbsp;|&nbsp;
      <NavItem to="/posts">Posts</NavItem>
    </NavBar>
  )
}

export default TopNav
