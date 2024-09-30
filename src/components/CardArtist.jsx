import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CardArtist = ({ username, image, name, bio }) => {
  return (
    <>
      <img
        src={image}
        alt='artist image'
        className='h-[240px] w-full rounded-md object-cover object-center md:h-[280px]'
      />
      <div className='flex flex-col gap-2 p-2'>
        <Link to={`/artist/${username}`} className='font-bold hover:underline'>
          {name}
        </Link>
        <p className='line-clamp-3 text-sm'>{bio}</p>
      </div>
    </>
  )
}

CardArtist.propTypes = {
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired
}

export default CardArtist
