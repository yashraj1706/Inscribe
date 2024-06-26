import React from 'react'
import { PostForm } from '../components'
import { Container } from '../components'
function AddPost() {
  return (
    <div className='py-8 min-h-screen bg-gray-900 '>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )
}

export default AddPost