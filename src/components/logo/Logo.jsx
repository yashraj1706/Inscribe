import React from 'react'
import LogoImg from '../../assets/inscribe.png'

function Logo({width='50px',classname=""}) {
  return (
    <div><img src={LogoImg} width={width} className={`rounded-md ${classname}`} alt="Logo" /></div>
  )
}

export default Logo