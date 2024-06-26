import React from 'react'

function BasicBtn({
    children,
    type='button',
    bgColor='bg-blue-600',
    textColor='text-black',
    className='',
    ...props

}) {
  return (
    <button type={type} className={`${bgColor} ${textColor}  px-4 py-2 rounded-lg ${className}`} {...props}>
        {children}
    </button>
  )
}

export default BasicBtn