import React from 'react'
import { Button } from '@mui/material'

function GreenBtn({children,className=""}) {
    return (
        <div className='shadow-green-950 shadow-md'>
          <Button 
            variant="contained"
            color="success" 
            size='small'
            className={`hover:text-white hover:bg-green-100 ${className}`}
          >
              {children}
          </Button>
        </div>
      )
}

export default GreenBtn