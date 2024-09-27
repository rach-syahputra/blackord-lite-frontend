import PropTypes from 'prop-types'

const CardDashboard = ({ name, total }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-4 overflow-hidden rounded-md border-2 border-black p-4'>
      <h1 className='text-xl font-bold'>Total {name}</h1>
      <p className='font-medium'>{total}</p>
    </div>
  )
}

CardDashboard.propTypes = {
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
}

export default CardDashboard
