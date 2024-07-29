//TODO: MAKE THIS PAGE
import React, { useState,useEffect } from 'react'
import databaseServiceObj from '../appwrite/conf'
import { useSelector } from 'react-redux'
import {CustomCard,Container, NoPosts, Loader} from '../components'

function MyPosts() {
  const [posts, setposts] = useState([])
  const [loader,setloader]=useState(true)
  const userId = useSelector((state) => state.userData?.$id);
   // Log the state to debug
  // Directly access $id from state

  useEffect(() => { 
    if (userId) {
      databaseServiceObj.getMyPosts(userId)
        .then((postss) => {
          if (postss) {
            console.log(postss);
            setposts(postss.documents); // Assuming the posts are in the documents property
            setloader(false)
          }
        })
        .catch((error) => console.log("Response BAD:::::::::::" + error));
    }else setloader(false)
    
  }, [userId])
  if(loader) return <Loader/>
  
    if(posts.length===0){
      return <NoPosts/>
    }
    else{
    return (
      <div className='py-8 min-h-screen bg-gray-900 w-full'>
          <Container>
              <div className='flex w-full md:justify-center md:gap-10 justify-center flex-wrap'>
                  {posts.map((post)=>(
                      <div key={post.$id} className='p-2 md:max-w-[calc(100vw/3)] k max-w-[calc(100vw/1.5)] md:min-w-[calc(100vw/4)] min-w-[calc(100vw/1.5)] md:w-fit sm:w-full'>
                          <CustomCard {...post}/>
                      </div>
                  ))}
              </div>
          </Container>
      </div>
    )}

}

export default MyPosts