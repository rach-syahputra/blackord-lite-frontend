import React from 'react'
import { Outlet } from 'react-router-dom'
import ListenerNavbar from '../../components/ListenerNavbar'

const ListenerLayout = () => {
  return (
    <>
      <ListenerNavbar />
      <Outlet />
    </>
  )
}

export default ListenerLayout
