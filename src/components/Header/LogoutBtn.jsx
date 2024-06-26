import React from 'react'
import authServiceObj from '../../appwrite/auth'
import { logout as StoreLogout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'


function LogoutBtn() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=async()=>{
        const logoutFn=authServiceObj.logout()
        await toast.promise(logoutFn,{
          loading: "Logging Out...",
          success: "Successfully logged out",
          error: "Error logging out"
        })
        dispatch(StoreLogout())
        navigate("/")
        
    }
  return (
    <div className='shadow-red-950 shadow-md'>
      <Button 
        onClick={handleLogout} 
        variant="outlined"
        color="error" 
        size='small'
        className="hover:text-white hover:bg-red-100"
      >
          Logout
      </Button>
    </div>
  )
}

export default LogoutBtn