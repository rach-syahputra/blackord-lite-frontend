import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import validate from '../utils/validation/validation'
import registerSchema from '../utils/validation/register-form'
import RadioInput from '../components/RadioInput'
import userService from '../api-resources/user/service'

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
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

    const registerUser = await userService.register(inputs)
    if (registerUser.success) {
      navigate('/')
    } else {
      setError('All fields are required')
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
          <Input name='username' type='text' onChange={handleChange} />
          <Input name='email' type='email' onChange={handleChange} />
          <Input name='password' type='password' onChange={handleChange} />

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
            Already have an account? <a className='text-blue-500'>Login</a>
          </p>
        </div>
        <div className='flex w-full flex-col gap-4'></div>
      </form>
    </div>
  )
}

export default RegisterPage
