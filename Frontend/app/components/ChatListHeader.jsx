import Link from 'next/link'
import React from 'react'

const ChatListHeader = () => {
  return (
    <div className='h-16 bg-slate-200  flex px-4 py-3 justify-between items-center chat'>
         
         <div className='cursor-pointer'>
            <p>CONTACTS</p>
         </div>
         <div className='flex gap-3'>
         </div>
    </div>
  )
}

export default ChatListHeader