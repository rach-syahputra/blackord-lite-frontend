import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  artistImageSchema,
  registerArtistSchema
} from '../../../../utils/validation/register-artist-form'
import { registerSchema } from '../../../../utils/validation/register-form'
import validate from '../../../../utils/validation/validation'
import userService from '../../../../api-resources/user/service'
import artistService from '../../../../api-resources/artist/service'
import Input from '../../../../components/Input'
import ImageInput from '../../../../components/ImageInput'
import LoadingButton from '../../../../components/LoadingButton'
import Button from '../../../../components/Button'
import TextArea from '../../../../components/TextArea'

const RegisterArtistPage = () => {
  const [inputs, setInputs] = useState({
    username:
      JSON.parse(localStorage.getItem('blackord-user-data'))?.username || '',
    artistName: '',
    bio: '',
    image: null
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState('')
  const imageInputRef = useRef(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const image = e.target.files[0]

      const errorMessage = validate(artistImageSchema, { image })
      if (errorMessage) {
        setError(errorMessage)
      } else {
        setInputs((prev) => ({ ...prev, image }))
        setPreview(URL.createObjectURL(image))
        setError('')
      }
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleImageUploadClick = () => {
    imageInputRef.current?.click()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const userData = JSON.parse(localStorage.getItem('blackord-user-data'))

    let errorMessage

    errorMessage = validate(registerSchema, userData)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    errorMessage = validate(registerArtistSchema, inputs)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setLoading(true)

    const registerUser = await userService.register(userData)
    if (registerUser.success) {
      const registerArtist = await artistService.register(inputs)
      if (registerArtist.success) {
        localStorage.removeItem('blackord-user-data')
        navigate('/auth/login')
      } else {
        setError(registerArtist?.error)
      }
    } else {
      setError(registerUser?.error)
    }

    setLoading(false)
  }

  return (
    <main className='h-screen p-4'>
      <form
        className='m-auto flex h-full max-w-xs flex-col items-center justify-center gap-4 md:max-w-sm'
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className='text-xl font-bold'>
          Sign up as an Artist to start publish your epic musics
        </h1>
        <div className='flex w-full flex-col gap-4'>
          <Input
            name='artistName'
            placeholder='artist name'
            type='text'
            onChange={handleChange}
          />

          <TextArea name='bio' placeholder='bio' onChange={handleChange} />

          {preview ? (
            <figure className='h-[300px] w-full overflow-hidden rounded-md'>
              <img
                src={preview}
                alt='Preview Image'
                className='h-full w-full object-cover object-center'
              />
            </figure>
          ) : (
            <div
              className='flex h-[300px] w-full cursor-pointer items-center justify-center rounded-md border-2 border-dotted'
              onClick={handleImageUploadClick}
            >
              <div className='flex flex-col gap-2'>
                <FontAwesomeIcon
                  icon={faPlus}
                  size='2x'
                  className='text-gray-500'
                />
                <p className='text-gray-500'>Upload your image</p>
              </div>
              <ImageInput
                name='image'
                onChange={handleChange}
                ref={imageInputRef}
              />
            </div>
          )}

          {error && <p className='text-red-500'>{error}</p>}

          {loading ? (
            <LoadingButton>Signing up..</LoadingButton>
          ) : (
            <Button type='submit'>Sign Up</Button>
          )}
        </div>
        <div className='flex w-full flex-col gap-4'></div>
      </form>
    </main>
  )
}

export default RegisterArtistPage