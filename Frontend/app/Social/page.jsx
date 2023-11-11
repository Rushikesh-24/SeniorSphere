import React from 'react';
import Empty from '../components/Empty';
import ChatListHeader from '../components/ChatListHeader';
import Image from 'next/image';

const page = () => {
  return (
    <div>
    <div className=' flex grid-cols-main h-screen w-screen max-h-screen '>
      <div>
        <ChatListHeader />
        <div className='chat section'>
         <div className='h-16 bg-blue-100 pr-64 flex px-4 py-3 justify-between items-center chat'>
            <div className='cursor-pointer'>
                
            </div>
            <div className='flex gap-6'>

            </div>
         </div>
         <div className='h-16 bg-blue-100 pr-64 flex px-4 py-3 justify-between items-center chat'>
            <div className='cursor-pointer'>

            </div>
            <div className='flex gap-6'>

            </div>
         </div>
         <div className='h-16 bg-blue-100 pr-64 flex px-4 py-3 justify-between items-center chat'>
            <div className='cursor-pointer'>

            </div>
            <div className='flex gap-6'>

            </div>
         </div>
         <div className='h-16 bg-blue-100 pr-64 flex px-4 py-3 justify-between items-center chat'>
            <div className='cursor-pointer'>

            </div>
            <div className='flex gap-6'>

            </div>
         </div>


        </div>
      </div>
      <Empty />
    </div>
    
    </div>
    
  )
}

export default page