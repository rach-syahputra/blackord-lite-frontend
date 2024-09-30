import { useState } from 'react'
import CardArtist from '../../components/CardArtist'
import { useEffect } from 'react'
import artistService from '../../api-resources/artist/service'
import albumService from '../../api-resources/album/service'
import CardAlbum from '../../components/CardAlbum'
import songService from '../../api-resources/song/service'

const ListenerHomePage = () => {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])
  const [totalSong, setTotalSong] = useState(0)

  useEffect(() => {
    const getArtistsAndAlbums = async () => {
      // GET ALL ARTISTS
      const response = await artistService.getAll()

      if (response.success) {
        const artists = response.data

        // GET ALBUMS FROM ARTIST
        const albumsFromArtist = await Promise.all(
          artists.map(async (artist) => {
            const response = await albumService.getAllFromArtist(
              artist.username
            )

            if (response.success) return response.data
          })
        )

        const albums = albumsFromArtist.reduce(
          (acc, albums) => acc.concat(albums),
          []
        )

        // GET TOTAL SONG OF AN ALBUM
        const AlbumsWithTotalSong = await Promise.all(
          await albums.map(async (album) => {
            const response = await songService.getFromAlbum(album.id)

            if (response.success) {
              const songs = response.data

              return {
                ...album,
                totalSong: songs.length
              }
            }
          })
        )

        setArtists(artists)
        setAlbums(AlbumsWithTotalSong)
      }
    }

    getArtistsAndAlbums()
  }, [])

  return (
    <div className='flex flex-col gap-10 pb-8 pt-4'>
      <section>
        <h1 className='mb-4 text-xl font-bold'>NEW ARTISTS</h1>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3'>
          {artists &&
            artists.map((artist) => (
              <li key={artist.username}>
                <CardArtist
                  name={artist.artistName}
                  bio={artist.bio}
                  image={artist.image}
                />
              </li>
            ))}
        </ul>
      </section>

      <section>
        <h1 className='mb-4 text-xl font-bold'>NEW ALBUMS</h1>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3'>
          {albums &&
            albums.map((album) => (
              <li key={album.id}>
                <CardAlbum>
                  <CardAlbum.Header image={album.image} />
                  <CardAlbum.Body
                    title={album.title}
                    genre={album.genre}
                    totalSong={album.totalSong}
                  />
                </CardAlbum>
              </li>
            ))}
        </ul>
      </section>
    </div>
  )
}

export default ListenerHomePage
