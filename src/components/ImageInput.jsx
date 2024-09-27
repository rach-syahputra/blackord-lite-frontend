import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ImageInput = forwardRef(({ name, onChange, onClick }, ref) => {
  return (
    <div
      className='flex h-[300px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted'
      onClick={onClick}
    >
      <div className='flex flex-col gap-2'>
        <FontAwesomeIcon icon={faPlus} size='2x' className='text-gray-500' />
        <p className='text-gray-500'>Upload your image</p>
      </div>
      <input
        type='file'
        name={name}
        ref={ref}
        onChange={onChange}
        className='hidden'
      />
    </div>
  )
})

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ImageInput
