import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <main className='mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl'>
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Layout
