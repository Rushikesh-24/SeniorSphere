'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Addfriend = () => {

    const [name, setName] = useState("");

    const router = useRouter();

    const addFriend = (e) => {
        e.preventDefault();

        if(!name){
          // TODO: error mssg
          alert("Please enter a valid name");
        }else{
            router.push('/Social');
        }
    };

  return (
    <div id="login" className=' flex w-screen h-screen pt-10 bg-gradient-to-b from-gray-400 to-white items-center justify-center'>
    <div id="container" className='w-3/5 h-4/5 bg-white shadow-2xl'>
      <h1 className=' mx-5 text-5xl font-medium mt-6'>Add Friend</h1>
      <div id="signUpField" className='flex items-center flex-col pap-5 mt-5'>
        <input onChange={(e) =>{setName(e.target.value)}} className='w-4/5 h-12 rounded-xl  border border-gray-400 outline-none text-gray-500 text-lg  m-3 pl-20' type="text" placeholder='Your name'/>
       
      </div>
      <button onClick={addFriend} className='w-4/5 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mt-6 mx-16'>Continue</button>
      
          <Link href="/Social" className="mx-72 hover:text-red-500 hover:underline my-10">Return to the Chats</Link>
       
      </div>
    </div>

  )
}

export default Addfriend