import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route
} from 'react-router-dom'
import HomePage from './view/home/HomePage'
import RegisterPage from './view/auth/register/RegisterPage'
import RegisterListenerPage from './view/auth/register/listener/RegisterListenerPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/register/listener',
    element: <RegisterListenerPage />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
