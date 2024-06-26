import React from 'react'
import LogoImg from '../../assets/images/logo.png'

function Logo({width='50px'}) {
  return (
    <div><img src={LogoImg} width={width} className='rounded-md' alt="Logo" /></div>
  )
}

export default Logo