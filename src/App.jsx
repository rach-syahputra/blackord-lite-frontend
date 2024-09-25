import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route
} from 'react-router-dom'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/register',
    element: <RegisterPage />
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
