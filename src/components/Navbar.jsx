import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import userService from '../api-resources/user/service'

const Navbar = () => {
  const [user, setUser] = useState({
    image: '',
    username: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true)
      const response = await userService.getCurrentUser()

      if (response.success) {
        setUser((prev) => ({
          ...prev,
          image: response.data.image,
          username: response.data.username
        }))
      }

      setLoading(false)
    }

    getCurrentUser()
  }, [])

  return (
    <nav className='flex h-[70px] items-center justify-between'>
      <p className='text-2xl font-bold tracking-wide'>BLACKORD</p>

      {loading ? (
        <ProfileSkeleton />
      ) : user.username ? (
        <Profile user={user} />
      ) : (
        <Link to='/auth/login'>
          <Button>Log in</Button>
        </Link>
      )}
    </nav>
  )
}

const Profile = ({ user }) => {
  const [openDropDown, setOpenDropDown] = useState(false)

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

  return (
    <div className='relative'>
      <button
        className='flex items-center justify-center gap-2'
        onClick={handleDropDown}
      >
        <img src={user.image} alt='' className='h-8 w-8 rounded-full' />
        <p>{user.username}</p>
      </button>
      {openDropDown && <DropDown />}
    </div>
  )
}

const ProfileSkeleton = () => {
  return (
    <div className='relative'>
      <div className='flex items-center justify-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-gray-400'></div>
        <p>username</p>
      </div>
    </div>
  )
}

const DropDown = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    const response = await userService.logout()
    if (response.success) navigate('/auth/login')
  }

  return (
    <ul className='absolute right-0 mt-2 flex w-40 flex-col items-center justify-center shadow-sm'>
      <li className='w-full p-2 text-center transition-all duration-150 hover:bg-gray-50'>
        View Profile
      </li>
      <span className='w-full border border-gray-100'></span>
      <li className='w-full p-2 text-center text-red-500 transition-all duration-150 hover:bg-gray-50'>
        <button onClick={handleLogout}>Log out</button>
      </li>
    </ul>
  )
}

export default Navbar
