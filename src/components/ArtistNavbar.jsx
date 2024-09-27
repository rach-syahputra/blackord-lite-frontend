import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeCurrentUser } from '../redux/slicers/current-user-slicer'
import Button from './Button'

const ArtistNavbar = () => {
  const isLoading = useSelector((state) => state.currentUser.isLoading)
  const currentUser = useSelector((state) => state.currentUser.data)

  return (
    <nav className='flex h-[70px] items-center justify-between'>
      <div className='flex items-center justify-center gap-8'>
        <p className='text-2xl font-bold tracking-wide'>BLACKORD</p>
        <Menu />
      </div>

      {isLoading ? (
        <ProfileSkeleton />
      ) : currentUser?.username ? (
        <Profile user={currentUser} />
      ) : (
        <Link to='/auth/login'>
          <Button>Log in</Button>
        </Link>
      )}
    </nav>
  )
}

const Menu = () => {
  return (
    <ul className='flex items-center gap-4'>
      <li>
        <Link to='/artist'>Dashboard</Link>
      </li>
      <li>
        <Link to='/artist/albums'>Albums</Link>
      </li>
    </ul>
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
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(removeCurrentUser())
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

export default ArtistNavbar
