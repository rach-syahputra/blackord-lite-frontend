import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ArtistNavbar from '../../components/ArtistNavbar'

const ArtistLayout = () => {
  const currentUser = useSelector((state) => state.currentUser.data)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser || !currentUser?.artistName) navigate('/auth/login')
  }, [])

  return (
    <>
      <ArtistNavbar />
      <Outlet />
    </>
  )
}

export default ArtistLayout
