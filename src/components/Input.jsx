import PropTypes from 'prop-types'

const Input = ({ type, name }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={name}
      className='rounded-md border-2 border-black px-2 py-1'
    />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Input
