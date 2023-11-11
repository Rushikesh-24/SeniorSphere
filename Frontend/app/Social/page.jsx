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
        <div className='chat section flex flex-col'>
         <div className='h-16 bg-blue-100  flex px-4 py-3 justify-between items-center chat gap-5'>
         <h1 className=' '>Abhi</h1>
                    <p className='text-gray-500 w-60'>hey Mom,How are you?</p>
         </div>
         <div className='h-16 bg-blue-100 flex px-4 py-3 justify-between items-center chat'>
         <h1 className=' '>Priya</h1>
                    <p className='text-gray-500 w-60'>hey Aunt,Had food?</p>
         </div>
         <div className='h-16 bg-blue-100  flex px-4 py-3 justify-between items-center chat'>
         <h1 className=' '>Dr.Smit</h1>
                    <p className='text-gray-500 w-60'>Mrs.Seema,Are you fine?</p>
         </div>
         <div className='h-16 bg-blue-100   flex px-4 py-3 justify-between items-center chat flex-row flex-wrap'>
                    <h1 className=' '>Abhi</h1>
                    <p className='text-gray-500 w-60'>hey Mom,How are you?</p>
         </div>


        </div>
      </div>
      <Empty />
    </div>
    
    </div>
    
  )
}

export default page