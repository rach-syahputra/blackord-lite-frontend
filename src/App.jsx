import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListenerHomePage from './view/listener/Page'
import ListenerLayout from './view/listener/Layout'
import ArtistHomePage from './view/artist/Page'
import ArtistLayout from './view/artist/Layout'
import RegisterPage from './view/auth/register/RegisterPage'
import RegisterListenerPage from './view/auth/register/listener/RegisterListenerPage'
import LoginPage from './view/auth/login/LoginPage'
import RegisterArtistPage from './view/auth/register/artist/RegisterArtistPage'
import Layout from './view/Layout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <ListenerLayout />,
        children: [
          {
            path: '/',
            element: <ListenerHomePage />
          }
        ]
      },
      {
        path: '/artist',
        element: <ArtistLayout />,
        children: [
          {
            path: '/artist',
            element: <ArtistHomePage />
          }
        ]
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
    path: '/auth/register/artist',
    element: <RegisterArtistPage />
  },
  {
    path: '/auth/login',
    element: <LoginPage />
  }
])

function App() {
  // look on current user change

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
