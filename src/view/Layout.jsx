import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='relative mx-auto w-full px-4 md:max-w-3xl lg:max-w-5xl'>
      <Outlet />
    </main>
  )
}

export default Layout
