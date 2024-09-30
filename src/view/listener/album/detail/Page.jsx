import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import albumService from '../../../../api-resources/album/service'
import DetailLoading from '../../../../components/DetailLoading'

const AlbumDetailPage = () => {
  const params = useParams()
  const { id } = params
  const [album, setAlbum] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAlbum = async () => {
      const response = await albumService.get(id)

      if (response.success) {
        setAlbum(response.data)
        setIsLoading(false)
      }
    }

    getAlbum()
  }, [])

  return (
    <div className='flex flex-col gap-8 pb-8 pt-4 md:flex-row'>
      {isLoading ? (
        <DetailLoading />
      ) : (
        <>
          <img
            src={album?.image}
            alt='album image'
            className='h-full w-full rounded-md md:max-h-[450px] md:max-w-[450px]'
          />
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>{album?.title}</h1>
            <p>by {album?.artistUsername}</p>
            <p>{album?.genre}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default AlbumDetailPage
