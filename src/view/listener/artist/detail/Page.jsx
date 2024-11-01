import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import artistService from '../../../../api-resources/artist/service'
import listenerService from '../../../../api-resources/listener/service'
import DetailLoading from '../../../../components/DetailLoading'
import Button from '../../../../components/Button'

const ArtistDetailPage = () => {
  const params = useParams()
  const { username } = params
  const [artist, setArtist] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowed, setIsFollowed] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const getArtist = async () => {
      const response = await artistService.get(username)

      if (response.success) {
        setArtist(response.data)
        setIsLoading(false)
      }
    }

    getArtist()
    getSingleFavoriteArtist()
  }, [])

  useEffect(() => {
    getSingleFavoriteArtist()
  }, [isFollowed])

  const getSingleFavoriteArtist = async () => {
    const response = await listenerService.getSingleFavoriteArtist(
      currentUser.username,
      username
    )

    if (response?.success) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
  }

  const handleFollow = async () => {
    if (isFollowed) {
      const response = await artistService.unfollow(username)

      if (response?.success) await getSingleFavoriteArtist()

      if (response?.statusCode === 401) {
        const response = await dispatch(removeCurrentUser()).unwrap()
        if (response.success) navigate('/auth/login')
      }
    } else {
      const response = await artistService.follow(username)

      if (response?.success) await getSingleFavoriteArtist()

      if (response?.statusCode === 401) {
        const response = await dispatch(removeCurrentUser()).unwrap()
        if (response.success) navigate('/auth/login')
      }
    }
  }

  return (
    <div className='flex flex-col gap-8 pb-8 pt-4 md:flex-row'>
      {isLoading ? (
        <DetailLoading />
      ) : (
        <>
          <img
            src={artist?.image}
            alt='artist image'
            className='h-full w-full rounded-md md:max-h-[450px] md:max-w-[450px]'
          />
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>{artist?.artistName}</h1>
            <p>{artist?.bio}</p>

            {isFollowed ? (
              <Button width='fit' onClick={handleFollow}>
                Unfollow
              </Button>
            ) : (
              <Button mode='secondary' width='fit' onClick={handleFollow}>
                Follow
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ArtistDetailPage
