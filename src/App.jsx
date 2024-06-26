import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authServiceObj from './appwrite/auth'
import {login,logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'
import { Header,Footer } from './components'
import { Toaster } from 'react-hot-toast'


function App() {
  const [loading, setloading] = useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authServiceObj.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[dispatch])
  
  return !loading? (
    <div className='min-h-screen overflow-hidden font-semibold flex flex-wrap content-between bg-gray-900'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet />
        </main>
        <Footer/>
      </div>
      <Toaster /> 
    </div>
    
  ) : null;
}

export default App
