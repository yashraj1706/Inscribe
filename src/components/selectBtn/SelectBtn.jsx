import React,{useId} from 'react'

function SelectBtn({
    options,//o[tions is an array
    label="",
    classes='',
    ...props
},ref) {
    const id=useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className='text-white text-2xl mb-4 inline-block pl-1'>{label}</label>}
        <select name="" id={id} 
        {...props}
        ref={ref}
        className={`${classes} px-3 py-2 rounded-lg  bg-white  text-black  outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`}
        >
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(SelectBtn)