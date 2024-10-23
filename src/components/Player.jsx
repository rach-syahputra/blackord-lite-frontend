import {
  faBackwardStep,
  faForwardStep,
  faPlay,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import songService from '../api-resources/song/service'
import { setIsPlaying } from '../redux/slicers/player-slicer'
import albumService from '../api-resources/album/service'
import { formatDuration } from '../utils/format-duration'

const Player = () => {
  const audioRef = useRef(null)
  const progressBarRef = useRef(null)
  const playAnimationRef = useRef(null)
  const [song, setSong] = useState(null)
  const [songUrl, setSongUrl] = useState('')
  const [timeProgress, setTimeProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const { activeId, isPlaying } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime

      setTimeProgress(currentTime)

      progressBarRef.current.value = currentTime.toString()
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      )
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef])

  const startAnimation = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress()
        playAnimationRef.current = requestAnimationFrame(animate) // it loops the animate function
      }

      playAnimationRef.current = requestAnimationFrame(animate)
    }
  }, [updateProgress, duration, audioRef, progressBarRef])

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
      startAnimation()
    } else {
      audioRef.current?.pause()

      if (playAnimationRef.current !== null) {
        cancelAnimationFrame(playAnimationRef.current)
        playAnimationRef.current = null
      }

      updateProgress()
    }
  }, [isPlaying, songUrl, startAnimation, updateProgress, audioRef])

  const handlePlay = () => {
    if (isPlaying) {
      dispatch(setIsPlaying(false))
    } else {
      dispatch(setIsPlaying(true))
    }
  }

  const handleProgress = () => {
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value)
      audioRef.current.currentTime = newTime
      setTimeProgress(newTime)
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(newTime / duration) * 100}%`
      )
    }
  }

  const onLoadedMetadata = () => {
    const seconds = audioRef.current?.duration
    if (seconds !== undefined) {
      setDuration(seconds)
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString()
      }
    }
  }

  if (!songUrl || !activeId) {
    return null
  }

  return (
    <div className='fixed bottom-2 left-0 grid h-[80px] w-full grid-cols-2 items-center border-t-[1px] border-neutral-200 bg-white md:bottom-0 md:grid-cols-3'>
      <div className='flex flex-col gap-1 p-4'>
        <p className='line-clamp-1 text-sm lg:text-base'>{song?.title}</p>
        <p className='line-clamp-1 text-xs text-gray-500 lg:text-sm'>
          {song?.albumTitle}
        </p>
      </div>
      <div className='flex h-full flex-col items-center justify-center gap-y-2'>
        <div className='flex items-center justify-center gap-x-8 md:gap-x-6'>
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
        </div>
        <div className='hidden items-center gap-x-4 md:flex'>
          <span>{formatDuration(timeProgress)}</span>
          <input type='range' ref={progressBarRef} onChange={handleProgress} />
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
      <div className='col-span-2 flex w-full items-center gap-x-4 px-4 md:hidden'>
        <input
          type='range'
          ref={progressBarRef}
          onChange={handleProgress}
          className='w-full'
        />
      </div>
      <audio
        ref={audioRef}
        src={songUrl}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
    </div>
  )
}

export default Player
