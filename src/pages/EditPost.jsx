import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import databaseServiceObj from '../appwrite/conf'
import { Container } from '../components'
import { PostForm } from '../components'

function EditPost() {
    const [post,setPost]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        if(slug){
            databaseServiceObj.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                }
                else{
                    navigate('/')
                }
            })
        }
        else{

        }
    },[slug,navigate])

  return post? (<div className='py-8 min-h-screen bg-gray-900'>
    <Container>
        <PostForm post={post}/>
    </Container>
  </div>):null
}

export default EditPost