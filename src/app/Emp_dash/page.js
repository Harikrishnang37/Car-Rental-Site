'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Toggle } from "@/components/ui/toggle"
import { TransTable } from '@/components/TransTable'
import { EmpTransTable } from '@/components/EmpTransTable'
import { MarkableTransTable } from '@/components/MarkableTransTable'

function Emp_dash() {

  const [inprogCars , setInprogCars] = useState([])
  const [pastCars , setPastCars] = useState([])

  const [showPast, setShowPast] = useState(false)
  const [showInprog, setShowInprog] = useState(false)
  const [PastText, setPastText] = useState("Completed")
  const [InprogText, setInprogText] = useState("Ongoing")

  useEffect(() => {
    const getData = () => {
      setInprogCars(JSON.parse(window.localStorage.getItem("emp_inprog_cars")))
      setPastCars(JSON.parse(window.localStorage.getItem("emp_past_cars")))
      
    }
    return () => getData();
  }, []);

  function getInProgCars(){

    setInprogCars(JSON.parse(window.localStorage.getItem("emp_inprog_cars")))
    console.log("inprog clicked")
    setShowInprog(!showInprog);
    setShowPast(false);
  }

  function getPastCars(){

    setPastCars(JSON.parse(window.localStorage.getItem("emp_past_cars")))
    console.log("past clicked")
    setShowPast(!showPast);
    setShowInprog(false);
  }

  return (
    <div className='flex flex-col w-full h-screen'>
        <p className='mx-4 mt-4 text-6xl'>Welcome Emp !</p>
        <p className='mx-6 mt-4 text-2xl'>Let's look at the Rent Information</p>
        <div className='flex flex-row-reverse gap-4 mx-10'>
          <Toggle onClick={getInProgCars}>{InprogText}</Toggle>
            {/* <button className='border-2 border-stone-200 rounded-md px-2 py-[1/2] hover:text-white hover:border-transparent hover:bg-orange-400'>Completed</button> */}
            {/* <button className='border-2 border-stone-200 rounded-md px-2 py-[1/2] hover:text-white hover:border-transparent hover:bg-orange-400'>Ongoing</button> */}
          <Toggle onClick={getPastCars}>{PastText}</Toggle>
        </div>
        <div className='border-t-4  border-orange-400 w-auto h-auto mt-4 mx-4 rounded-md'>
            <div>
              {showInprog && <div> <p>Ongoing:</p><MarkableTransTable transArr={inprogCars} setInprogCars = {setInprogCars} setPastCars = {setPastCars} ></MarkableTransTable></div>}
            </div>
            <div>
              {showPast && <div> <p>Completed:</p><EmpTransTable transArr={pastCars}></EmpTransTable></div>}
            </div>
            <br></br>
        </div>
    </div>
  )
}

export default Emp_dash