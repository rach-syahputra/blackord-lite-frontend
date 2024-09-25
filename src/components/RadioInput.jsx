import PropTypes from 'prop-types'

const RadioInput = ({ id, name, label, onChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='radio'
        id={id}
        name={name}
        value={id}
        className='h-4 w-4 accent-black'
        onChange={onChange}
      />
      <label htmlFor='listener'>{label}</label>
    </div>
  )
}

RadioInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default RadioInput
