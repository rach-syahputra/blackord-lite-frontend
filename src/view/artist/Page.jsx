import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import albumService from '../../api-resources/album/service'
import songService from '../../api-resources/song/service'
import CardDashboard from '../../components/CardDashboard'

const ArtistHomePage = () => {
  const [totalAlbum, setTotalAlbum] = useState(0)
  const [totalSong, setTotalSong] = useState(0)
  const currentUser = useSelector((state) => state.currentUser.data)

  useEffect(() => {
    const getTotalAlbumAndSong = async () => {
      const response = await albumService.getAllFromArtist(currentUser.username)

      if (response.success) {
        const albums = response.data

        setTotalAlbum(albums.length)

        const songs = await Promise.all(
          await albums.map(async (album) => {
            const response = await songService.getFromAlbum(album.id)

            if (response.success) return response.data.length
          })
        )

        const totalSong = songs.reduce((acc, val) => acc + val, 0)

        setTotalSong(totalSong)
      }
    }

    getTotalAlbumAndSong()
  }, [])

  return (
    <div className='py-4 pb-8'>
      <section className='grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4'>
        <CardDashboard name='Album' total={totalAlbum} />
        <CardDashboard name='Song' total={totalSong} />
      </section>
    </div>
  )
}

export default ArtistHomePage
