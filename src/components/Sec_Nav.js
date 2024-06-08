import React from 'react'
import Link from 'next/link'

function Sec_Nav() {
  return (
    <div className='flex flex-row h-8 w-full justify-start gap-8 items-center rounded-md rounded-t-none font-poppins sticky bg-gradient-to-r from-[#ffa31a] to-orange-500'>
                <Link href='' className='mx-4  hover:underline'>Rent-Info</Link>
                <Link href='' className='mx-4  hover:underline'>Employee</Link>
                <Link href='' className='mx-4  hover:underline'>Hello</Link>
            </div>
  )
}

export default Sec_Nav