import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import albumService from '../../api-resources/album/service'
import songService from '../../api-resources/song/service'
import CardDashboard from '../../components/CardDashboard'
import artistService from '../../api-resources/artist/service'

const ArtistHomePage = () => {
  const [total, setTotal] = useState({
    albums: 0,
    songs: 0,
    followers: 0
  })
  const currentUser = useSelector((state) => state.currentUser.data)

  useEffect(() => {
    const getTotalAlbumsAndSongs = async () => {
      const response = await albumService.getAllFromArtist(currentUser.username)

      if (response.success) {
        const albums = response.data

        const songs = await Promise.all(
          await albums.map(async (album) => {
            const response = await songService.getFromAlbum(album.id)

            if (response.success) return response.data.length
          })
        )

        const totalSong = songs.reduce((acc, val) => acc + val, 0)

        setTotal((prev) => ({
          ...prev,
          albums: albums.length,
          songs: totalSong
        }))
      }
    }

    const getTotalFollowers = async () => {
      const response = await artistService.getFollowers(currentUser.username)

      if (response.success) {
        setTotal((prev) => ({
          ...prev,
          followers: response.data.length
        }))
      }
    }

    const populateArtistDashboardData = async () => {
      await Promise.all([getTotalAlbumsAndSongs(), getTotalFollowers()])
    }

    populateArtistDashboardData()
  }, [])

  return (
    <div className='py-4 pb-8'>
      <section className='grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4'>
        <CardDashboard name='Albums' total={total.albums} />
        <CardDashboard name='Songs' total={total.songs} />
        <CardDashboard name='Followers' total={total.followers} />
      </section>
    </div>
  )
}

export default ArtistHomePage
