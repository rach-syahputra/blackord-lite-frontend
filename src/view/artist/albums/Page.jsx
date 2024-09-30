import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeCurrentUser } from '../../../redux/slicers/current-user-slicer'
import albumService from '../../../api-resources/album/service'
import songService from '../../../api-resources/song/service'
import Button from '../../../components/Button'
import CardAlbum from '../../../components/CardAlbum'

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getAlbumsAndSongs = async () => {
      const response = await albumService.getAllFromArtist(currentUser.username)

      if (response.success) {
        const albums = response.data

        const albumsWithSongs = await Promise.all(
          await albums.map(async (album) => {
            const response = await songService.getFromAlbum(album.id)

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

  const handleDelete = async (albumId) => {
    const response = await albumService.delete(albumId)

    if (response.success) {
      setAlbums(albums.filter((album) => album.id !== albumId))
    }

    if (response.statusCode === 401) {
      const response = await dispatch(removeCurrentUser()).unwrap()
      if (response.success) navigate('/auth/login')
    }

    setOpenDeleteModal(false)
  }

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
                  <CardAlbum.Header
                    image={album.image}
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    {openDeleteModal && (
                      <div className='absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-10'>
                        <div className='flex flex-col gap-4 rounded-md bg-white p-4 shadow-sm'>
                          <p className='font-medium'>Delete this album?</p>
                          <div className='flex gap-6'>
                            <Button
                              mode='secondary'
                              onClick={() => setOpenDeleteModal(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              mode='danger'
                              onClick={() => handleDelete(album.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardAlbum.Header>
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
