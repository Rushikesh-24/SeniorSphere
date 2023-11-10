import React from 'react'

const Footer = () => {
  return (
    <>
        <div id="footer" className='flex flex-col justify-center items-center gap-10 mt-20'>
        <div id="footerlogo" className='flex items-center gap-5'>
            <img src="/Assets/logo.svg" alt="" className='w-40'/>
            <p className='text-2xl font-semibold '>SENIOR SPHERE</p></div>
            <ul id="footerlinks" className='flex list-none gap-10 text-lg'>
                <li className='cursor-pointer '>Company</li>
                <li className='cursor-pointer '>Offices</li>
                <li className='cursor-pointer '>About</li>
                <li className='cursor-pointer '>Contact</li>
            </ul>
            <div id="copyright" className=' flex flex-col items-center gap-7 w-screen mb-7 text-lg'>
                <hr className=' w-10/12 border-none rounded-md h-1 bg-gray-200 '/>
                <p>Copyrigth @2023 -All Rights Reserved</p>
            </div>
            </div>
            </>
  )
}

export default Footer