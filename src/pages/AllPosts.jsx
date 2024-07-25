import React,{useState,useEffect} from 'react'
import databaseServiceObj from '../appwrite/conf'
import { Container,CustomCard, Loader, NoPosts } from '../components'
import toast from 'react-hot-toast'



function AllPosts() {
    const [posts,setPosts]=useState([])
    const [loading,setloading]=useState(true)
    useEffect(()=>{
        databaseServiceObj.getAllActivePosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                setloading(false)
            }
        })
    },[])
    
    if(loading===true){
        return <Loader />
    }
    if(posts.length===0){
        return (
        <>
            <NoPosts  />
        </>)
    }
    else{
        return (
            <div className='py-8 min-h-screen bg-gray-900 w-full'>
                <Container>
                    <div className='flex lg:justify-normal justify-center flex-wrap'>
                        {posts.map((post)=>(
                            <div key={post.$id} className='p-2 md:max-w-full max-w-[calc(100vw/1.5)] md:w-1/4 sm:w-full'>
                                <CustomCard {...post}/>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
          )
    }
}

export default AllPosts