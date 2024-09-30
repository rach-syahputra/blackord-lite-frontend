import PropTypes from 'prop-types'

const CardArtist = ({ image, name, bio }) => {
  return (
    <>
      <img
        src={image}
        alt='artist image'
        className='h-[240px] w-full rounded-md object-cover object-center md:h-[280px]'
      />
      <div className='flex flex-col gap-2 p-2'>
        <p className='font-bold'>{name}</p>
        <p className='line-clamp-3 text-sm'>{bio}</p>
      </div>
    </>
  )
}

CardArtist.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired
}

export default CardArtist
