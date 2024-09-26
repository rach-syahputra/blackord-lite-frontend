import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validate from '../../../utils/validation/validation'
import { registerSchema } from '../../../utils/validation/register-form'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import RadioInput from '../../../components/RadioInput'

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 0
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === 'roleId') {
      setInputs((prev) => ({ ...prev, roleId: Number(e.target.value) }))
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errorMessage = validate(registerSchema, inputs)
    if (errorMessage) {
      setError(errorMessage)
      return
    }

    setError('')

    localStorage.setItem('blackord-user-data', JSON.stringify(inputs))

    if (inputs.roleId === 1) {
      navigate('/auth/register/listener')
    } else if (inputs.roleId === 2) {
      navigate('/auth/register/artist')
    }
  }

  return (
    <div className='h-screen p-4'>
      <form
        className='m-auto flex h-full max-w-xs flex-col items-center justify-center gap-4 md:max-w-sm'
        onSubmit={handleSubmit}
      >
        <h1 className='text-xl font-bold'>Sign up to Blackord</h1>
        <div className='flex w-full flex-col gap-4'>
          <Input
            name='username'
            type='text'
            placeholder='username'
            onChange={handleChange}
          />
          <Input
            name='email'
            type='email'
            placeholder='email'
            onChange={handleChange}
          />
          <Input
            name='password'
            type='password'
            placeholder='password'
            onChange={handleChange}
          />
          <Input
            name='confirmPassword'
            type='password'
            placeholder='confirm password'
            onChange={handleChange}
          />

          <div className='flex flex-col gap-2'>
            <p>Choose your role:</p>
            <div className='flex gap-4'>
              <RadioInput
                id='1'
                name='roleId'
                label='Listener'
                onChange={handleChange}
              />
              <RadioInput
                id='2'
                name='roleId'
                label='Artist'
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <p className='text-red-500'>{error}</p>}

          <Button type='submit'>Sign Up</Button>
          <p className='text-center'>
            Already have an account?{' '}
            <Link to='/auth/login' className='text-blue-500'>
              Login
            </Link>
          </p>
        </div>
        <div className='flex w-full flex-col gap-4'></div>
      </form>
    </div>
  )
}

export default RegisterPage
