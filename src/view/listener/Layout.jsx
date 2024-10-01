import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jwtService from '../../utils/token/jwt'
import ListenerNavbar from '../../components/ListenerNavbar'
import { removeCurrentUser } from '../../redux/slicers/current-user-slicer'

const ListenerLayout = () => {
  const currentUser = useSelector((state) => state.currentUser.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const token = jwtService.getToken()

    const removeUser = async () => {
      const response = await dispatch(removeCurrentUser()).unwrap()

      if (response?.success) navigate('/auth/login')
    }

    if (!currentUser || currentUser.artistName || !token) {
      removeUser()
    }
  }, [])

  return (
    <>
      <ListenerNavbar />
      <Outlet />
    </>
  )
}

export default ListenerLayout
