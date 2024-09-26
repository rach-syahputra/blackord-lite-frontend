import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route
} from 'react-router-dom'
import HomePage from './view/home/HomePage'
import RegisterPage from './view/auth/register/RegisterPage'
import RegisterListenerPage from './view/auth/register/listener/RegisterListenerPage'
import LoginPage from './view/auth/login/LoginPage'
import Layout from './view/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      }
    ]
  },
  {
    path: '/auth/register',
    element: <RegisterPage />
  },
  {
    path: '/auth/register/listener',
    element: <RegisterListenerPage />
  },
  {
    path: '/auth/login',
    element: <LoginPage />
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
