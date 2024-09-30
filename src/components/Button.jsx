import PropTypes from 'prop-types'

const Button = ({
  children,
  type = 'button',
  mode = 'primary',
  width = 'full',
  onClick
}) => {
  let styles

  if (mode === 'primary') styles = 'text-white bg-black'
  else if (mode === 'secondary')
    styles = 'text-black bg-white border-2 border-black'
  else if (mode === 'danger') styles = 'text-white bg-red-500'

  return (
    <button
      className={`${styles} w-${width} rounded-lg px-4 py-2 text-sm md:text-base`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  mode: PropTypes.string,
  width: PropTypes.string,
  onClick: PropTypes.func
}

export default Button
