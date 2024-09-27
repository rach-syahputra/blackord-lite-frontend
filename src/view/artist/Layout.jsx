import React from 'react'
import { Outlet } from 'react-router-dom'
import ArtistNavbar from '../../components/ArtistNavbar'

const ArtistLayout = () => {
  return (
    <>
      <ArtistNavbar />
      <Outlet />
    </>
  )
}

export default ArtistLayout
