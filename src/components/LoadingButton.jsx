import PropTypes from 'prop-types'
import LoadingSpinner from '../assets/loading-spinner.svg'

const LoadingButton = ({ children }) => {
  return (
    <button
      className='flex items-center justify-center gap-2 rounded-lg bg-black bg-opacity-75 px-4 py-3 text-sm text-white md:text-base'
      type='button'
    >
      <img src={LoadingSpinner} alt='loading spinner' className='h-5 w-5' />
      {children}
    </button>
  )
}

LoadingButton.propTypes = {
  children: PropTypes.node.isRequired,
  mode: PropTypes.string
}

export default LoadingButton
