import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { formatDuration } from '../utils/format-duration'

const Song = ({ no, title, duration, onClick, isPlaying = false }) => {
  return (
    <>
      <h5 className='text-sm font-bold'>{no}</h5>
      <div className='grid w-full grid-cols-3 items-center gap-4'>
        <p className='line-clamp-1'>{title}</p>
        <p className='text-right'>{formatDuration(duration)}</p>
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className='cursor-pointer justify-self-end'
          onClick={onClick}
        />
      </div>
    </>
  )
}

Song.propTypes = {
  no: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  isPlaying: PropTypes.bool.isRequired
}

export default Song
