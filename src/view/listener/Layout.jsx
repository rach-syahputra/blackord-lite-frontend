import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ListenerNavbar from '../../components/ListenerNavbar'

const ListenerLayout = () => {
  const currentUser = useSelector((state) => state.currentUser.data)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser || currentUser.artistName) navigate('/auth/login')
  }, [])

  return (
    <>
      <ListenerNavbar />
      <Outlet />
    </>
  )
}

export default ListenerLayout
