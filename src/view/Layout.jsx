import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/ListenerNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from '../redux/slicers/current-user-slicer'

const Layout = () => {
  const currentUser = useSelector((state) => state.currentUser.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) dispatch(fetchCurrentUser())
  }, [])

  useEffect(() => {
    // navigate user based on role (artist or listener)
    if (currentUser) {
      if (currentUser?.artistName) {
        navigate('/artist')
      } else {
        navigate('/')
      }
    }
  }, [currentUser])

  return (
    <main className='mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl'>
      <Outlet />
    </main>
  )
}

export default Layout
