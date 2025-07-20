"use client"
import { useUser } from '@/app/provider/userProvider'
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const {user} = useUser();
  return (
    <div className='bg-white p-5 rounded-xl flex justify-between items-center'>
    <div>
        <h1 className="text-2xl font-bold">Welcome to NeuroHire</h1>
      {user ? (
        <p className="mt-2 text-gray-700">Logged in as {user.email}</p>
      ) : (
        <p className="mt-2 text-gray-500">Loading user...</p>
      )}
        <h2 className='text-gray-500'>AI-Driven Interviews, Hassel-Free Hiring</h2>
        </div>
        {user && <Image src={user?.picture} alt='userAvatar' width={40} height={40} className='rounded-full'/>}
    </div>
  )
}

export default WelcomeContainer