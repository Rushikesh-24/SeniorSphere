"use client"
import Link from "next/link"
import { useRouter } from "next/router";
import { useState } from "react";
import { withRouter } from 'next/router';

export default function Home() {
  return(
    <>
    <div
      style={{
        backgroundImage: 'url("/Assets/homepage.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
      className="min-h-screen bg-[image-name] bg-cover bg-no-repeat"
    >
      {/* Your content goes here */}
      <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1 className="text-4xl font-extrabold">Senior Sphere</h1>
          <p className="text-lg">Golden Years, Digital Cheers: Creating Joyful Connections for Seniors</p>
        </div>
    </div>
    </>
  )
};

