import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

const ImageInput = forwardRef(({ name, onChange }, ref) => {
  return (
    <input
      type='file'
      name={name}
      id={name}
      ref={ref}
      onChange={onChange}
      className='hidden'
    />
  )
})

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default ImageInput
