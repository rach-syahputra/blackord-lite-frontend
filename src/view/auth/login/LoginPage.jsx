import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validate from '../../../utils/validation/validation'
import { loginSchema } from '../../../utils/validation/login-form'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import userService from '../../../api-resources/user/service'

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

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

    const loginUser = await userService.login(inputs)
    if (loginUser.success) {
      navigate('/')
    } else {
      setError(loginUser?.error)
    }
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

          <Button type='submit'>Login</Button>
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
