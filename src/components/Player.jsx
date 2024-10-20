import {
  faBackwardStep,
  faForwardStep,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import songService from '../api-resources/song/service'
import { setIsPlaying } from '../redux/slicers/player-slicer'
import albumService from '../api-resources/album/service'

const Player = () => {
  const audioRef = useRef(null)
  const [song, setSong] = useState(null)
  const [songUrl, setSongUrl] = useState('')
  const { activeId, isPlaying } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  useEffect(() => {
    const getSongDetail = async () => {
      const song = await songService.get(activeId)
      const album = await albumService.get(song.data.albumId)
      const url = songService.getSongUrl(song.data.songPath)

      setSong((prev) => ({
        ...prev,
        ...song.data,
        image: album.data.image,
        albumTitle: album.data.title
      }))
      setSongUrl(url.data)
    }

    getSongDetail()
  }, [activeId])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, songUrl])

  const handlePlay = () => {
    if (isPlaying) {
      dispatch(setIsPlaying(false))
    } else {
      dispatch(setIsPlaying(true))
    }
  }

  if (!songUrl || !activeId) {
    return null
  }

  return (
    <div className='fixed bottom-0 left-0 grid h-[80px] w-full grid-cols-3 items-center border-t-[1px] border-neutral-200 bg-white'>
      <div className='flex flex-col gap-1 p-4'>
        <p className='line-clamp-1 text-sm lg:text-base'>{song?.title}</p>
        <p className='line-clamp-1 text-xs text-gray-500 lg:text-sm'>
          {song?.albumTitle}
        </p>
      </div>
      <div className='flex h-full items-center justify-center gap-x-6'>
        <FontAwesomeIcon
          icon={faBackwardStep}
          className='cursor-pointer text-xl'
        />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          className='w-[20px] cursor-pointer text-2xl'
          onClick={handlePlay}
        />
        <FontAwesomeIcon
          icon={faForwardStep}
          className='cursor-pointer text-xl'
        />
        <audio ref={audioRef} src={songUrl}></audio>
      </div>
    </div>
  )
}

export default Player
