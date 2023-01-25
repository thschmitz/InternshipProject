import React from 'react'

export const Header = (userState) => {
  return (
    <div>
      <p>{userState.name}</p>
    </div>
  )
}