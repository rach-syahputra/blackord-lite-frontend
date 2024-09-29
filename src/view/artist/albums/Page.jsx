import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import albumService from '../../../api-resources/album/service'
import songService from '../../../api-resources/song/service'
import Button from '../../../components/Button'
import CardAlbum from '../../../components/CardAlbum'

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([])
  const currentUser = useSelector((state) => state.currentUser.data)

  useEffect(() => {
    const getAlbumsAndSongs = async () => {
      const response = await albumService.getAllFromArtist(currentUser.username)

      if (response.success) {
        const albums = response.data

        const albumsWithSongs = await Promise.all(
          await albums.map(async (album) => {
            const response = await songService.get(album.id)

            const songs = response.data

            return {
              ...album,
              songs
            }
          })
        )

        setAlbums(albumsWithSongs)
      }
    }

    getAlbumsAndSongs()
  }, [])

  return (
    <div className='pb-8 pt-4'>
      <Link to='/artist/albums/add'>
        <Button>Add new album</Button>
      </Link>

      <section className='mt-8'>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3'>
          {albums ? (
            albums.map((album) => (
              <li key={album.id}>
                <CardAlbum>
                  <CardAlbum.Header image={album.image} />
                  <CardAlbum.Body
                    title={album.title}
                    genre={album.genre}
                    totalSong={album.songs.length}
                  />
                </CardAlbum>
              </li>
            ))
          ) : (
            <p>no albums</p>
          )}
        </ul>
      </section>
    </div>
  )
}

export default AlbumsPage
