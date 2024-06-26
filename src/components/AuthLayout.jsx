import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication=true}) {
    const navigate=useNavigate()
    const [loader,setLoader]=useState()
    const authStatus=useSelector(state => state.status)
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        if(!authentication && authStatus!==authentication){
            navigate("/")
        }
        setLoader(false)
    },[authentication,authStatus,navigate])
  return loader? <h2>Loading...</h2>:<>{children}</>
}