import React from 'react'
import { Link } from 'gatsby'

export default function NavItem({ to, children }) {
  return (
    <li
      style={{
        display: 'inline',
      }}
    >
      <Link to={to}>{children}</Link>
    </li>
  )
}
