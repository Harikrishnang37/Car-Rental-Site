'use client'
import React from 'react'
import Image from 'next/image'
import rent from '../../public/Renters.svg'
import Link from 'next/link'
import user from '/public/user.svg'
import {signOut} from 'next-auth/react'

const Navbar = () => {

  function userSignOut(){
    window.localStorage.clear();
    signOut({   callbackUrl: "/"})
  }

  return (
  <>
      <div className='flex flex-row h-12 w-full justify-between items-center  rounded-t-none font-poppins sticky bg-gradient-to-r from-orange-500 to-[#ffa31a]'>
        <div className='flex flex-row mx-20'>
            {/* <Image src={rent} className='w-10 h-10'></Image> */}
            <Link href='/'><span className='text-black italic font-bold text-2xl'><h2>The Renters</h2></span></Link>
        </div>
        <div className='flex flex-row-reverse mx-4 text-black gap-4 items-center'>
            <div className='flex flex-row gap-2'>
            {/* <button className='bg-gradient-to-r from-green-500 to-blue-400 border-2 rounded-md border-none px-1'>Signup</button> */}
            {/* <button className='bg-gradient-to-r from-green-500 to-blue-400 border-2 rounded-md border-none px-1'>Login</button> */}
            </div>
            <Image src = {user} onClick={userSignOut} className='w-5 h-5 hover:cursor-pointer'></Image>
            <Link href="/Aboutus">About us</Link>
        </div>
      </div>
  </>
  
  )
}

export default Navbar