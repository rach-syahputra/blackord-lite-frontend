import PropTypes from 'prop-types'

const TextArea = ({ name, placeholder, onChange }) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className='rounded-md border border-black p-2'
      onChange={onChange}
    />
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextArea
