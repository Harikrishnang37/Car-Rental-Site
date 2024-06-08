'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import dashBoard from '/public/Dashboard.jpg'
import rArrow from '/public/right-arrow.svg'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { PopUpBookingConfirmation } from '@/components/PopUpBookingConfirmation'

const Confirmation = () => {

  const router = useRouter()

  const [selectedCar, setSelectedCar] = useState(JSON.parse(window.localStorage.getItem('selected_car')))
  const [tripData, setTripData] = useState(JSON.parse(window.localStorage.getItem("trip_Data")));
  const [amount , setAmount]  = useState(tripData.timediff * selectedCar.price_per_hour)
  const { data: session, status } = useSession();

  const [showPopUp ,setPopUp] = useState(false);

  async function makeBooking(){
    console.log("button clicked")
    console.log("session",session);

    setSelectedCar(JSON.parse(window.localStorage.getItem('selected_car')));
    setTripData(JSON.parse(window.localStorage.getItem("trip_Data")));
    console.log("amount",amount);

    await fetch('http://localhost:3000/api/db/bookCar',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          cust_id : session.user.userType,
          car_reg_no : selectedCar.reg_no,
          branch_id : selectedCar.branch_id,
          startTime : tripData.startTime,
          endTime : tripData.endTime,
          amount : amount
        })
    }).then((response) => response.json())
    .then((data) => {
        console.log(data);
    });

    fetch('http://localhost:3000/api/db/custViewInProgressCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : session.user.userType
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('cust_inprog_cars', JSON.stringify(data));
  
        });

        fetch('http://localhost:3000/api/db/custViewPastCars',
        {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email : session.user.userType
            })
        }).then((response) => response.json())
        .then((data) => {
          window.localStorage.setItem('cust_past_cars', JSON.stringify(data));
  
        });

    
    console.log("car booked!!!")
    setPopUp(true);
    router.push('/dashboard')
    
  }

  return (
    <div className='w-full h-screen flex flex-row font-poppins'>
      <div className='mx-8 mt-6 w-[70%] flex flex-col gap-4 '>
        <div className='w-full rounded-md bg-slate-100 flex flex-row justify-center'>
          <Image src={`/car_images/${JSON.parse(window.localStorage.getItem('selected_car')).img}.jpg`} width={1080} height={1920} className=' w-[70%] my-1 rounded-sm'></Image>
        </div>
        <div className=' w-[80%] self-center h-full mt-2 flex flex-col gap-6 rounded-md bg-slate-100'>
          <div className='bg-white mt-4 gap-4 rounded-md flex flex-col  justify-center self-center mx-2'>
              <div className='mx-8 mt-4 flex flex-row gap-4 items-center justify-between ' >
                <p className='mx-3 text-3xl'>{selectedCar.brand}</p>
                <p className='text-3xl opacity-70'>{selectedCar.model}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='mx-3 text-xl'>Reg Number:</p>
                <p className='text-xl opacity-70'>{selectedCar.reg_no}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='mx-3 text-xl'>Colour:</p>
                <p className='text-xl opacity-70'>{selectedCar.colour}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Fuel:</p>
                <p className='text-xl opacity-70'>{selectedCar.fuel}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Drivewheel:</p>
                <p className='text-xl opacity-70'>{selectedCar.drivewheel}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Transmission:</p>
                <p className='text-xl opacity-70'>{selectedCar.transmission}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Year Manufactured:</p>
                <p className='text-xl opacity-70'>{selectedCar.year_manf}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Price per Hour:</p>
                <p className='text-xl opacity-70'>{selectedCar.price_per_hour}</p>
              </div>      
              <div className='mx-8 flex flex-row gap-2 items-center justify-between '>
                <p className='text-xl mx-3'>Rating:</p>
                <p className='text-xl opacity-70'>{selectedCar.rating}</p>
              </div>      
              <div className='mx-8 mb-4 flex flex-row gap-2 items-center justify-between  '>
                <p className='text-xl mx-3'>Seating Capacity:</p>
                <p className='text-xl opacity-70'>{selectedCar.capacity}</p>
              </div>      
          </div>
          <div className='bg-white rounded-md flex flex-col  justify-center pt-4 self-center mx-2 '>
            <p className='px-4 py-1 text-2xl'>Trip Duration:</p>
            <div className='mx-2 my-2 px-4 border-none h-[100px] rounded-md flex flex-row justify-between'>
              <div className='flex flex-col justify-center '>
                <p className='text-xl'>{tripData.startTime}</p>

              </div>
              <div className='flex flex-row w-[30%] justify-center'>
                <Image className='w-[10%] ' src={rArrow}></Image>
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-xl'>{tripData.endTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[30%] flex flex-col justify-center items-center'>
        <div className='bg-slate-100 w-[90%] h-[30%]  flex flex-row items-center justify-center rounded-md'>
          <div className='bg-white  my-2 w-[90%] h-[80%] flex flex-col gap-2 items-center justify-between py-4 '>
            <p className='text-3xl self-start px-2 py-1'>Amount:</p>
            <p className='text-2xl'>&#8377;{amount} </p>
            {/* <button onClick={makeBooking} className='bg-amber-500 rounded-md px-1 w-[80%]'>Proceed to pay</button> */}
            <PopUpBookingConfirmation makeBooking = {makeBooking}></PopUpBookingConfirmation>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation