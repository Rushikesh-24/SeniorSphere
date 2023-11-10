"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [menu, setmenu] = useState("shop")
  return (
    <>
        <nav className='flex justify-around p-5 w-screen h-24 shadow-md'>
        <div id="logo" className='flex items-center gap-1'>
        <img src="/Assets/logo.svg" alt="logo" className='w-24'></img>
        <p className='text-2xl'>SeniorSphere</p></div>
        <div id="logincart" className='flex items-center gap-10'>
            <Link href="/Customer"><button className='w-44 h-14 outline-none border-gray-300 border  rounded-full text-lg cursor-pointer text-gray-700'>Customer Service</button></Link>
        </div>
    </nav>
    </>
  )
}

export default Header