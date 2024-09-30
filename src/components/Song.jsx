import PropTypes from 'prop-types'
import { formatDuration } from '../utils/format-duration'

const Song = ({ no, title, duration }) => {
  return (
    <>
      <h5 className='text-sm font-bold'>{no}</h5>
      <div className='grid w-full grid-cols-3 gap-4'>
        <p className='col-span-2 line-clamp-1'>{title}</p>
        <p className='text-right'>{formatDuration(duration)}</p>
      </div>
    </>
  )
}

Song.propTypes = {
  no: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
}

export default Song
