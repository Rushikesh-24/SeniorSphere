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
        <div className='chat section'></div>
      </div>
      <Empty />
    </div>
    
    </div>
    
  )
}

export default page