import PropTypes from 'prop-types'

const Input = ({ type, name, placeholder, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className='box-border w-full rounded-md border border-gray-500 p-2 focus:outline-gray-600'
    />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default Input
