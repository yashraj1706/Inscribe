import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,
    className='',
    type='text',
    charsLimit,
    ...props
},ref)
{
    const id=useId()
    return (
        <div className='w-full'>
            {
                (label && <label
                    className={`text-white text-2xl mb-4 inline-block pl-1`}
                    htmlFor={id}
                    >
                        {label}
                    </label>)
            } 
            <input
                type={type}
                className={`px-3 shadow-white py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black outline-none focus:bg-gray-50 duration-200 w-full  ${className}`}
                ref={ref} 
                {...props}
                id={id}
                
            />
        </div>
    )
})

export default Input