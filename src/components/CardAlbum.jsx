import PropTypes from 'prop-types'

const CardAlbum = ({ children }) => {
  return <div className='max-w-80 overflow-hidden rounded-md'>{children}</div>
}

const Header = ({ image }) => {
  return (
    <a href='#'>
      <img
        src={image}
        alt='product image'
        className='h-[320px] w-full object-cover object-center'
      />
    </a>
  )
}

const Body = ({ title, genre, totalSong }) => {
  return (
    <div className='flex flex-col gap-1 p-2'>
      <a href='#' className='w-fit text-lg font-bold hover:underline'>
        {title}
      </a>
      <p className='text-sm text-gray-500'>{genre}</p>
      <p className='text-sm text-gray-500'>{totalSong} songs</p>
    </div>
  )
}

CardAlbum.propTypes = {
  children: PropTypes.node.isRequired
}

Header.propTypes = {
  image: PropTypes.string.isRequired
}

Body.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  totalSong: PropTypes.number.isRequired
}

CardAlbum.Header = Header
CardAlbum.Body = Body

export default CardAlbum
