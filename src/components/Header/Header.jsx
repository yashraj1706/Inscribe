import React from 'react'
import {Logo,LogoutBtn,Container} from '../index'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MyProfile from './MyProfileButton'


function Header() {
  const authStatus = useSelector((state) => state.status)
  const navigate = useNavigate()
  const location=useLocation()

  const navItems=[
    {name:'Home',slug:'/',active:true},
    {name:'Login',slug:'/login',active:!authStatus},
    {name:'SignUp',slug:'/signup',active:!authStatus},
    {name:'All Posts',slug:'/all-posts',active:authStatus},
    {name:'My Posts',slug:'/my-posts',active:authStatus},
    {name:'Add Post',slug:'/add-post',active:authStatus},
    
  ]
  return (
    <header className='py-3 shadow text-white bg-black'>
      <Container>
        <nav className='flex w-full'>
          <div className='flex w-full  items-center justify-around mr-4'>
            <Link className=' md:order-1 order-10' to='/'>
              <Logo  width='50px'/>
            </Link>
            <ul className='flex order-2 items-center h-full gap-0 md:gap-5 ml-auto'>
              {
                navItems.map((item)=>
                item.active?(
                  <li key={item.name}   className='h-full flex items-center'>
                    <button 
                    onClick={()=>navigate(item.slug)}
                    className={`relative px-4 py-2 transition-colors duration-300 ${
                      location.pathname === item.slug  ? 'text-blue-300 after:w-full' : 'hover:text-blue-300'
                      } after:content-[''] after:block after:mt-2 after:h-1 after:bg-blue-500 ${
                        location.pathname === item.slug  ? 'after:bg-blue-500' : 'after:w-0'
                      }`}>{item.name}</button>
                  </li>
                ):null
                )
              }
              {authStatus && (
                <li className='order-3 h-full flex items-center mb-3 '>
                  <LogoutBtn/>
                </li>)}
              {/*
                authStatus && (
                  <li className=' h-full flex items-center'>
                    <MyProfile />
                  </li>
                )
              */}
            </ul>

          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header