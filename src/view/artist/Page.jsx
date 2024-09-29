import CardDashboard from '../../components/CardDashboard'

const ArtistHomePage = () => {
  return (
    <div className='py-4 pb-8'>
      <section className='grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4'>
        <CardDashboard name='Album' total={2} />
        <CardDashboard name='Song' total={13} />
      </section>
    </div>
  )
}

export default ArtistHomePage
