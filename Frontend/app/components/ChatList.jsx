import React from 'react'

const Chatlist = () => {
  return (
     <div className='flex z-20 flex-col max-h-screen bg-slate-400'>
      <>
      <ChatlistHeader />
      <div className=' border-l-neutral-900 h-20 w-20'>
      
      </div>
      <SearchBar />
      <List />
      </>
     </div>
   
  )
}

export default Chatlist