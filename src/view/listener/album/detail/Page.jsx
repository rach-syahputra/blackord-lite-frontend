import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  setActiveId,
  setIds,
  setIsPlaying
} from '../../../../redux/slicers/player-slicer'
import albumService from '../../../../api-resources/album/service'
import songService from '../../../../api-resources/song/service'
import DetailLoading from '../../../../components/DetailLoading'
import Song from '../../../../components/Song'

const AlbumDetailPage = () => {
  const params = useParams()
  const { id } = params
  const [album, setAlbum] = useState(null)
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const player = useSelector((state) => state.player)
  const dispatch = useDispatch()

  useEffect(() => {
    const getAlbum = async () => {
      const response = await albumService.get(id)

      if (response.success) {
        setAlbum(response.data)
        return response.data
      }
    }

    const getSongs = async () => {
      const response = await songService.getFromAlbum(id)

      if (response.success) {
        setSongs(response.data)
        return response.data
      }
    }

    const getAlbumAndSongs = async () => {
      await Promise.all([await getAlbum(), await getSongs()])
      setIsLoading(false)
    }

    getAlbumAndSongs()
  }, [])

  const onPlay = (id) => {
    if (player.activeId === id && player.isPlaying) {
      dispatch(setIsPlaying(false))
    } else {
      dispatch(setActiveId(id))
      dispatch(setIds(songs.map((song) => song.id)))
      dispatch(setIsPlaying(true))
    }
  }

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
          <div className='flex w-full flex-col gap-8'>
            <section className='flex w-full flex-col gap-4'>
              <h1 className='text-xl font-bold'>{album?.title}</h1>
              <p>by {album?.artistUsername}</p>
              <p>{album?.genre}</p>
            </section>
            <section className='flex flex-col gap-4'>
              <h3 className='font-bold'>Songs</h3>
              <ul className='flex flex-col gap-2'>
                {songs?.map((song, index) => (
                  <li className='flex items-center gap-4' key={song.id}>
                    <Song
                      no={index + 1}
                      title={song.title}
                      duration={song.duration}
                      onClick={() => onPlay(song.id)}
                      isPlaying={
                        song.id === player.activeId && player.isPlaying
                      }
                    />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default AlbumDetailPage
