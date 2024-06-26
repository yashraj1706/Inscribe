
import { ColorRing } from 'react-loader-spinner';

import React from 'react'

function Loader() {
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["purple", "rgb(255, 137, 220)", "red", "rgb(255, 137, 220)", "purple"]}
        />
  </div>
  )
}

export default Loader