import React from 'react'
import { Link } from 'gatsby'

// TODO: Can I get the body: { color } value from theme or typography

export default function NavItem({ to, children }) {
  return (
    <li
      style={{
        display: 'inline',
      }}
    >
      <Link activeStyle={{ color: 'hsla(0,0%,0%,0.8)' }} to={to}>
        {children}
      </Link>
    </li>
  )
}
