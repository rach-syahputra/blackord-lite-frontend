import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import artistService from '../../../../api-resources/artist/service'

const ArtistDetailPage = () => {
  const params = useParams()
  const { username } = params
  const [artist, setArtist] = useState(null)

  useEffect(() => {
    const getArtist = async () => {
      const response = await artistService.get(username)

      if (response.success) setArtist(response.data)
    }

    getArtist()
  }, [])

  return (
    <div className='flex flex-col gap-8 pb-8 pt-4 md:flex-row'>
      <img
        src={artist?.image}
        alt='artist image'
        className='h-full w-full rounded-md md:max-h-[450px] md:max-w-[450px]'
      />
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-bold'>{artist?.artistName}</h1>
        <p>{artist?.bio}</p>
      </div>
    </div>
  )
}

export default ArtistDetailPage