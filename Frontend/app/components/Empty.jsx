import React from 'react'
import Image from 'next/image'

const Empty = () => {
  return (
    <div className='border-1 chat border-cyan-800 w-full bg-slate-200'>
        <Image className=' mt-28  rounded-full justify-center items-center ml-96' src='/oldage.jpg' alt='avatar' height={300} width={300} />
        <h1 className=' ml-48 mt-10 text-base font-medium text-cyan-500 align-middle pt-5 pl-10'>Please Continue to the Mobile version of the application to use the full benefits of this feature</h1>
    </div>
  )
}

export default Empty