import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { removeCurrentUser } from '../redux/slicers/current-user-slicer'
import Button from './Button'

const ListenerNavbar = () => {
  const isLoading = useSelector((state) => state.currentUser.isLoading)
  const currentUser = useSelector((state) => state.currentUser.data)

  return (
    <nav className='flex h-[70px] items-center justify-between'>
      <div className='flex items-center justify-center gap-8'>
        <Link to='/' className='text-2xl font-bold tracking-wide'>
          BLACKORD
        </Link>
        <Menu />
      </div>

      {isLoading ? (
        <ProfileSkeleton />
      ) : currentUser?.username ? (
        <>
          <Profile user={currentUser} />
          <Hamburger user={currentUser} />
        </>
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
    <ul className='hidden items-center gap-4 md:flex'>
      <li>
        <Link to='/'>Home</Link>
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
    <div className='relative hidden md:block'>
      <button
        className='flex items-center justify-center gap-2'
        onClick={handleDropDown}
      >
        <img src={user.image} alt='' className='h-8 w-8 rounded-full' />
        <p>{user.username}</p>
      </button>
      {openDropDown && (
        <DropDown username={user.username} handleDropDown={handleDropDown} />
      )}
    </div>
  )
}

const ProfileSkeleton = () => {
  return (
    <div className='relative hidden md:block'>
      <div className='flex items-center justify-center gap-2'>
        <div className='h-8 w-8 rounded-full bg-gray-400'></div>
        <p>username</p>
      </div>
    </div>
  )
}
const DropDown = ({ username, handleDropDown }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleViewProfile = () => {
    handleDropDown()
    navigate(`/profile/${username}`)
  }

  const handleLogout = async () => {
    const response = await dispatch(removeCurrentUser()).unwrap()

    if (response?.success) navigate('/auth/login')
  }

  return (
    <ul className='absolute right-0 mt-2 flex w-40 flex-col items-center justify-center bg-white shadow-sm'>
      <li className='w-full p-2 text-center transition-all duration-150 hover:bg-gray-50'>
        <button onClick={handleViewProfile}>View Profile</button>
      </li>
      <span className='w-full border border-gray-100'></span>
      <li className='w-full p-2 text-center text-red-500 transition-all duration-150 hover:bg-gray-50'>
        <button onClick={handleLogout}>Log out</button>
      </li>
    </ul>
  )
}

const Hamburger = ({ user }) => {
  const [openHamburgerMenu, setHamburgerMenu] = useState(false)

  const handleHamburgerMenu = () => {
    setHamburgerMenu(!openHamburgerMenu)
  }

  return (
    <div className='relative md:hidden'>
      <FontAwesomeIcon icon={faBars} size='xl' onClick={handleHamburgerMenu} />
      {openHamburgerMenu && (
        <HamburgerMenu user={user} handleHamburgerMenu={handleHamburgerMenu} />
      )}
    </div>
  )
}

const HamburgerMenu = ({ user, handleHamburgerMenu }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleViewProfile = () => {
    handleHamburgerMenu()
    navigate(`/profile/${user.username}`)
  }

  const handleLogout = async () => {
    const response = await dispatch(removeCurrentUser()).unwrap()

    if (response?.success) navigate('/auth/login')
  }

  return (
    <ul className='absolute right-0 mt-2 flex w-40 flex-col items-center justify-center rounded-md border bg-white'>
      <li className='w-full border-b p-2 text-center transition-all duration-150 hover:bg-gray-50'>
        <div
          className='flex flex-col items-center justify-center gap-y-2'
          onClick={handleViewProfile}
        >
          <img
            src={user.image}
            alt='profile image'
            className='h-8 w-8 rounded-full'
          />
          <p className='text-xs'>{user.username}</p>
        </div>
      </li>
      <span className='w-full border border-gray-100'></span>
      <li className='w-full p-2 text-center text-red-500 transition-all duration-150 hover:bg-gray-50'>
        <button onClick={handleLogout}>Log out</button>
      </li>
    </ul>
  )
}

export default ListenerNavbar
