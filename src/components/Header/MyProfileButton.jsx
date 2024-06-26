import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import authSlice from '../../store/authSlice'
import { useSelector } from 'react-redux'
import authServiceObj from '../../appwrite/auth'
import { deepOrange } from '@mui/material/colors'
import { Link } from 'react-router-dom'

function MyProfile() {
    const userStatus=useSelector((state)=> state.status)
    const [userInitials, setuserInitials] = useState("")
    const [userName,setuserName]=useState("")

    function getInitials(name) {
        console.log('initaals func called------'+name)
        const regex = /^(\w)\w*(?:\s(?:\w+\s)?(\w)\w*)?$/;
        const match = name.match(regex);
        if (match) {
            if (match[2]) {
                setuserInitials(`${match[1]}${match[2]}`.toUpperCase());
            } else {
                setuserInitials(`${match[1]}`.toUpperCase());
            }
        }
    }
    
    useEffect(()=>{
            const username=async ()=>{
                if (userStatus){
                    const setuser=await authServiceObj.getCurrentUser().then((data)=> data.name)
                    getInitials(setuser)
                }
            }
            username()
    },[])
    return (
    <Link to='/my-profile'>
        <Avatar sx={{bgcolor:  deepOrange[500],width: 34, height: 34}}>{userInitials}</Avatar>
    </Link>
    )
}

export default MyProfile