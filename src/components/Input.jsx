import PropTypes from 'prop-types'

const Input = ({ type, name, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={name}
      onChange={onChange}
      className='box-border rounded-md border border-gray-500 p-2 focus:outline-gray-600'
    />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default Input
