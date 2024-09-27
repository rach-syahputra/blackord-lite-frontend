import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userService from '../../../api-resources/user/service'
import validate from '../../../utils/validation/validation'
import { loginSchema } from '../../../utils/validation/login-form'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import LoadingButton from '../../../components/LoadingButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../../../redux/slicers/current-user-slicer'

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector((state) => state.currentUser.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      setLoading(false)
      if (currentUser?.artistName) {
        navigate('/artist')
      } else {
        navigate('/')
      }
    }
  }, [currentUser])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errorMessage = validate(loginSchema, inputs)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setError('')
    setLoading(true)

    const loginUser = await userService.login(inputs)
    if (loginUser.success) {
      dispatch(fetchCurrentUser())
    } else {
      setError(loginUser?.error)
    }

    setLoading(false)
  }

  return (
    <div className='h-screen p-4'>
      <form
        className='m-auto flex h-full max-w-xs flex-col items-center justify-center gap-4 md:max-w-sm'
        onSubmit={handleSubmit}
      >
        <h1 className='text-xl font-bold'>Sign in to Blackord</h1>
        <div className='flex w-full flex-col gap-4'>
          <Input
            name='username'
            type='text'
            placeholder='username'
            onChange={handleChange}
          />
          <Input
            name='password'
            type='password'
            placeholder='password'
            onChange={handleChange}
          />

          {error && <p className='text-red-500'>{error}</p>}

          {loading ? (
            <LoadingButton>Logging in...</LoadingButton>
          ) : (
            <Button type='submit'>Log in</Button>
          )}

          <p className='text-center'>
            Don't have an account yet?{' '}
            <Link to='/auth/register' className='text-blue-500'>
              Register
            </Link>
          </p>
        </div>
        <div className='flex w-full flex-col gap-4'></div>
      </form>
    </div>
  )
}

export default LoginPage
