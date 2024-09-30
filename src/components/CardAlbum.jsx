import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CardAlbum = ({ children }) => {
  return <div className='max-w-80 overflow-hidden rounded-md'>{children}</div>
}

const Header = ({ children, image, onClick, removeButton }) => {
  return (
    <>
      <a href='#' className='group relative'>
        <img
          src={image}
          alt='product image'
          className='h-[320px] w-full object-cover object-center'
        />
        {removeButton && (
          <>
            <div className='absolute right-0 top-0 h-full w-full bg-black bg-opacity-0 transition-all duration-300 ease-in-out group-hover:bg-opacity-5'></div>
            <button
              className='absolute right-2 top-4 hidden px-2 text-gray-700 group-hover:block'
              onClick={onClick}
            >
              <FontAwesomeIcon icon={faTrash} size='lg' />
            </button>
          </>
        )}
      </a>
      {children}
    </>
  )
}

const Body = ({ id, title, genre, totalSong }) => {
  return (
    <div className='flex flex-col gap-1 p-2'>
      <Link
        to={`/album/${id}`}
        href='#'
        className='w-fit text-lg font-bold hover:underline'
      >
        {title}
      </Link>
      <p className='text-sm text-gray-500'>{genre}</p>
      <p className='text-sm text-gray-500'>{totalSong} songs</p>
    </div>
  )
}

CardAlbum.propTypes = {
  children: PropTypes.node.isRequired
}

Header.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  removeButton: PropTypes.bool
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  totalSong: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}

CardAlbum.Header = Header
CardAlbum.Body = Body

export default CardAlbum
