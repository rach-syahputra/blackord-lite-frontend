import PropTypes from 'prop-types'

const CardDashboard = ({ name, total }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md border-2 border-black p-4'>
      <h1 className=''>Total {name}</h1>
      <p className='text-xl font-bold'>{total}</p>
    </div>
  )
}

CardDashboard.propTypes = {
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
}

export default CardDashboard
