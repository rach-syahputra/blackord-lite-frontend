import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../../../api-resources/user/service'
import listenerService from '../../../api-resources/listener/service'
import artistService from '../../../api-resources/artist/service'
import CardLoading from '../../../components/CardLoading'
import CardArtist from '../../../components/CardArtist'

const ListenerProfilePage = () => {
  const params = useParams()
  const { username } = params
  const [isLoading, setIsLoading] = useState(true)
  const [listener, setListener] = useState({
    username: '',
    email: '',
    image: '',
    favoriteArtists: []
  })

  useEffect(() => {
    const getUser = async () => {
      const response = await userService.get(username)

      if (response.success) {
        const user = response.data
        setListener((prev) => ({
          ...prev,
          username: user.username,
          email: user.email
        }))
      }
    }

    const getListener = async () => {
      const response = await listenerService.get(username)

      if (response.success) {
        const listener = response.data
        setListener((prev) => ({
          ...prev,
          image: listener.image
        }))
      }
    }

    const getFavoriteArtists = async () => {
      const response = await listenerService.getFavoriteArtists(username)

      if (response.success) {
        const favoriteArtistUsernames = response.data

        const favoriteArtists = await Promise.all(
          favoriteArtistUsernames.map(async (username) => {
            const response = await artistService.get(username)

            return response.data
          })
        )

        setListener((prev) => ({
          ...prev,
          favoriteArtists
        }))
      }
    }

    const populateListenerProfileData = async () => {
      await Promise.all([getUser(), getListener(), getFavoriteArtists()])

      setIsLoading(false)
    }

    populateListenerProfileData()
  }, [])

  useEffect(() => {
    console.log('LISTENER', listener)
  }, [listener])

  return (
    <div className='flex flex-col gap-16 pb-8 pt-4'>
      <section className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>Listener Profile</h1>
        <div className='flex gap-8'>
          <img
            src={listener?.image}
            alt='listener image'
            className='h-[144px] w-[144px] rounded-md'
          />
          <div className='flex flex-col gap-2'>
            <div className='grid w-full max-w-lg grid-cols-3'>
              <p className='font-medium'>username</p>
              <p className='col-span-2'>syahputra</p>
            </div>
            <div className='grid w-full max-w-lg grid-cols-3'>
              <p className='font-medium'>email</p>
              <p className='col-span-2'>rach.syahputra@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>Favorite Artists</h1>
        <ul className='grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3'>
          {isLoading ? (
            <>
              <CardLoading />
              <CardLoading />
              <CardLoading />
              <CardLoading />
              <CardLoading />
            </>
          ) : (
            listener.favoriteArtists?.map((artist) => (
              <li key={artist.username}>
                <CardArtist
                  username={artist.username}
                  name={artist.artistName}
                  bio={artist.bio}
                  image={artist.image}
                />
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  )
}

export default ListenerProfilePage
