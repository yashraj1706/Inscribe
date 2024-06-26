import React, { useEffect, useState } from 'react'
import databaseServiceObj from '../appwrite/conf'
import { Container,CustomCard, Loader, NoPosts, UnauthenticatedLanding } from '../components'
import authServiceObj from '../appwrite/auth'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'




function Home() {
    const [userLoggedIn,setUserLoggedIn]=useState()
    const [posts,setPosts]=useState([])
    const [userData, setuserData] = useState(null)
    const stauts=useSelector(state => state.status)
    const [loading,setloading]=useState(true)
    
    useEffect(()=>{
        
        if(stauts){
            databaseServiceObj.getAllActivePosts([]).then((posts)=>{
                if(posts){
                    setPosts(posts.documents);
                    setloading(false);
                }
                setUserLoggedIn(stauts)
                console.log("Logged in???????"+stauts)
            }).catch((e)=>{toast.error(e)})
        }
        
        
        authServiceObj.getCurrentUser().then((user)=>{
            if(user){
                setuserData(user)
                console.log("userrrrrrrrrrrrrrrrrrrrrr:::::::::"+userData)
            }
        })
    },[])
    if(loading===true) return <Loader/>

    if (!userData) {
        return <UnauthenticatedLanding />;
    }

    else if (posts.length === 0) {
        return <NoPosts {...userData} />;
    }
    
    else{
        return (
            <div className='w-full bg-gray-900 py-8'>
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

export default Home