import React from 'react'

export default function NavBar({ children }) {
  return (
    <ul
      style={{
        listStyleType: 'none',
        margin: '5px', // TODO: Use rhythm
        padding: 0,
      }}
    >
      {children}
    </ul>
  )
}
