import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeCurrentUser } from '../../../../redux/slicers/current-user-slicer'
import {
  albumImageSchema,
  albumSchema
} from '../../../../utils/validation/album-form'
import {
  addSongSchema,
  songSchema
} from '../../../../utils/validation/song-form'
import validate from '../../../../utils/validation/validation'
import albumService from '../../../../api-resources/album/service'
import songService from '../../../../api-resources/song/service'
import Input from '../../../../components/Input'
import ImageInput from '../../../../components/ImageInput'
import LoadingButton from '../../../../components/LoadingButton'
import Button from '../../../../components/Button'

const AddAlbumPage = () => {
  const [albumInputs, setAlbumInputs] = useState({
    title: '',
    genre: '',
    image: null
  })
  const [songInputs, setSongInputs] = useState({
    title: '',
    duration: '',
    file: null
  })
  const [songs, setSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [albumError, setAlbumError] = useState('')
  const [songError, setSongError] = useState('')
  const [preview, setPreview] = useState('')
  const imageInputRef = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAlbumChange = (e) => {
    if (e.target.name === 'image') {
      const image = e.target.files[0]

      const errorMessage = validate(albumImageSchema, { image })
      if (errorMessage) {
        setAlbumError(errorMessage)
      } else {
        setAlbumInputs((prev) => ({ ...prev, image }))
        setPreview(URL.createObjectURL(image))
        setAlbumError('')
      }
    } else {
      setAlbumInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleImageUploadClick = () => {
    imageInputRef.current?.click()
  }

  const handleSongChange = (e) => {
    if (e.target.name === 'duration') {
      setSongInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    } else if (e.target.name === 'file') {
      setSongInputs((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0]
      }))
    } else {
      setSongInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleAddSong = () => {
    const songData = {
      title: songInputs.title,
      duration: Number(songInputs.duration),
      file: songInputs.file
    }

    console.log(songData)

    const errorMessage = validate(addSongSchema, songData)

    if (errorMessage) {
      setSongError(errorMessage)
    } else {
      setSongs((prev) => [...prev, songData])

      setSongInputs({
        title: '',
        duration: '',
        file: null
      })

      setSongError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setAlbumError('')
    setSongError('')

    const errorMessage = validate(albumSchema, albumInputs)
    if (errorMessage) {
      setAlbumError(errorMessage)
      return
    }

    if (songs.length === 0) {
      setSongError('add at least one song')
      return
    }

    setIsLoading(true)

    const albumResponse = await albumService.add(albumInputs)
    if (albumResponse.success) {
      const responses = await Promise.all(
        songs.map(async (song) => {
          const upload = await songService.upload(song.file)

          if (upload.success) {
            const songData = {
              albumId: albumResponse.data.id,
              title: song.title,
              duration: song.duration,
              songPath: upload.data
            }

            const errorMessage = validate(songSchema, songData)
            if (errorMessage) {
              setSongError(errorMessage)
              return false
            }

            const response = await songService.add(songData)
            return response
          }
        })
      )

      const success = responses.every((response) => response.success)
      if (success) navigate('/artist/albums')
    } else {
      if (albumResponse.statusCode === 401) {
        const response = await dispatch(removeCurrentUser()).unwrap()
        if (response.success) navigate('/auth/login')
      }
    }

    setIsLoading(false)
  }

  return (
    <>
      <form
        className='grid gap-8 pb-8 pt-4 lg:grid-cols-2'
        onSubmit={(e) => handleSubmit(e)}
      >
        <section className='flex flex-col gap-12'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Add new album</h1>
            <Input
              name='title'
              placeholder='Title'
              type='text'
              onChange={handleAlbumChange}
            />
            <Input
              name='genre'
              placeholder='Genre'
              type='text'
              onChange={handleAlbumChange}
            />
            <ImageInput
              name='image'
              onChange={handleAlbumChange}
              onClick={handleImageUploadClick}
              ref={imageInputRef}
              preview={preview}
            />

            {albumError && <p className='text-red-500'>{albumError}</p>}
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Add songs to your new album</h1>
            <Input
              name='title'
              placeholder='Title'
              type='text'
              value={songInputs.title}
              onChange={handleSongChange}
            />
            <Input
              name='duration'
              placeholder='duration'
              type='text'
              value={songInputs.duration.toString()}
              onChange={handleSongChange}
            />
            <Input name='file' type='file' onChange={handleSongChange} />
            {songError && <p className='text-red-500'>{songError}</p>}
            <Button onClick={handleAddSong}>Add Song</Button>
          </div>
        </section>

        <section className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>New album summary</h1>
            <div className='flex flex-col'>
              <h3 className='font-bold'>Title</h3>
              {albumInputs.title ? (
                <p>{albumInputs.title}</p>
              ) : (
                <p className='italic text-gray-500'>no title</p>
              )}
            </div>

            <div className='flex flex-col'>
              <h3 className='font-bold'>Genre</h3>
              {albumInputs.genre ? (
                <p>{albumInputs.genre}</p>
              ) : (
                <p className='italic text-gray-500'>no genre</p>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='text-xl font-bold'>Song list</h1>
            <ul className='mb-4 flex h-[400px] flex-col gap-4 overflow-y-scroll scroll-smooth'>
              {songs.length > 0 ? (
                songs.map((song, index) => (
                  <li key={index} className='flex items-center gap-6'>
                    <h3 className='text-sm font-bold'>{index + 1}.</h3>
                    <div className='flex flex-col'>
                      <p>{song.title}</p>
                      <p className='text-sm'>{song.duration}s</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className='italic text-gray-500'>no songs</p>
              )}
            </ul>
            {isLoading ? (
              <LoadingButton>Adding new album...</LoadingButton>
            ) : (
              <Button type='submit'>Add new album</Button>
            )}
          </div>
        </section>
      </form>
    </>
  )
}

export default AddAlbumPage
