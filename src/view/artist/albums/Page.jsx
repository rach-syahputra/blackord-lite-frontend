import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'

const AlbumsPage = () => {
  return (
    <div>
      <Link to='/artist/albums/add'>
        <Button>Add new album</Button>
      </Link>
    </div>
  )
}

export default AlbumsPage
